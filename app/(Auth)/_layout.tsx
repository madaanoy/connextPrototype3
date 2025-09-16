import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
   <Stack initialRouteName="loginScreen">
      <Stack.Screen name="loginScreen" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="registrationScreenJS" options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name="registrationScreenEmployer" options={{headerShown: false}}></Stack.Screen>
   </Stack>
  )
}