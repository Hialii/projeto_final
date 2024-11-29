import { AuthProvider } from '@/src/contexts/AuthContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='index'  options={{ headerShown: false }} />
        <Stack.Screen name='vagas'  options={{ headerShown: false }} />
        <Stack.Screen name='login'  options={{ headerShown: false }} />
        <Stack.Screen name='signIn'  options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
