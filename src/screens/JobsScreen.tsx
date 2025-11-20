import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";

type Vacancy = {
  id: string;
  title: string;
  description?: string;
  company?: string;
  location?: string;
  status?: number;
};

export default function JobsScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommended = async () => {
    setLoading(true);
    try {
      // 1) buscar profileId do usuário
      const profilesRes = await api.get("/api/v1/profiles");
      const profiles = profilesRes.data as any[];
      const myProfile = profiles.find((p) => p.userId === user?.id);

      if (!myProfile) {
        setVacancies([]);
        setLoading(false);
        return;
      }

      const profileId = myProfile.id;
      const res = await api.get(`/api/Recommendation/vacancies/${profileId}`);

      console.log("Vagas recebidas da API:", res.data);

      // Garantir que cada item tenha o campo "id"
      const mappedVacancies = (res.data || []).map((v: any) => ({
        id: v.vacancyId, // vem do seu endpoint
        title: v.title,
        description: v.description,
        company: v.company,
        location: v.location,
      }));

      setVacancies(mappedVacancies);

    } catch (err: any) {
      console.log("Erro ao carregar vagas recomendadas:", err);
      Alert.alert("Erro", "Não foi possível carregar vagas recomendadas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchRecommended();
  }, [user]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vagas recomendadas</Text>

      {vacancies.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Nenhuma vaga recomendada para seu perfil.</Text>
          <Text style={styles.hint}>Preencha ou atualize suas competências no perfil.</Text>
        </View>
      ) : (
        <FlatList
          data={vacancies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("VacancyDetails", { vacancyId: item.id })}
            >
              <Text style={styles.jobTitle}>{item.title}</Text>
              {item.company ? <Text style={styles.company}>{item.company}</Text> : null}
              {item.location ? <Text style={styles.location}>{item.location}</Text> : null}
              <Text numberOfLines={2} style={styles.desc}>
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
  card: { padding: 14, backgroundColor: "#F3F4F6", borderRadius: 10, marginBottom: 10 },
  jobTitle: { fontSize: 16, fontWeight: "700" },
  company: { marginTop: 6, fontSize: 13, color: "#374151" },
  location: { fontSize: 13, color: "#4B5563" },
  desc: { marginTop: 8, color: "#374151" },
  emptyBox: { marginTop: 40, alignItems: "center" },
  emptyText: { color: "#6B7280", fontSize: 16 },
  hint: { marginTop: 6, color: "#9CA3AF" },
});
