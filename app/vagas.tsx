import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { listarVagas } from '../src/api/services/vagasServices';
import { Vaga } from '@/src/types/Vaga';

export default function VagasScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      router.replace('/'); // redireciona para a página de login
    }
  }, [user]);
  
  useEffect(() => {
    const loadVagas = async () => {
      try {
        const response = await listarVagas(); // Chama o serviço para buscar as vagas
        setVagas(response);
      } catch (error) {
        console.error('Erro ao buscar as vagas', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      loadVagas(); // Carrega as vagas apenas se o usuário estiver autenticado
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
        Bem-vindo, {user?.name}! Aqui estão as vagas disponíveis:
      </Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView
          style={{ width: '100%', padding: 16 }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          {vagas.length > 0 ? (
            vagas.map((vaga, index) => (
              <View key={index} style={styles.vagaCard}>
                <Text style={styles.vagaTitle}>{vaga.title}</Text>
                <Text style={styles.vagaDescription}>{vaga.description}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noVagas}>Nenhuma vaga disponível no momento.</Text>
          )}
        </ScrollView>
      )}

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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  vagaCard: {
    backgroundColor: '#444',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  vagaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  vagaDescription: {
    color: '#ccc',
    marginTop: 8,
  },
  noVagas: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
  },
});
