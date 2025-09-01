import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
   return (
      <Stack initialRouteName='index'>
         <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen name="OnboardingScreen2" options={{ headerShown: false }}></Stack.Screen>
         <Stack.Screen name="AccountType" options={{ headerShown: false }}></Stack.Screen>
         <Stack.Screen name="forgotpassword" options={{headerShown: false}}></Stack.Screen>
         <Stack.Screen name="termsandconditions" options={{headerShown: false}}></Stack.Screen>
      </Stack>
   )
}