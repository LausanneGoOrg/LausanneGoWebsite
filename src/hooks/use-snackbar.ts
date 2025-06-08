import { SnackbarContext, SnackbarType } from "@/contexts/snackbar-context";
import { useContext } from "react";

export const useSnackbar = () => {
  const { snackbar } = useContext(SnackbarContext);
  return snackbar;
};

export const useSnackbarMessage = () => {
  const { setSnackbar } = useContext(SnackbarContext);
  return (message: SnackbarType["message"], level: SnackbarType["type"]) => {
    setSnackbar({
      message,
      type: level,
      duration: 5000,
    });
  };
};
