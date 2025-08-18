import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import LogoAndNotif from '../../components/LogoAndNotif';
import SearchBar from '../../components/SearchBar';
import userIcon from '../../../assets/images/placeholderImage.png';

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' or 'favorites'

  const handleOpenChat = (conversationId: number) => {
    router.push(`/chat/${conversationId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      {/* Tab Header */}
      <View className="flex-row justify-between py-2 px-2">
        <TouchableOpacity onPress={() => setActiveTab('messages')}>
          <Text
            style={{ fontFamily: 'Lexend-Bold' }}
            className={`text-2xl ${activeTab === 'messages' ? 'text-[#6C63FF]' : 'text-gray-400'}`}
          >
            Your Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('favorites')}>
          <Text
            style={{ fontFamily: 'Lexend-Bold' }}
            className={`text-2xl ${activeTab === 'favorites' ? 'text-[#6C63FF]' : 'text-gray-400'}`}
          >
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      <SearchBar />

      {/* Content */}
      <View className="px-4 py-2 mt-2">

        {activeTab === 'messages' ? (
          <TouchableOpacity
            onPress={() => handleOpenChat(1)} // example chat ID
            className="flex-row items-center p-3 border-b border-gray-200"
          >
            <Image source={userIcon} className="w-12 h-12 rounded-full mr-3" />

            <View>
              
              <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-lg">
                Jollibee
              </Text>

              <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-gray-600">
                Hi, I'm interested in your application
              </Text>

            </View>
            
          </TouchableOpacity>

        ) : (
          <Text style={{ fontFamily: 'Lexend-Regular' }}>
            You have no favorite conversations yet.
          </Text>
        )}

      </View>
    </SafeAreaView>
  );
}
