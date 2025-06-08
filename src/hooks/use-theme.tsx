import { ColorTheme, lightTheme, darkTheme } from "@/constants/Colors";
import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext<ColorTheme>(lightTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const scheme = useColorScheme();

  return (
    <ThemeContext.Provider value={scheme === "dark" ? darkTheme : lightTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
