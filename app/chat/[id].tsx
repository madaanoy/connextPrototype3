import {
  Image, View, Text,
  TextInput, FlatList, TouchableOpacity,
  Pressable
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

import companyLogo from '../../assets/images/placeholderImage.png'
import LogoAndNotif from '../components/LogoAndNotif';
import { ChevronLeft, Info, Smile, AlertTriangle, Star } from 'lucide-react-native';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Header */}
      <LogoAndNotif />

      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
        {/* Left section: back button + logo + company info */}
        <View className="flex-row items-center">

          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <ChevronLeft size={24} color="#37424F" />
          </TouchableOpacity>

          <Image
            source={companyLogo}
            className="w-10 h-10 rounded-full mx-2"
          />
          <View className='px-2'>
            <Text style={{ fontFamily: 'Lexend-Medium' }} className="text-[16px] font-semibold">Jollibee</Text>
            <Text className="text-xs text-gray-500">Active 2 hours ago</Text>
          </View>
        </View>

        {/* Right section: info icon */}
        <Info size={22} color="black" />
      </View>

      {/* Message list */}
      <View className="flex-1 px-4 py-4">
        <FlatList
          data={[
            { id: '1', text: "Hi, I'm interested in your application", sender: 'them' },
            { id: '2', text: 'Sure, let’s discuss!', sender: 'me' },
            { id: '3', text: "Great, can you tell me about yourself?", sender: 'them' },
          ]}
          renderItem={({ item }) => (
            <View
              className={`flex-row items-end my-2 ${item.sender === 'me' ? 'justify-end' : 'justify-start'
                }`}
            >
              {/* Sender profile picture for "them" */}
              {item.sender === 'them' && (
                <Image
                  source={companyLogo}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              {/* Message bubble */}
              <View
                className={`p-3 rounded-2xl max-w-[70%] ${item.sender === 'me'
                  ? 'bg-[#6C63FF]'
                  : 'bg-gray-200'
                  }`}
              >
                <Text
                  style={{ fontFamily: 'Lexend-Regular' }}
                  className={item.sender === 'me' ? 'text-white' : 'text-black'}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Reply input bar */}
      <View className="flex-row items-center px-4 py-2">

        {/* Report */}
        <TouchableOpacity className="flex-col items-center mr-4">
          <AlertTriangle size={22} color="red" />
          <Text style={{fontFamily: 'Lexend-Regular'}} className="text-xs text-red-500">Report</Text>
        </TouchableOpacity>

        {/* Favorites */}
        <TouchableOpacity className="flex-col items-center mr-4">
          <Star size={22} color="#FACC15" />
          <Text style={{fontFamily: 'Lexend-Regular'}} className="text-xs text-yellow-500">Add to favorites</Text>
        </TouchableOpacity>

        {/* Message input with emoji */}
        <View className="flex-1 flex-row items-center border border-gray-300 rounded-full px-3 py-2">
          <TextInput
            placeholder="Send a message"
            className="flex-1"
            style={{ fontFamily: 'Lexend-Regular' }}
          />
          <TouchableOpacity>
            <Smile size={22} color="#6C63FF" />
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}