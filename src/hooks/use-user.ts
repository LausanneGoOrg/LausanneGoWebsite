import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export const useUserId = () => {
  const user = useContext(UserContext);
  return user?.id;
};

export const useUser = () => {
  const user = useContext(UserContext);
  return user;
};
