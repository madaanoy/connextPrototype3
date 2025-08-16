import { Stack } from 'expo-router';

export default function EmployerLayout() {
  return (
    <Stack initialRouteName='(tabs)' screenOptions={{headerShown: false}}>
      <Stack.Screen name='(tabs)' options={{headerShown: false}}></Stack.Screen>
    </Stack>
  );
}
