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
    <Stack initialRouteName="industryCategory">

      <Stack.Screen name="onboardingScreen1" options={{ title: 'Introduction', headerShown: false }} />
      <Stack.Screen name="onboardingScreen2" options={{ title: 'Welcome', headerShown: false }} />
      <Stack.Screen name="accountType" options={{ title: 'Who are you?', headerShown: false }} />

      <Stack.Screen name="registrationScreenJS" options={{ title: 'Job Seeker Registration' }} />
      <Stack.Screen name="registrationScreenEmployer" options={{ title: 'Employer Registration',}} />

      <Stack.Screen name="loginScreen" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="forgotPassword"></Stack.Screen>

      <Stack.Screen name="jobSeeker/jobSeekerHome"></Stack.Screen>
      <Stack.Screen name="Employer/employerHome"></Stack.Screen>
      <Stack.Screen name="Employer/confirmRegistration" options={{ title: 'Confirm Registration' }}></Stack.Screen>
      <Stack.Screen name="termsAndConditions"></Stack.Screen>
      <Stack.Screen name="industryCategory" options={{title: 'Choose your industry'}}></Stack.Screen>

    </Stack>
  );
}
