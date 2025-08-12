import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoAndNotif from '../../Components/LogoAndNotif';
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
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Name</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Juan Dela Cruz</Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Industry</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Hospitality, Sales</Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Location</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }}>
            Lourdes Village, Pili, San Jose, Camarines Sur
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Email</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }}>
            juandelacruz@gbox.adnu.edu.ph
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Currently working at</Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Jollibee Inc.</Text>
        </View>
      </View>

      {/* Resume Section */}
      <View className="py-2 px-2">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-xl">
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
            className="p-2 bg-[#1572DB] text-white rounded-lg"
          >
            Create Resume
          </Text>
        </View>
      </View>

      {/* Miscellaneous Section */}
      <View className="py-2 px-2">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-xl">
          Miscellaneous
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Settings</Text>
          <Settings size={20} />
        </View>

        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Send us feedback</Text>
          <SendHorizonal size={20} />
        </View>

        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Give us a rating</Text>
          <Star size={20} />
        </View>
      </View>

      {/* Exit Section */}
      <View className="py-2 px-2">
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-xl">
          Exit
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Logout</Text>
          <LogOutIcon size={20} />
        </View>
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: 'Lexend-Regular' }}>Delete my account</Text>
          <UserRoundX size={20} />
        </View>
      </View>
    </SafeAreaView>
  );
}
