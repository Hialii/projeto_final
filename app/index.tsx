import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Veja as vagas disponíveis</Text>
      <Link style={styles.link} href='./signIn'>Cadastrar</Link>
      <Link  style={styles.link} href='./login'>Entrar</Link> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#324e7b',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    paddingHorizontal: 32,
    textAlign: 'left',
  },
  link: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    margin: 6,
    backgroundColor: '#324e7b',
    color: '#fff',
  }
});
