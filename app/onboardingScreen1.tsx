import { StyleSheet, View, Text, Image } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import appLogo from "../assets/images/app_logo.png"

export default function onboardingScreen1() {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 items-center justify-center px-6 pb-10'>
        <Text style={styles.titleText}>
          Welcome to
        </Text>

        <Image
          source={appLogo}
          className='my-5 w-[330px] h-[95px]'
          resizeMode='contain'>
        </Image>

        <Text className="text-base text-center text-black-100 mr-5 ml-5 mb-20">
          We offer a centralized mobile platform that makes it more accessible for individuals
          that struggle with taking the first step into the professional world.
        </Text>

        <Link
          href="/onboardingScreen2"
          className="bg-[#6C63FF] px-6 py-4 rounded-xl"
        >
          <Text className="text-white font-bold text-center">
            Let's get started!
          </Text>
        </Link>

      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Lexend-Medium',
    fontSize: 32,
    textAlign: 'center'
  }
})