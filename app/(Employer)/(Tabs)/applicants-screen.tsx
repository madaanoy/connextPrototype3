import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoAndNotif from '../../components/LogoAndNotif'

export default function applicantsScreen() {
  return (
    <SafeAreaView className='flex-1 bg-white'>

            <LogoAndNotif/>
      
            <View className='py-2 px-2'>
              <Text style={{ fontFamily: 'Lexend-Bold' }} className='text-2xl color-[#37424F]'> Your Applicants </Text>
            </View>

    </SafeAreaView>
  )
}