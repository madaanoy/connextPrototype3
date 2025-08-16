import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LogoAndNotif from '../../components/LogoAndNotif';
import { Link } from 'expo-router';
import { LogOutIcon, SendHorizonal, Settings, Star, Upload, UserRoundX } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      {/* Profile Section */}
      <View className="py-2 px-2">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-2xl color-[#37424F]">
          Your Profile
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#37424F]'>Name</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#747474]'>Juan Dela Cruz</Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#37424F]'>Industry</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#747474]'>Hospitality, Sales</Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#37424F]'>Location</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#747474]'>
            Lourdes Village, Pili, San Jose, Camarines Sur
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#37424F]'>Email</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#747474]'>
            juandelacruz@gbox.adnu.edu.ph
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#37424F]'>Currently working at</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-[#747474]'>Jollibee Inc.</Text>
        </View>
      </View>

      {/* Resume Section */}
      <View className="py-2 px-2">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-xl color-[#242573]">
          Résumé
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text
            style={{ fontFamily: 'Lexend-Regular' }}
            className="p-2 border rounded-lg flex-row items-center"
          >
            <Upload size={16}/> Upload your resume here
          </Text>
          <Text
            style={{ fontFamily: 'Lexend-Bold' }}
            className="p-3 bg-[#1572DB] text-white rounded-lg"
          >
            Create Resume
          </Text>
        </View>
      </View>

      {/* Miscellaneous Section */}
      <View className="py-2 px-2">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-xl color-[#242573]">
          Miscellaneous
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Settings</Text>
          <Settings size={20} color={'#747474'}/>
        </View>

        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Send us feedback</Text>
          <SendHorizonal size={20} color={'#1572DB'}/>
        </View>

        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Give us a rating</Text>
          <Star size={20} color={'#FFC312'}/>
        </View>
      </View>

      {/* Exit Section */}
      <View className="py-2 px-2">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-xl  color-[#242573]">
          Exit
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Bold' }} className='color-blue-600'><Link href={'/loginScreen'}>Logout</Link></Text>
          <LogOutIcon size={20} color={'#1572DB'}/>
        </View>
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Bold'}}  className='color-red-500'>Delete my account</Text>
          <UserRoundX size={20} color={'#B80E0E'}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
