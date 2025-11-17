import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";

export default function HomeScreen({ navigation }: any) {
  const { user, loading: authLoading, signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any | null>(null);
  const [courses, setCourses] = useState<any[]>([]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Carregar perfil
      const resProfiles = await api.get("/api/v1/profiles");
      const myProfile = resProfiles.data.find((p: any) => p.userId === user.id);
      setProfile(myProfile || null);

      // Carregar cursos recomendados
      if (myProfile) {
        const resCourses = await api.get(`/api/recommendation/courses/${myProfile.id}`);
        setCourses(resCourses.data || []);
      }
    } catch (err) {
      console.log("Erro ao carregar dados do HomeScreen:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.text}>Carregando informações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao SkillBridge!</Text>
      <Text style={styles.subtitle}>
        {user ? `Olá, ${user.username}!` : "Usuário não identificado"}
      </Text>

      {profile ? (
        <View style={styles.profileBox}>
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileInfo}>{profile.location}</Text>
          <Text style={styles.profileInfo}>Competências: {profile.profileCompetencies?.length || 0}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.buttonText}>Ver Perfil / Editar Competências</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.button, { marginBottom: 20 }]}
          onPress={() => navigation.navigate("CompetencyQuestions")}
        >
          <Text style={styles.buttonText}>Criar Perfil</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.sectionTitle}>Cursos Recomendados</Text>
      {courses.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum curso recomendado por enquanto.</Text>
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
              <Text numberOfLines={2} style={styles.desc}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

     <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={async () => {
        await signOut();  // Realiza o logout
        navigation.navigate('Auth');  // Redireciona para a tela de Login
      }}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#222", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  profileBox: { backgroundColor: "#e7f0ff", padding: 16, borderRadius: 10, marginBottom: 20 },
  profileName: { fontSize: 18, fontWeight: "700" },
  profileInfo: { fontSize: 14, marginTop: 4, color: "#333" },
  button: { backgroundColor: "#007bff", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 8, marginTop: 12 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginVertical: 12 },
  card: { padding: 14, backgroundColor: "#fff", borderRadius: 10, marginBottom: 10, elevation: 1 },
  courseTitle: { fontSize: 16, fontWeight: "700" },
  desc: { marginTop: 4, color: "#374151" },
  emptyText: { color: "#6B7280", marginTop: 6 },
  text: { color: "#444", marginTop: 10, textAlign: "center" },
});
