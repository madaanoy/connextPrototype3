import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoAndNotif from '../../Components/LogoAndNotif'

export default function messagesScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white'>

      <LogoAndNotif></LogoAndNotif>

      <View className='flex-row justify-between py-2 px-2'>
        <Text style={{ fontFamily: 'Lexend-Bold' }} className='text-2xl'> Your Messages </Text>
        <Text style={{ fontFamily: 'Lexend-Bold' }} className='text-2xl color-gray-400'> Favorites </Text>
      </View>

    </SafeAreaView>
  )
}