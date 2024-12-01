import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { UserProps } from '../types/User';
import axiosInstance from '../api/axiosInstance';

interface AuthContextProps {
  user: UserProps | null;
  token: string | null;
  createUser: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<UserProps>) => Promise<boolean>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Use a instância personalizada de axios
  const api = axiosInstance;

  // Função para registrar um novo usuário
  const createUser = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      if (response.status === 201) {
        setUser(response.data.user);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        return true;
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
    return false;
  };

  // Função para fazer login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.status === 200) {
        const { token, user } = response.data;
        setUser(user);
        setToken(token);
        await AsyncStorage.setItem('token', token);  // Usando AsyncStorage no lugar de localStorage
        await AsyncStorage.setItem('user', JSON.stringify(user));
        return true;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
    return false;
  };

  // Função para logout
  const logout = async (): Promise<void> => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Função para editar o usuário
  const updateUser = async (userData: Partial<UserProps>): Promise<boolean> => {
    try {
      const response = await api.put('/auth/user', userData);
      if (response.status === 200) {
        setUser(response.data.user);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        return true;
      }
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
    return false;
  };

  // Recuperar dados do AsyncStorage ao carregar o app
  useEffect(() => {
    const loadUserFromStorage = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    };
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, createUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
