import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import api from "../context/api";
import { courseDetailsStyles } from "../styles/courseDetailsStyles"; // Adicione os estilos

type Course = {
  id: string;
  title: string;
  description?: string;
  CourseCompetencies: { CompetencyName: string }[];
};

export default function CourseDetailsScreen({ route }: any) {
  const { course } = route.params;
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourseDetails = async () => {
  setLoading(true);

  if (!course || !course.id) {
    console.log("Curso ou ID inválido.");
    setLoading(false);
    return;
  }

  try {
    const res = await api.get(`/api/v1/course/${course.id}`);
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

  if (loading) return <ActivityIndicator size="large" style={courseDetailsStyles.center} />;

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
      {courseDetails.CourseCompetencies.length === 0 ? (
        <Text>Nenhuma competência associada a este curso.</Text>
      ) : (
        <View>
          {courseDetails.CourseCompetencies.map((competency, index) => (
            <Text key={index} style={courseDetailsStyles.competency}>
              {competency.CompetencyName}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
