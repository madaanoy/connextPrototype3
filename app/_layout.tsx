import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { JobProspectsProvider } from './context/JobProspectsContext';
import { Provider as PaperProvider } from 'react-native-paper';

import "../global.css";
import { JobProvider } from './context/JobOpeningContext';
import { UserProvider } from './context/UserContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Medium': require('../assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Bold': require('../assets/fonts/Lexend-Bold.ttf'),
    'Lexend-SemiBold': require('../assets/fonts/Lexend-SemiBold.ttf'), 

    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <UserProvider>
        <JobProvider>
          <JobProspectsProvider>
            <Stack initialRouteName="(common)">
              <Stack.Screen name="(common)" options={{ headerShown: false }} />
              <Stack.Screen name="(Auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(jobSeeker)" options={{ headerShown: false }} />
              <Stack.Screen name="(Employer)" options={{ headerShown: false }} />
              <Stack.Screen name='chat' options={{ headerShown: false }}></Stack.Screen>
            </Stack>
          </JobProspectsProvider>
        </JobProvider>
      </UserProvider>
    </PaperProvider>
  );
}
