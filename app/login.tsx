import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';

import { useRouter } from 'expo-router';// Ou use 'react-router-dom' ou o hook específico da sua navegação
import { useAuth } from "@/src/contexts/AuthContext";

export default function Login() {
  const { login } = useAuth(); 
  const router = useRouter(); 

  // Validação do formulário com Yup
  const loginValidationSchema = yup.object().shape({
    email: yup.string().email('⚠️ Insira um e-mail válido.').required('⚠️ Campo e-mail não pode ser vazio.'),
    senha: yup.string().min(6, '⚠️ A senha deve ter no mínimo 6 caracteres.').required('⚠️ Campo senha não pode ser vazio.')
  });

  // Função chamada ao submeter o formulário
  const logar = async (email: string, senha: string) => {
    const success = await login(email, senha); // Chama a função login do AuthContext
    if (success) {
      router.push('/vagas'); // Navega para a página de vagas, caso o login seja bem-sucedido
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}> 😃 Entre e enontre sua vaga!</Text>
      <Formik
        initialValues={{ email: '', senha: '' }}
        validateOnMount={true}
        onSubmit={values => logar(values.email, values.senha)} // Chama logar ao enviar o formulário
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.menu}>
            {errors.email && touched.email &&
              <Text style={styles.textErrors}>{errors.email}</Text>
            }
            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="E-mail"
                style={styles.campo}
              />
            </View>

            {errors.senha && touched.senha &&
              <Text style={styles.textErrors}>{errors.senha}</Text>
            }
            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                value={values.senha}
                placeholder="Senha"
                style={styles.campo}
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, {
                backgroundColor: isValid ? '#f8f8f8' : '#b9b9b9',
                borderColor: isValid ? '#86a6df' : '#a9a9a9'
              }]} 
              onPress={() => handleSubmit()}
              disabled={!isValid} // Desabilita o botão até que o formulário seja válido
            >
              <Text style={styles.buttonText}>Entrar ➡️</Text>
            </TouchableOpacity>
            <Text style={styles.rocket}>🚀</Text>
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
    paddingTop: 164,
  },
  titulo: {
    color: '#324e7b',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    paddingHorizontal: 32,
    textAlign: 'left',
  },
  menu: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#324e7b',
    padding: 32
  },
  button: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
  },
  buttonText: {
    color: '#5068a9',
    fontSize: 18
  },
  inputGroup: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderWidth: 2,
    borderRadius: 16,
    borderColor: '#86a6df',
  },
  campo: {
    fontSize: 18,
    color: '#324e7b',
  },
  rocket: {
    textAlign: 'center',
    width: '100%',
    fontSize: 64,
    padding: 32
  },
  textErrors: {
    fontSize: 14,
    color: '#fff',
    padding: 4,
    borderBottomWidth: 2,
    borderBottomColor: '#AA1122',
    marginBottom: 4
  }
});
