import { createContext, useState } from "react";

export const SnackbarContext = createContext<{
  snackbar: SnackbarType | null;
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarType | null>>;
}>({
  snackbar: null,
  setSnackbar: () => null,
});

export type SnackbarType = {
  message: string;
  type: "success" | "error" | "info";
  duration: number;
};

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarType | null>(null);

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
