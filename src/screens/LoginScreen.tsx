import React, { useState, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AuthContext from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext'; // Usando seu próprio ThemeContext

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useContext(AuthContext);
  const { isDarkTheme, toggleTheme } = useThemeContext(); // Acessando o contexto de tema

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Informe usuário e senha');
      return;
    }

    setLoading(true);
    try {
      await signIn(username, password);
      navigation.replace('Main'); // Redireciona para a tela principal após login
    } catch (err) {
      console.error(err);
      alert('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#fff' }]}>
      <Text style={[styles.title, { color: isDarkTheme ? '#fff' : '#222' }]}>SkillBridge</Text>

      <TextInput
        style={[styles.input, { color: isDarkTheme ? '#fff' : '#222', backgroundColor: isDarkTheme ? '#333' : '#f2f2f2' }]}
        placeholder="Usuário"
        placeholderTextColor={isDarkTheme ? '#aaa' : '#666'}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={[styles.input, { color: isDarkTheme ? '#fff' : '#222', backgroundColor: isDarkTheme ? '#333' : '#f2f2f2' }]}
        placeholder="Senha"
        placeholderTextColor={isDarkTheme ? '#aaa' : '#666'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDarkTheme ? '#007bff' : '#034b61' }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Text style={{ color: isDarkTheme ? '#fff' : '#222' }}>
          {isDarkTheme ? "🌙 tema claro" : "☀️ tema escuro"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  themeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});
