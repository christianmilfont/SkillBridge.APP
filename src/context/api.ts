// src/context/api.ts

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Crie o cliente Axios com a URL base da sua API
const api = axios.create({
  baseURL: 'http://10.0.2.2:5042', // Altere para o IP ou URL do seu backend
  timeout: 10000,
});

// Intercepta todas as requisições para adicionar o token de autenticação
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
