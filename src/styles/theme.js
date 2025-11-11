import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

export const customLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#0A84FF",
    secondary: "#FF6B6B",
    background: "#F5F5F5",
  },
};

export const customDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#0A84FF",
    secondary: "#FF6B6B",
    background: "#121212",
  },
};