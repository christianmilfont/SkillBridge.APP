import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function CourseDetails({ route, navigation }) {
  const { courseId } = route.params;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `http://localhost:5069/api/course/${courseId}`
      );

      const data = await response.json();
      setCourse(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 30 }} />;

  if (!course) return <Text style={styles.error}>Curso não encontrado.</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.title}</Text>

      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.text}>{course.description}</Text>

      <Text style={styles.label}>Competências do Curso:</Text>
      {course.courseCompetencies?.map((c) => (
        <View key={c.competencyId} style={styles.compBox}>
          <Text style={styles.compText}>{c.competency?.name}</Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 8 },
  label: { fontSize: 18, fontWeight: "bold", marginTop: 15 },
  text: { fontSize: 15, marginTop: 4, color: "#374151" },
  compBox: {
    padding: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 8,
    marginVertical: 6,
  },
  compText: { fontSize: 16, fontWeight: "600" },
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
