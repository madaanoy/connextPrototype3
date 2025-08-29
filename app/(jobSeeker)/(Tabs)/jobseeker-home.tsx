import React from 'react';
import { Image, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import JobPostingCard from '../../components/jobseeker/JobPostingCard';
import LogoAndNotif from '../../components/LogoAndNotif';
import AddtoFavorites from '../../components/AddtoFavorites';
import Report from '../../components/Report';
import { LogOut } from 'lucide-react-native';
import LogoutModal from '../../components/LogoutModal';
import DeleteAccountModal from '../../components/DeleteAccountModal';

export default function JobSeekerHome() {
  return (
    <SafeAreaView className="flex-1 bg-white">

      <LogoAndNotif></LogoAndNotif>

      <View className='py-2 px-2'>
        <Text style={{fontFamily: 'Lexend-Bold'}} className='text-2xl color-[#37424F]'> Find Jobs </Text>
      </View>

      <JobPostingCard/>
      
    </SafeAreaView>
  );
}