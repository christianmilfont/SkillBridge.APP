import React, { useEffect, useContext } from "react";
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Alert } from "react-native";
import ProfileContext from "../context/ProfileContext";  // Importando o contexto de perfil
import AuthContext from "../context/AuthContext";  // Importando o contexto de autenticação
import { profileStyles } from "../styles/profileStyles";

export default function ProfileScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);  // Acessando o usuário logado
  const { profile, loading, loadProfile } = useContext(ProfileContext);  // Acessando o perfil e funções

  // Carregar o perfil sempre que o usuário for atualizado
  useEffect(() => {
    if (user) {
      loadProfile(); // Carregar o perfil do usuário
    }
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
            onPress={() => navigation.navigate("CreateProfileScreen")}
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
          
          {/* Garantir que profileCompetencies seja um array */}
           {profile.profileCompetencies && profile.profileCompetencies.length > 0 ? (
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
          ) : (
            <Text style={profileStyles.emptyText}>Nenhuma competência cadastrada</Text>
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
