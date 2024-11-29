import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserProps } from '../types/User';

interface AuthContextProps {
  user: UserProps | null;
  createUser: (userData: UserProps) => Promise<boolean>
  login: (email: string, senha: string) => Promise<boolean>
  logout: () => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);

  const createUser = async (userData: UserProps): Promise<boolean> => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      console.log("Usuário já existe!");
      return false; // Retorna 'false' se o usuário já existe
    }
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    return true; // Retorna 'true' após o cadastro bem-sucedido
  };
  


  const login = async (email: string, senha: string) => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const userData: UserProps = JSON.parse(storedUser);
      if (userData.email === email && userData.senha === senha) {
        setUser(userData);
        return true; // Login bem-sucedido
      }
    }
    return false; // Credenciais inválidas
  };


  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  // recupera o usuário quando recarrega o app
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, createUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
