import { supabase } from "@/services/database";
import { i18n } from "@lingui/core";
import { Session } from "@supabase/supabase-js";
import { Router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useUser, useUserId } from "./use-user";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFirstConnection,
  getSkippedConnection,
  storeFirstConnection,
  storeSkippedConnection,
} from "@/services/persistentStorage/connectionStorage";
import queryClient from "@/services/queryClient";
import Coupon from "@/data/coupon";
import Location from "@/data/location";
import Profile from "@/data/profile";
import { useSnackbarMessage } from "./use-snackbar";

export const useProtectedRoute = (router: Router) => {
  const user = useUser();

  if (!user) {
    router.replace("/auth");
  }
};

export function useAuthentication(router: Router, mandatory = false) {
  const [authChecked, setAuthChecked] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const connexionSkipped = useSkipConnection();

  useEffect(() => {
    if (mandatory || !connexionSkipped) {
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
  const connectionSkippedStore = useSkipConnectionStore();
  const snackbarMessage = useSnackbarMessage();

  async function signInWithEmail() {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);

    router.replace("/");
  }

  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) snackbarMessage(error.message, "error");
    if (!session)
      snackbarMessage(
        i18n._("Please check your inbox for email verification!"),
        "info"
      );

    router.replace("/");
  }

  const inputValidation = (email: string, password: string) => {
    // Check if email is valid
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      snackbarMessage(i18n._("Please enter a valid email address"), "error");
      return false;
    }

    // Check if password is valid, i.e. at least 8 characters, 1 uppercase, 1 lowercase, 1 number
    if (!password || password.length < 8) {
      snackbarMessage(
        i18n._("Password must be at least 8 characters long"),
        "error"
      );
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      snackbarMessage(
        i18n._("Password must contain at least one uppercase letter"),
        "error"
      );
      return false;
    }
    if (!/[a-z]/.test(password)) {
      snackbarMessage(
        i18n._("Password must contain at least one lowercase letter"),
        "error"
      );
      return false;
    }
    if (!/[0-9]/.test(password)) {
      snackbarMessage(
        i18n._("Password must contain at least one number"),
        "error"
      );
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
          snackbarMessage(error.message, "error");
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
          snackbarMessage(error.message, "error");
          return false;
        }

        if (!session) {
          snackbarMessage(
            i18n._("Please check your inbox for email verification!"),
            "info"
          );
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

  const skipConnection = async () => {
    return new Promise((resolve) => {
      connectionSkippedStore.mutate(undefined, {
        onSettled: () => {
          resolve(true);
        },
      });
    });
  };

  return [
    email,
    setEmail,
    password,
    setPassword,
    method,
    setMethod,
    skipConnection,
    connect,
  ] as const;
}

export function useDisconnect(router: Router) {
  const userId = useUserId();
  const snackbarMessage = useSnackbarMessage();

  const { mutate: disconnect } = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        snackbarMessage(i18n._("Error while disconnecting"), "error");
        console.error("[signOut error]", error);
      } else {
        snackbarMessage(i18n._("Disconnected successfully"), "success");
        router.replace("/auth");
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

export function useSkipConnection() {
  const { data: skipped } = useQuery({
    queryKey: ["connection", "skipped"],
    queryFn: () => getSkippedConnection(),
    initialData: false,
  });

  return skipped;
}

export function useFirstConnection() {
  const { data: first } = useQuery({
    queryKey: ["settings", "confidentiality"],
    queryFn: () => getFirstConnection(),
    initialData: true,
  });

  return first;
}

export function useSkipConnectionStore() {
  return useMutation({
    mutationFn: async () => storeSkippedConnection(),
    onMutate: async () => {
      queryClient.invalidateQueries({
        queryKey: ["connection", "skipped"],
      });
    },
    onSuccess: async () => {
      queryClient.setQueryData(["connection", "skipped"], true);
    },
  });
}

export function useFirstConnectionStore() {
  return useMutation({
    mutationFn: async () => storeFirstConnection(),
    onMutate: async () => {
      queryClient.invalidateQueries({
        queryKey: ["connection", "first"],
      });
    },
    onSuccess: async () => {
      queryClient.setQueryData(["connection", "first"], false);
    },
  });
}
