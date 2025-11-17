// src/styles/homeStyles.ts

import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Escuro com contraste
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00bcd4", // Cor futurista azul
    marginBottom: 8,
    letterSpacing: 1.5, // Mais espaçamento entre as letras para um look futurista
    textAlign: "center"
  },
  subtitle: {
    fontSize: 18,
    color: "#eeeeee", // Tom mais suave
    marginBottom: 20,
    fontWeight: "500",
  },
  profileBox: {
    backgroundColor: "rgba(0, 188, 212, 0.1)", // Azul com transparência
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#00bcd4", // Azul futurista
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff", // Texto claro no perfil
  },
  profileInfo: {
    fontSize: 14,
    marginTop: 4,
    color: "#dcdcdc", // Texto suave
  },
  button: {
    backgroundColor: "#00bcd4", // Azul futurista
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#00bcd4", // Cor de borda metálica
    elevation: 5, // Sombra sutil para destacar
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff", // Cor mais clara para o título
    marginVertical: 12,
  },
  card: {
    padding: 16,
    backgroundColor: "#1e1e1e", // Fundo escuro para os cards
    borderRadius: 15,
    marginBottom: 12,
    elevation: 8, // Sombra forte para destacar
    borderWidth: 1,
    borderColor: "#333", // Borda sutil
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  desc: {
    marginTop: 6,
    color: "#cccccc", // Texto mais claro
  },
  emptyText: {
    color: "#888",
    marginTop: 6,
    fontSize: 16,
  },
  text: {
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
});
