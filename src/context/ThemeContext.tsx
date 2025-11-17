import React, { createContext, useState, useMemo, useContext, ReactNode } from "react";
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { customLightTheme, customDarkTheme } from "../styles/theme";

// Tipagem para o ThemeContext
type ThemeContextType = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  colors: typeof customLightTheme.colors; // Agora usando o tipo das cores customizadas
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
  colors: customLightTheme.colors, // Inicializa com as cores do tema claro
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  // Seleciona o tema correto com base na variável isDarkTheme
  const theme = useMemo(
    () => (isDarkTheme ? customDarkTheme : customLightTheme),
    [isDarkTheme]
  );

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, colors: theme.colors }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeContext;
