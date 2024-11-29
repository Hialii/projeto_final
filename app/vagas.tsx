import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function VagasScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/'); // redireciona para a página de login
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.replace('/'); // redireciona para o login após logout
  };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bem-vindo, {user?.nome}! Aqui estão as vagas disponíveis:
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#DC143C',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
