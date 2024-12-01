import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://192.168.1.11:5000/api",
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Não autorizado. Faça login novamente.");
      AsyncStorage.removeItem("token");
    } else if (error.response?.status === 500) {
      console.error("Erro no servidor. Tente novamente mais tarde.");
    } else if (error.response?.status === 403) {
      console.error("Acesso negado.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
