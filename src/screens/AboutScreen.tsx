import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

export default function AboutScreen() {
  // Pega informações do expo-constants
  const commitHash = Constants.gitCommitHash ?? "Hash não disponível";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Último Commit:</Text>
        <Text style={styles.value}>{commitHash}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1a1a1a",
    width: "100%",
    padding: 20,
    borderRadius: 16,
  },
  label: {
    color: "#888",
    fontSize: 14,
    marginTop: 10,
  },
  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
