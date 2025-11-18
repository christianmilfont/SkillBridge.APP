import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AuthContext from "../context/AuthContext";
import ProfileContext from "../context/ProfileContext"; // Importa o contexto
import api from "../context/api";
import { competencyStyles } from "../styles/competencyStyles";

export default function CompetencyScreen({ navigation, route }: any) {
  const { user } = useContext(AuthContext);
  const { loadProfile } = useContext(ProfileContext); // Pega loadProfile
  const [newCompetency, setNewCompetency] = useState("");
  const [competencyLevel, setCompetencyLevel] = useState("");
  const [competencyDescription, setCompetencyDescription] = useState("");

  const profileId = route.params?.profileId;

  const createCompetency = async () => {
    if (!newCompetency || !competencyDescription || !competencyLevel) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const level = parseInt(competencyLevel);
      if (isNaN(level) || level < 1 || level > 4) {
        Alert.alert("Erro", "O nível de competência deve ser entre 1 e 4.");
        return;
      }

      // Criação da competência
      const res = await api.post("/api/v1/competencies", {
        Name: newCompetency,
        Description: competencyDescription,
        RecommendedLevel: level,
      });

      const competencyId = res.data.id;

      if (profileId) {
        await addCompetencyToProfile(profileId, competencyId, level);
      } else {
        Alert.alert("Erro", "Perfil não encontrado.");
        return;
      }

      setNewCompetency("");
      setCompetencyLevel("");
      setCompetencyDescription("");
      Alert.alert("Sucesso", "Competência criada e associada com sucesso!");

      // Atualiza o perfil
      await loadProfile(); // Aqui atualizamos o ProfileScreen automaticamente

      navigation.goBack();
    } catch (err) {
      console.log("Erro ao criar competência:", err);
      Alert.alert("Erro", "Não foi possível criar a competência.");
    }
  };

  const addCompetencyToProfile = async (profileId: string, competencyId: string, level: number) => {
    try {
      const response = await api.post(`/api/v1/profiles/${profileId}/competencies`, {
        CompetencyId: competencyId,
        SelfAssessedLevel: level,
      });

      if (response.status === 200) {
        console.log("Competência associada com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível associar a competência ao perfil.");
      }
    } catch (err) {
      console.log("Erro ao associar competência:", err);
      Alert.alert("Erro", "Não foi possível associar a competência.");
    }
  };

  return (
    <View style={competencyStyles.container}>
      <Text style={competencyStyles.title}>Adicionar Competência</Text>

      <TextInput
        style={competencyStyles.input}
        placeholder="Nome da competência"
        value={newCompetency}
        onChangeText={setNewCompetency}
      />
      <TextInput
        style={competencyStyles.input}
        placeholder="Descrição da competência"
        value={competencyDescription}
        onChangeText={setCompetencyDescription}
      />
      <TextInput
        style={competencyStyles.input}
        placeholder="Nível (1 a 4)"
        keyboardType="numeric"
        value={competencyLevel}
        onChangeText={setCompetencyLevel}
        maxLength={1}
      />

      <TouchableOpacity style={competencyStyles.button} onPress={createCompetency}>
        <Text style={competencyStyles.buttonText}>Criar Competência</Text>
      </TouchableOpacity>
    </View>
  );
}
