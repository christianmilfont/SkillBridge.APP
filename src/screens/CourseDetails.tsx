// src/screens/CourseDetailsScreen.tsx

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import api from "../context/api";
import { courseDetailsStyles } from "../styles/courseDetailsStyles";

type CourseDetails = {
  id: string;
  title: string;
  description?: string;
  courseCompetencies: {
    competencyId: string;
    competencyName: string;
  }[];
};

export default function CourseDetailsScreen({ route }: any) {
  const { course } = route.params; // recebe { id, title, description }
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourseDetails = async () => {
    setLoading(true);

    if (!course?.id) {
      console.log("❌ Curso ou ID inválido.");
      setLoading(false);
      return;
    }

    try {
      // Busca detalhes reais da API
      const res = await api.get(`/api/Course/${course.id}`);
      setCourseDetails(res.data);
    } catch (err) {
      console.log("Erro ao carregar detalhes do curso", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={courseDetailsStyles.center} />;

  if (!courseDetails) {
    return (
      <View style={courseDetailsStyles.container}>
        <Text>Detalhes do curso não encontrados.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={courseDetailsStyles.container}>
      <Text style={courseDetailsStyles.title}>{courseDetails.title}</Text>
      <Text style={courseDetailsStyles.description}>{courseDetails.description}</Text>

      <Text style={courseDetailsStyles.subTitle}>Competências</Text>

      {courseDetails.courseCompetencies.length === 0 ? (
        <Text>Nenhuma competência associada a este curso.</Text>
      ) : (
        <View>
          {courseDetails.courseCompetencies.map((comp, index) => (
            <Text key={index} style={courseDetailsStyles.competency}>
              • {comp.competencyName}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
