import { StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import { Bell } from 'lucide-react-native'
import justLogo from '../../assets/images/justLogo.png'

export default function LogoAndNotif() {
  return (
   <View className='flex-row py-2 px-2 justify-between items-center'>
      <Image source={justLogo} style={style.logo}></Image>
      <Bell size={20}></Bell>
   </View>
  )
}

const style = StyleSheet.create({
   logo: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
   }
})