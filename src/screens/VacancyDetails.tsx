import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function VacancyDetails({ route, navigation }) {
  const { vacancyId } = route.params;
  const [vacancy, setVacancy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVacancy();
  }, []);

  const fetchVacancy = async () => {
    try {
      const response = await fetch(
        `http://localhost:5069/api/vacancy/${vacancyId}`
      );

      const data = await response.json();
      setVacancy(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;

  if (!vacancy) return <Text style={styles.error}>Vaga não encontrada.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{vacancy.title}</Text>
      <Text style={styles.company}>{vacancy.company}</Text>
      <Text style={styles.location}>{vacancy.location}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.text}>{vacancy.description}</Text>

      <Text style={styles.label}>Competências requisitadas:</Text>
      {vacancy.vacancyCompetencies?.map((c) => (
        <View key={c.competencyId} style={styles.compBox}>
          <Text style={styles.compText}>{c.competency?.name}</Text>
          <Text style={styles.level}>Nível: {c.requiredLevel}</Text>
        </View>
      ))}

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  company: { fontSize: 18, fontWeight: "600", color: "#0B81FF" },
  location: { fontSize: 16, marginBottom: 20, color: "#4B5563" },
  label: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  text: { fontSize: 15, marginTop: 4, color: "#374151" },
  compBox: {
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginVertical: 6,
  },
  compText: { fontSize: 16, fontWeight: "600" },
  level: { fontSize: 14, color: "#555" },
  backBtn: {
    marginTop: 25,
    padding: 14,
    backgroundColor: "#0B81FF",
    borderRadius: 10,
    alignItems: "center",
  },
  backText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  error: { textAlign: "center", marginTop: 30, fontSize: 18, color: "red" },
});
