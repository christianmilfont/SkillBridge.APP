// src/screens/VacancyDetailsScreen.tsx

import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import api from "../context/api";

type VacancyDetails = {
  id: string;
  title: string;
  description?: string;
  company?: string;
  location?: string;
  vacancyCompetencies: {
    competencyId: string;
    competencyName?: string;
    requiredLevel?: number;
  }[];
};

export default function VacancyDetailsScreen({ route }: any) {
  const { vacancyId } = route.params;
  const [vacancy, setVacancy] = useState<VacancyDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchVacancyDetails = async () => {
    setLoading(true);

    const vacancyId = route?.params?.vacancyId;
if (!vacancyId) {
  console.log("❌ ID da vaga inválido:", route.params);
  setLoading(false);
  return;
}

    try {
      const res = await api.get(`/api/vacancy/${vacancyId}`);
      setVacancy(res.data);
    } catch (err) {
      console.log("Erro ao carregar detalhes da vaga:", err);
      setVacancy(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancyDetails();
  }, []);

  if (loading)
    return <ActivityIndicator size="large" style={styles.center} />;

  if (!vacancy)
    return (
      <View style={styles.container}>
        <Text>Detalhes da vaga não encontrados.</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{vacancy.title}</Text>
      {vacancy.company && (
        <>
          <Text style={styles.subTitle}>Empresa</Text>
          <Text>{vacancy.company}</Text>
        </>
      )}
      {vacancy.location && (
        <>
          <Text style={styles.subTitle}>Localização</Text>
          <Text>{vacancy.location}</Text>
        </>
      )}
      {vacancy.description && (
        <>
          <Text style={styles.subTitle}>Descrição</Text>
          <Text>{vacancy.description}</Text>
        </>
      )}

      <Text style={styles.subTitle}>Competências requisitadas</Text>
      {vacancy.vacancyCompetencies.length === 0 ? (
        <Text>Nenhuma competência associada a esta vaga.</Text>
      ) : (
        vacancy.vacancyCompetencies.map((c, index) => (
          <Text key={index} style={styles.competency}>
            • {c.competencyName ?? "Competência não encontrada"}{" "}
            {c.requiredLevel ? `(Nível: ${c.requiredLevel})` : ""}
          </Text>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 18 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  subTitle: { fontSize: 16, fontWeight: "600", marginTop: 12 },
  competency: { marginLeft: 10, marginTop: 6 },
});
