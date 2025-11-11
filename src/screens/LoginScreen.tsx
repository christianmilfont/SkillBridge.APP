import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AuthContext from "../context/AuthContext";
import AnimatedThemeButton from "../utils/AnimatedThemeButton";
import { useThemeContext } from "../context/ThemeContext";
import { useTheme } from "react-native-paper";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Informe usuário e senha");
      return;
    }

    setLoading(true);
    try {
      await signIn(username, password);
      navigation.replace("Main");
    } catch (err) {
      console.error(err);
      alert("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>SkillBridge</Text>

      <TextInput
        style={[styles.input, { color: theme.colors.onSurface }]}
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[styles.input, { color: theme.colors.onSurface }]}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* Botão animado de tema */}
      <View style={styles.themeButtonContainer}>
        <AnimatedThemeButton isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  themeButtonContainer: {
    position: "absolute",
    top: 50,
    right: 20,
  },
});
