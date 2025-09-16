import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
   return (
      <Stack initialRouteName='index'>
         <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen name="onboardingScreen2" options={{ headerShown: false }}></Stack.Screen>
         <Stack.Screen name="accountType" options={{ headerShown: false }}></Stack.Screen>
         <Stack.Screen name="forgotPassword" options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen name="termsAndConditions" options={{headerShown: false}}></Stack.Screen>
      </Stack>
   )
}