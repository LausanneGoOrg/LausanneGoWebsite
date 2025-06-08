import { supabase } from "@/services/database";
import { User } from "@supabase/auth-js";
import { useQuery } from "@tanstack/react-query";
import { createContext } from "react";

export const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: () => supabase.auth.getSession(),
    select: (data) => {
      if (data.data.session) {
        return data.data.session.user;
      }
      return null;
    },
  });

  return (
    <UserContext.Provider value={user || null}>{children}</UserContext.Provider>
  );
};
