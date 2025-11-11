// src/context/ThemeContext.tsx
import React, { createContext, useState, useMemo, useContext, ReactNode } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { customLightTheme, customDarkTheme } from "../styles/theme";

type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  const theme = useMemo(
    () => (isDarkTheme ? customDarkTheme : customLightTheme),
    [isDarkTheme]
  );

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
