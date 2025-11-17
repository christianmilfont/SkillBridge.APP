// src/screens/ProfileScreen.tsx

import React, { useEffect, useState, useContext } from "react";
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";
import { profileStyles } from "../styles/profileStyles"; // Importando os estilos

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

  if (loading) return <ActivityIndicator size="large" style={profileStyles.center} />;

  return (
    <ScrollView style={profileStyles.container}>
      <Text style={profileStyles.title}>Meu Perfil</Text>

      {!profile ? (
        <>
          <Text style={profileStyles.emptyText}>Você ainda não possui um perfil.</Text>
          <TouchableOpacity
            style={profileStyles.button}
            onPress={() => navigation.navigate("CompetencyQuestionsScreen")}
          >
            <Text style={profileStyles.buttonText}>Criar Perfil e Competências</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={profileStyles.label}>Nome</Text>
          <Text style={profileStyles.value}>{profile.fullName}</Text>

          <Text style={profileStyles.label}>Bio</Text>
          <Text style={profileStyles.value}>{profile.bio}</Text>

          <Text style={profileStyles.label}>Localização</Text>
          <Text style={profileStyles.value}>{profile.location}</Text>

          <Text style={profileStyles.label}>Competências</Text>

          {profile.profileCompetencies?.length === 0 ? (
            <Text style={profileStyles.emptyText}>Nenhuma competência cadastrada</Text>
          ) : (
            profile.profileCompetencies.map((pc: any, index: number) => (
              <View key={pc.id || index} style={profileStyles.skillBox}>
                <Text style={profileStyles.skillName}>
                  {pc.competency?.name ?? "—"}
                </Text>
                <Text style={profileStyles.skillLevel}>
                  Nível: {pc.selfAssessedLevel}/5
                </Text>
              </View>
            ))
          )}

          {/* Botão para ir à tela de Competências */}
          <TouchableOpacity
            style={profileStyles.button}
            onPress={() => navigation.navigate("CompetencyScreen", { profileId: profile.id })}
          >
            <Text style={profileStyles.buttonText}>Gerenciar Competências</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
