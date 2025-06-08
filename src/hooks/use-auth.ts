import { supabase } from "@/services/database";
import { Session } from "@supabase/supabase-js";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { useUser, useUserId } from "./use-user";
import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "@/services/queryClient";
import Coupon from "@/data/coupon";
import Location from "@/data/location";
import Profile from "@/data/profile";

export const useProtectedRoute = (router: Router) => {
  const user = useUser();

  if (!user) {
    router.replace("/auth");
  }
};

export function useAuthentication(router: Router, mandatory = false) {
  const [authChecked, setAuthChecked] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (mandatory) {
      supabase.auth
        .getSession()
        .then(async ({ data: { session } }) => {
          setSession(session);

          if (!session || session.user === null) {
            console.log("User not connected");
            router.replace("/auth");
          }
        })
        .catch((error) => {
          console.error("[getSession error]", error);
        })
        .finally(() => {
          setAuthChecked(true);
        });
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }
  }, []);

  return [authChecked] as const;
}

export function useConnect(router: Router) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [method, setMethod] = useState<"login" | "signup" | "">("");

  const inputValidation = (email: string, password: string) => {
    // Check if email is valid
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }

    // Check if password is valid, i.e. at least 8 characters, 1 uppercase, 1 lowercase, 1 number
    if (!password || password.length < 8) {
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      return false;
    }
    if (!/[a-z]/.test(password)) {
      return false;
    }
    if (!/[0-9]/.test(password)) {
      return false;
    }

    return true;
  };

  const updateSession = (session: Session | null) => {
    if (session) {
      queryClient.setQueryData(["user"], {
        data: {
          session: session,
        },
      });
    } else {
      queryClient.setQueryData(["user"], null);
    }
  };

  const connect = async (): Promise<boolean> => {
    if (!inputValidation(email, password)) return false;
    try {
      if (method === "login") {
        const { data: session, error } = await supabase.auth.signInWithPassword(
          {
            email,
            password,
          }
        );
        if (error) {
          return false;
        }
        updateSession(session.session);
        return true;
      }

      if (method === "signup") {
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          return false;
        }

        if (!session) {
        }

        updateSession(session);
        return true;
      }

      return false;
    } catch (error) {
      console.error("[connect error]", error);
      return false;
    }
  };

  return [
    email,
    setEmail,
    password,
    setPassword,
    method,
    setMethod,
    connect,
  ] as const;
}

export function useDisconnect(router: Router) {
  const userId = useUserId();

  const { mutate: disconnect } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("[signOut error]", error);
      } else {
        router.replace("/business/login");
      }
    },
    mutationKey: ["disconnect"],
    onSuccess: async () => {
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(Profile.queryKey(userId ?? ""), null);
      queryClient.setQueryData(Coupon.queryKeyByUser(userId ?? ""), null);
      queryClient.setQueryData(Location.queryKeyByUser(userId ?? ""), null);
      queryClient.setQueryData(["settings"], null);
    },
  });
  return disconnect;
}
