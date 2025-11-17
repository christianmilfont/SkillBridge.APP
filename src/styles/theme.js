
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

// Adicionando a propriedade 'text' ao tema
export const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0A84FF",
    secondary: "#FF6B6B",
    background: "#F5F5F5",
    text: "#222",  // Definindo a cor do texto para o tema claro
  },
};

export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0A84FF",
    secondary: "#FF6B6B",
    background: "#121212",
    text: "#E0E0E0",  // Definindo a cor do texto para o tema escuro
  },
};