import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useRouter } from "expo-router"; // Navegação no Expo
import { useAuth } from "@/src/contexts/AuthContext"; // Contexto de Autenticação

export default function Login() {
  const { login } = useAuth(); // Função login do contexto
  const router = useRouter(); // Para navegação

  // Estado para controle de loading
  const [isLoading, setIsLoading] = useState(false);

  // Validação do formulário com Yup
  const loginValidationSchema = yup.object().shape({
    email: yup.string().email("⚠️ Insira um e-mail válido.").required("⚠️ Campo e-mail não pode ser vazio."),
    password: yup.string().min(6, "⚠️ A senha deve ter no mínimo 6 caracteres.").required("⚠️ Campo senha não pode ser vazio."),
  });

  // Função chamada ao submeter o formulário
  const logar = async (email: string, password: string) => {
    setIsLoading(true); // Ativa o loading
    const success = await login(email, password); // Chama a função login
    setIsLoading(false); // Desativa o loading

    if (success) {
      router.push("/vagas"); // Redireciona para a tela de vagas
    } else {
      Alert.alert("Erro", "Credenciais inválidas, tente novamente.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}> 😃 Entre e encontre sua vaga!</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validateOnMount={true}
        onSubmit={(values) => logar(values.email, values.password)} // Passa os valores para a função logar
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
          <View style={styles.menu}>
            {/* Campo de e-mail */}
            {errors.email && touched.email && <Text style={styles.textErrors}>{errors.email}</Text>}
            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="E-mail"
                style={styles.campo}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Campo de senha */}
            {errors.password && touched.password && <Text style={styles.textErrors}>{errors.password}</Text>}
            <View style={styles.inputGroup}>
              <TextInput
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Senha"
                style={styles.campo}
                secureTextEntry
              />
            </View>

            {/* Botão de Login */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isValid && !isLoading ? "#f8f8f8" : "#b9b9b9",
                  borderColor: isValid && !isLoading ? "#86a6df" : "#a9a9a9",
                },
              ]}
              onPress={() => handleSubmit()}
              disabled={!isValid || isLoading} // Desabilita o botão se estiver carregando ou se o formulário não for válido
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#5068a9" /> // Mostra o loading
              ) : (
                <Text style={styles.buttonText}>Entrar ➡️</Text>
              )}
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
    justifyContent: "flex-start",
    backgroundColor: "#f8f8f8",
    paddingTop: 164,
  },
  titulo: {
    color: "#324e7b",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    paddingHorizontal: 32,
    textAlign: "left",
  },
  menu: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: "#324e7b",
    padding: 32,
  },
  button: {
    alignItems: "center",
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
  },
  buttonText: {
    color: "#5068a9",
    fontSize: 18,
  },
  inputGroup: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 16,
    padding: 8,
    backgroundColor: "#f8f8f8",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#86a6df",
  },
  campo: {
    fontSize: 18,
    color: "#324e7b",
    flex: 1,
  },
  rocket: {
    textAlign: "center",
    width: "100%",
    fontSize: 64,
    padding: 32,
  },
  textErrors: {
    fontSize: 14,
    color: "#fff",
    padding: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#AA1122",
    marginBottom: 4,
  },
});
