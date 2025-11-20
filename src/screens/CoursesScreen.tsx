// src/screens/CoursesScreen.tsx

import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";
import { courseStyles } from "../styles/courseStyles";

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
      // 1Busca o perfil do usuário
      const profilesRes = await api.get("/api/v1/profiles");
      const profiles = profilesRes.data as any[];

      const myProfile = profiles.find((p) => p.userId === user?.id);
      if (!myProfile) {
        setCourses([]);
        setLoading(false);
        return;
      }

      const profileId = myProfile.id;

      // 2️⃣ Busca cursos recomendados
      const res = await api.get(`/api/Recommendation/courses/${profileId}`);

      // 3️⃣ Converte "courseId" → "id" ✔️
      const mappedCourses = res.data.map((c: any) => ({
        id: c.courseId,
        title: c.title,
        description: c.description,
      }));

      setCourses(mappedCourses);

    } catch (err) {
      console.log("Erro ao carregar cursos recomendados", err);
      Alert.alert("Erro", "Não foi possível carregar os cursos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchRecommendedCourses();
  }, [user]);

  if (loading)
    return <ActivityIndicator size="large" style={courseStyles.center} />;

  return (
    <View style={courseStyles.container}>
      <Text style={courseStyles.title}>Cursos recomendados</Text>

      {courses.length === 0 ? (
        <View style={courseStyles.emptyBox}>
          <Text style={courseStyles.emptyText}>Nenhum curso recomendado.</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={courseStyles.card}
              onPress={() =>
                navigation.navigate("CourseDetails", { course: item })
              }
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
