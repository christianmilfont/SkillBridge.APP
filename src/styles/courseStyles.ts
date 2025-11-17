// src/styles/courseStyles.ts

import { StyleSheet } from "react-native";

export const courseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Escuro, com contraste
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00bcd4", // Azul futurista
    marginBottom: 20,
    letterSpacing: 1.5, // Aumenta o espaçamento entre as letras para uma pegada futurista
    textTransform: "uppercase", // Deixa o título em maiúsculas
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1e1e1e", // Fundo escuro para destacar
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 8, // Sombra para dar um efeito de flutuação
    borderWidth: 1,
    borderColor: "#00bcd4", // Borda azul futurista
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // Título claro
    letterSpacing: 1, // Aumenta o espaçamento entre as letras para dar um toque moderno
  },
  desc: {
    marginTop: 8,
    fontSize: 14,
    color: "#b0b0b0", // Cor suave para a descrição
    lineHeight: 20, // Aumenta a altura da linha para tornar o texto mais legível
  },
  emptyBox: {
    marginTop: 50,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280", // Cor cinza para a mensagem de "vazio"
  },
  button: {
    backgroundColor: "#00bcd4",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#00bcd4", // Cor de borda metálica
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
