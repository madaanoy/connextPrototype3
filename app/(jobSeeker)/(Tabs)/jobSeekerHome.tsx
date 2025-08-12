import React from 'react';
import { Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import JobPostingCard from '../../Components/JobPostingCard'
import LogoAndNotif from '../../Components/LogoAndNotif';

export default function JobSeekerHome() {
  return (
    <SafeAreaView className="flex-1 bg-white">

      <LogoAndNotif></LogoAndNotif>

      <View className='py-2 px-2'>
        <Text style={{fontFamily: 'Lexend-Bold'}} className='text-2xl'> Find Jobs </Text>
      </View>

      <JobPostingCard/>
      
    </SafeAreaView>
  );
}