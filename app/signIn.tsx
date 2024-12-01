import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/contexts/AuthContext';

export default function SignIn() {
  const { createUser } = useAuth(); 
  const router = useRouter();

  // Estado para controle de loading
  const [isLoading, setIsLoading] = useState(false);

  // Validação do formulário com Yup
  const cadastroValidationSchema = yup.object().shape({
    nome: yup.string().min(3, '⚠️ O nome deve ter pelo menos 3 caracteres.').required('⚠️ Campo nome não pode ser vazio.'),
    email: yup.string().email('⚠️ Insira um e-mail válido.').required('⚠️ Campo e-mail não pode ser vazio.'),
    senha: yup.string().min(6, '⚠️ A senha deve ter no mínimo 6 caracteres.').required('⚠️ Campo senha não pode ser vazio.'),
  });

  // Função chamada ao submeter o formulário
  const cadastrar = async (nome: string, email: string, senha: string) => {
    setIsLoading(true); // Ativa o loading
    const success = await createUser(nome, email, senha); // Chama a função createUser do AuthContext
    setIsLoading(false); // Desativa o loading

    if (success) {
      router.push('/login'); // Navega para a página de login após cadastro bem-sucedido
    } else {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}> 📈 Cadastre-se para começar!</Text>
      <Formik
        initialValues={{ nome: '', email: '', senha: '' }}
        validateOnMount={true}
        onSubmit={values => cadastrar(values.nome, values.email, values.senha)} // Chama cadastrar ao enviar o formulário
        validationSchema={cadastroValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.formContainer}>
            {errors.nome && touched.nome && <Text style={styles.textErrors}>{errors.nome}</Text>}
            <TextInput
              onChangeText={handleChange('nome')}
              onBlur={handleBlur('nome')}
              value={values.nome}
              placeholder="Nome"
              style={styles.input}
            />

            {errors.email && touched.email && <Text style={styles.textErrors}>{errors.email}</Text>}
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="E-mail"
              style={styles.input}
            />

            {errors.senha && touched.senha && <Text style={styles.textErrors}>{errors.senha}</Text>}
            <TextInput
              onChangeText={handleChange('senha')}
              onBlur={handleBlur('senha')}
              value={values.senha}
              placeholder="Senha"
              secureTextEntry
              style={styles.input}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: isValid && !isLoading ? '#4CAF50' : '#B9B9B9' }]}
              onPress={() => handleSubmit()}
              disabled={!isValid || isLoading} // Desabilita o botão enquanto o formulário não for válido ou estiver carregando
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" /> // Mostra o ícone de carregamento
              ) : (
                <Text style={styles.buttonText}>Cadastrar ➡️</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  titulo: {
    color: '#324e7b',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#324e7b',
    borderRadius: 16,
    marginTop: 30,
  },
  input: {
    fontSize: 18,
    color: '#324e7b',
    padding: 10,
    borderWidth: 1,
    borderColor: '#86a6df',
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  button: {
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  textErrors: {
    fontSize: 14,
    color: '#ff0000',
    marginBottom: 8,
  },
});
