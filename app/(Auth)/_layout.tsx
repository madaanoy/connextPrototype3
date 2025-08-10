import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
   <Stack initialRouteName='loginScreen' screenOptions={{headerShown: false}}></Stack>
  )
}