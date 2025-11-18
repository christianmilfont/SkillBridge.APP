// src/screens/HomeScreen.tsx
import React, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";
import { homeStyles } from "../styles/homeStyles";

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
        const resCourses = await api.get(`/api/Recommendation/courses/${myProfile.id}`);
        setCourses(resCourses.data || []);
      } else {
        setCourses([]);
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
      <View style={homeStyles.container}>
        <ActivityIndicator size="large" color="#00bcd4" />
        <Text style={homeStyles.text}>Carregando informações...</Text>
      </View>
    );
  }

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>SkillBridge</Text>
      <Text style={homeStyles.subtitle}>
        {user ? `Olá, ${user.username}!` : "Usuário não identificado"}
      </Text>

      {profile ? (
        <View style={homeStyles.profileBox}>
          <Text style={homeStyles.profileName}>{profile.fullName}</Text>
          <Text style={homeStyles.profileInfo}>{profile.location}</Text>
          <Text style={homeStyles.profileInfo}>
            Competências: {profile.profileCompetencies?.length || 0}
          </Text>

          <TouchableOpacity
            style={homeStyles.button}
            onPress={() =>
              navigation.navigate("Profile", {
                newProfile: profile,
                onProfileCreated: loadData,
              })
            }
          >
            <Text style={homeStyles.buttonText}>Ver Perfil</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[homeStyles.button, { marginBottom: 20 }]}
          onPress={() =>
            navigation.navigate("Profile", {
              onProfileCreated: loadData,
            })
          }
        >
          <Text style={homeStyles.buttonText}>Ver Perfil</Text>
        </TouchableOpacity>
      )}

      <Text style={homeStyles.sectionTitle}>Cursos Recomendados</Text>
      {courses.length === 0 ? (
        <Text style={homeStyles.emptyText}>Nenhum curso recomendado por enquanto.</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={homeStyles.card}
              onPress={() => navigation.navigate("CourseDetails", { course: item })}
            >
              <Text style={homeStyles.courseTitle}>{item.title}</Text>
              <Text numberOfLines={2} style={homeStyles.desc}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity
        style={[homeStyles.button, { marginTop: 20 }]}
        onPress={async () => {
          await signOut();
          navigation.navigate('Auth');
        }}
      >
        <Text style={homeStyles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
