// src/styles/profileStyles.ts

import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Fundo escuro
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#00bcd4", // Azul futurista
    marginBottom: 20,
    letterSpacing: 1.5,
    textTransform: "uppercase", // Maiúsculas para um estilo moderno
  }, input:{},
  label: {
    marginTop: 16,
    fontWeight: "700",
    color: "#fff", // Texto branco
    fontSize: 16,
  },
  value: {
    marginTop: 6,
    fontSize: 16,
    color: "#e0e0e0", // Texto suave para o valor
  },
  skillBox: {
    padding: 16,
    backgroundColor: "#1e1e1e", // Fundo escuro para destacar as competências
    borderRadius: 10,
    marginTop: 12,
    elevation: 5, // Sombra para dar um efeito de flutuação
    borderWidth: 1,
    borderColor: "#00bcd4", // Borda azul futurista
  },
  skillName: {
    fontWeight: "700",
    color: "#fff",
  },
  skillLevel: {
    marginTop: 4,
    color: "#00bcd4", // Azul para o nível
  },
  emptyText: {
    color: "#6B7280", // Cinza para texto vazio
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#00bcd4",
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
  center: { // Adicionando o estilo 'center' para centralizar o ActivityIndicator
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
