import { Stack } from 'expo-router';

export default function EmployerLayout() {
  return (
    <Stack initialRouteName='(Tabs)' screenOptions={{headerShown: false}}>
      <Stack.Screen name='(Tabs)' options={{headerShown: false}}></Stack.Screen>
    </Stack>
  );
}
