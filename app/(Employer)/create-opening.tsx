import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeft } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'

export default function CreateOpening() {
  const router = useRouter();
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='px-2 py-2'>

        {/* Header */}
        <View className='flex-row items-center'>
          <ChevronLeft size={24} onPress={() => router.push('/employer-home')}></ChevronLeft>
          <Text style={{ fontFamily: 'Lexend-Bold' }} className='color-[#37424F] text-2xl'> Create Opening </Text>
        </View>

        {/* Main Content */}

        {/* Title and Type Header */}
        <View className='flex-row justify-between px-2 py-2'>
          <Text style={{ fontFamily: 'Lexend-Medium' }} className='color-[#0B3D75]'> Job Title </Text>
          <Text style={{ fontFamily: 'Lexend-Medium' }} className='color-[#0B3D75]'> Job Type </Text>
        </View>

        <View className='flex-row items-center justify-between px-2'>
          <View className='flex-1 mx-2 rounded-lg'>
            <TextInput className="border border-gray-300 rounded-md p-" />
          </View>

          <View className='flex-row gap-2'>
            <Text style={{ fontFamily: 'Lexend-Regular' }} className='p-2 border-transparent bg-[#6C63FF] color-white rounded-lg'> Full-time </Text>
            <Text style={{ fontFamily: 'Lexend-Regular' }} className='p-2 border-gray-600 rounded-lg'> Part-time </Text>
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}