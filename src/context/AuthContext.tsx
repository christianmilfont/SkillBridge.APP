// src/context/AuthContext.tsx

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from './api';

// Defina os tipos de dados do usuário
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  profileId?: string;  // Adicionando o profileId como opcional

}

interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync('userData');
        const storedToken = await SecureStore.getItemAsync('userToken');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser)); // Carrega o usuário armazenado
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Função de login
  const signIn = async (username: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { username, password });
      const { token, user } = response.data;

      if (token && user) {
        // Armazenando token e dados do usuário no SecureStore
        await SecureStore.setItemAsync('userToken', token);
        await SecureStore.setItemAsync('userData', JSON.stringify(user));

        // Atualizando o estado do usuário
        setUser(user);
      } else {
        throw new Error('Token ou dados do usuário inválidos.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw new Error('Usuário ou senha inválidos.');
    }
  };

  // Função de logout
  const signOut = async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
