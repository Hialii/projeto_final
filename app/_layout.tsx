import { UserProvider } from '@/src/context/UserContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='vagas' options={{ title: 'Vagas' }} />
      </Stack>
    </UserProvider>
  );
}
