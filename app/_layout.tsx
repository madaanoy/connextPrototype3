import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

import "../global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Bold': require('../assets/fonts/Lexend-Bold.ttf'),
    'Lexend-SemiBold': require('../assets/fonts/Lexend-SemiBold.ttf'), // removed space

    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'), // removed space
  });

  if (!fontsLoaded) {
    return null; // You could replace this with a <Loading /> component
  }

  return (
    <Stack initialRouteName="(jobseeker)">
      <Stack.Screen name="(common)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(jobseeker)" options={{headerShown: false}} />
      <Stack.Screen name="(employer)" options={{headerShown: false}} />
      <Stack.Screen name='chat' options={{headerShown: false}}></Stack.Screen>
    </Stack>
  );
}
