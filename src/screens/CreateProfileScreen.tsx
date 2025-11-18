import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AuthContext from "../context/AuthContext";  // Contexto de autenticação
import ProfileContext from "../context/ProfileContext";  // Contexto de perfil
import api from "../context/api";  // API para fazer chamadas para o backend
  // Função para criar o perfil
  export default function CreateProfileScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);  // Obtemos o usuário autenticado
  const { setProfile } = useContext(ProfileContext);  // Função para atualizar o perfil

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // Verificar se o usuário está autenticado
  if (!user) {
    // Caso não tenha um usuário, você pode redirecionar para a tela de login ou mostrar uma mensagem
    Alert.alert("Erro", "Você precisa estar logado para criar um perfil.");
    navigation.navigate("Auth");  // Redireciona para a tela de login (ajuste conforme necessário)
    return null;
  }

  // Função para criar o perfil
  const createProfile = async () => {
    if (!fullName || !bio || !location) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/api/v1/profiles", {
        userId: user.id,  // Associar o perfil ao ID do usuário autenticado
        fullName,
        bio,
        location,
      });

      setProfile(res.data);  // Atualiza o perfil no contexto
      Alert.alert("Sucesso", "Perfil criado com sucesso!");

      // Navega para a tela de perfil ou à tela de competências
      navigation.navigate("Profile", { newProfile: res.data });
    } catch (err) {
      console.log("Erro ao criar perfil:", err);
      Alert.alert("Erro", "Não foi possível criar o perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Perfil</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
      />
      <TextInput
        style={styles.input}
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={createProfile}
        disabled={loading}
      >
        {loading ? (
          <Text style={styles.buttonText}>Criando...</Text>
        ) : (
          <Text style={styles.buttonText}>Criar Perfil</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#00bcd4",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
