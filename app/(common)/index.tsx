import { StyleSheet, View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import appLogo from "../../assets/images/app_logo.png"
import ProceedButton from '../components/ProceedButton'

export default function OnboardingScreen1() {
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

        <Text style={{fontFamily: 'Lexend-Regular'}} className="text-base text-center text-black-100 my-5 mx-5">
          We offer a centralized mobile platform that makes it more accessible for individuals
          that struggle with taking the first step into the professional world.
        </Text>

        <ProceedButton
        label="Let's get started!"
        href="/OnboardingScreen2"/>

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