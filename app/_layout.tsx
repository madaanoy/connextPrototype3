import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import '../global.css';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Bold': require('../assets/fonts/Lexend-Bold.ttf'),
    'Lexend- SemiBold': require('../assets/fonts/Lexend-SemiBold.ttf'),

    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins- SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Or add a <Loading /> component here
  }

  return (
    <Stack initialRouteName="(jobSeeker)" screenOptions={{ headerShown: false }}>

      <Stack.Screen name='(Employer)' options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='(jobSeeker)' options={{ headerShown: false }}></Stack.Screen>

    </Stack>
  );
}