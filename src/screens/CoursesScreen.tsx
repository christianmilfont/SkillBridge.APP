import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";

type Course = {
  id: string;
  title: string;
  description?: string;
};

export default function CoursesScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendedCourses = async () => {
    setLoading(true);
    try {
      const profilesRes = await api.get("/api/v1/profiles");
      const profiles = profilesRes.data as any[];
      const myProfile = profiles.find((p) => p.userId === user?.id);
      if (!myProfile) {
        setCourses([]);
        setLoading(false);
        return;
      }

      const profileId = myProfile.id;
      const res = await api.get(`/api/Recommendation/courses/${profileId}`);
      setCourses(res.data || []);
    } catch (err) {
      console.log("Erro ao carregar cursos recomendados", err);
      Alert.alert("Erro", "Não foi possível carregar cursos recomendados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchRecommendedCourses();
  }, [user]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cursos recomendados</Text>

      {courses.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Nenhum curso recomendado por enquanto.</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("CourseDetails", { course: item })}
            >
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text numberOfLines={3} style={styles.desc}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 18 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  card: { padding: 14, backgroundColor: "#F8FAFC", borderRadius: 10, marginBottom: 10 },
  courseTitle: { fontSize: 16, fontWeight: "700" },
  desc: { marginTop: 8, color: "#374151" },
  emptyBox: { marginTop: 40, alignItems: "center" },
  emptyText: { color: "#6B7280", fontSize: 16 },
});
