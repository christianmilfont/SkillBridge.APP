// src/screens/CoursesScreen.tsx

import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";
import { courseStyles } from "../styles/courseStyles"; // Importando os estilos

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

  if (loading) return <ActivityIndicator size="large" style={courseStyles.center} />;

  return (
    <View style={courseStyles.container}>
      <Text style={courseStyles.title}>Cursos recomendados</Text>

      {courses.length === 0 ? (
        <View style={courseStyles.emptyBox}>
          <Text style={courseStyles.emptyText}>Nenhum curso recomendado por enquanto.</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={courseStyles.card}
              onPress={() => navigation.navigate("CourseDetails", { course: item })}
            >
              <Text style={courseStyles.courseTitle}>{item.title}</Text>
              <Text numberOfLines={3} style={courseStyles.desc}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}