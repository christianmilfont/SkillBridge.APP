import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";

export default function ProfileScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/v1/profiles");
      const list = res.data as any[];
      const my = list.find((p) => p.userId === user?.id);
      setProfile(my || null);
    } catch (err) {
      console.log("Erro ao carregar profile:", err);
      Alert.alert("Erro", "Não foi possível carregar seu perfil.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    loadProfile();
  }, [user]);

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {!profile ? (
        <>
          <Text style={styles.emptyText}>Você ainda não possui um perfil.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CompetencyQuestionsScreen")}
          >
            <Text style={styles.buttonText}>Criar Perfil e Competências</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{profile.fullName}</Text>

          <Text style={styles.label}>Bio</Text>
          <Text style={styles.value}>{profile.bio}</Text>

          <Text style={styles.label}>Localização</Text>
          <Text style={styles.value}>{profile.location}</Text>

          <Text style={styles.label}>Competências</Text>

         {profile.profileCompetencies?.length === 0 ? (
  <Text style={styles.emptyText}>Nenhuma competência cadastrada</Text>
) : (
  profile.profileCompetencies.map((pc: any, index: number) => (
    <View key={pc.id || index} style={styles.skillBox}>
      {/* Assegure-se de que todos os textos estejam dentro de um componente <Text> */}
      <Text style={styles.skillName}>
        {pc.competency?.name ?? "—"}
      </Text>
      <Text style={styles.skillLevel}>
        Nível: {pc.selfAssessedLevel}/5
      </Text>
    </View>
  ))
)}





          {/* Botão para ir à tela de Competências */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("CompetencyScreen", { profileId: profile.id })}  // Passando o profileId
          >
            <Text style={styles.buttonText}>Gerenciar Competências</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, padding: 18 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 12 },
  label: { marginTop: 12, fontWeight: "700" },
  value: { marginTop: 4, fontSize: 16 },
  skillBox: { padding: 12, backgroundColor: "#F3F4F6", borderRadius: 10, marginTop: 8 },
  skillName: { fontWeight: "700" },
  skillLevel: { marginTop: 4 },
  emptyText: { color: "#6B7280", marginTop: 12 },
  button: { backgroundColor: "#0B81FF", padding: 12, borderRadius: 10, marginTop: 12 },
  buttonText: { color: "#FFF", textAlign: "center", fontWeight: "700" },
});
