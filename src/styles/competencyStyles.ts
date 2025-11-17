// src/styles/competencyStyles.ts

import { StyleSheet } from "react-native";

export const competencyStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212", // Fundo escuro, para um visual futurista
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#00bcd4", // Azul futurista
    marginBottom: 20,
    letterSpacing: 1.5,
    textTransform: "uppercase", // Maiúsculas para o título
  },
  input: {
    backgroundColor: "#1e1e1e", // Fundo escuro nos inputs
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    color: "#fff", // Texto branco para os campos de entrada
    borderWidth: 1,
    borderColor: "#00bcd4", // Borda azul futurista
  },
  button: {
    backgroundColor: "#00bcd4", // Azul vibrante para o botão
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#00bcd4", // Borda metálica para o botão
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
