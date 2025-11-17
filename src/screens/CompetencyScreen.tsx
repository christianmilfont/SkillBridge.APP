import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";

export default function CompetencyScreen({ navigation, route }: any) {
  const { user } = useContext(AuthContext);
  const [newCompetency, setNewCompetency] = useState(""); // Competência a ser criada
  const [competencyLevel, setCompetencyLevel] = useState(""); // Nível de competência (1 a 4)
  const [competencyDescription, setCompetencyDescription] = useState(""); // Descrição da competência

  const profileId = route.params?.profileId; // Pegando o profileId da navegação

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

      // Associar a competência ao perfil
      if (profileId) {
        await addCompetencyToProfile(profileId, competencyId, level);
      } else {
        Alert.alert("Erro", "Perfil não encontrado.");
      }

      setNewCompetency("");
      setCompetencyLevel("");
      setCompetencyDescription("");
      Alert.alert("Sucesso", "Competência criada e associada com sucesso!");
      navigation.goBack(); // Volta para a tela de perfil
    } catch (err) {
      console.log("Erro ao criar competência:",  err);
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
        Alert.alert("Sucesso", "Competência associada ao seu perfil com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível associar a competência ao perfil.");
      }
    } catch (err) {
      console.log("Erro ao associar competência ao perfil:", err);
      Alert.alert("Erro", "Não foi possível associar a competência.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Competência</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da competência"
        value={newCompetency}
        onChangeText={setNewCompetency}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição da competência"
        value={competencyDescription}
        onChangeText={setCompetencyDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Nível (1 a 4)"
        keyboardType="numeric"
        value={competencyLevel}
        onChangeText={setCompetencyLevel}
        maxLength={1}
      />

      <TouchableOpacity style={styles.button} onPress={createCompetency}>
        <Text style={styles.buttonText}>Criar Competência</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 12 },
  input: { backgroundColor: "#F3F4F6", padding: 10, borderRadius: 8, marginTop: 6 },
  button: { backgroundColor: "#0B81FF", padding: 12, borderRadius: 10, marginTop: 12 },
  buttonText: { color: "#FFF", textAlign: "center", fontWeight: "700" },
});
