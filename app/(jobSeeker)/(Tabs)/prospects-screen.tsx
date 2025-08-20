import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import LogoAndNotif from '../../components/LogoAndNotif'
import ProspectsSearchBar from '../../components/ProspectsSearchBar'
import JobProspectsCard from '../../components/JobProspectsCard'

export default function ProspectsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      <View className="py-2 px-2">
        <View className="flex-row items-center">
          <Text
            style={{ fontFamily: 'Lexend-Bold' }}
            className="text-2xl text-[#37424F] mr-3"
          >
            Job Prospects
          </Text>

          {/* 🔑 Make search bar expand */}
          <View className="flex-1">
            <ProspectsSearchBar />
          </View>
        </View>

        <JobProspectsCard />
      </View>
    </SafeAreaView>
  )
}