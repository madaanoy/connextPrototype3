import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoAndNotif from '../../Components/LogoAndNotif'

export default function prospectsScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white'>

      <LogoAndNotif></LogoAndNotif>

      <View className='py-2 px-2'>
        <Text style={{ fontFamily: 'Lexend-Bold' }} className='text-2xl color-[#37424F]'> Your Prospects </Text>
      </View>


    </SafeAreaView>
  )
}