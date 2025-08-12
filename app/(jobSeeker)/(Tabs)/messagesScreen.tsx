import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoAndNotif from '../../Components/LogoAndNotif';

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' or 'favorites'

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      {/* Tab Header */}
      <View className="flex-row justify-between py-2 px-2">
        <TouchableOpacity onPress={() => setActiveTab('messages')}>
          <Text
            style={{ fontFamily: 'Lexend-Bold' }}
            className={`text-2xl ${
              activeTab === 'messages' ? 'text-[#6C63FF]' : 'text-gray-400'
            }`}
          >
            Your Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('favorites')}>
          <Text
            style={{ fontFamily: 'Lexend-Bold' }}
            className={`text-2xl ${
              activeTab === 'favorites' ? 'text-[#6C63FF]' : 'text-gray-400'
            }`}
          >
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="px-4 mt-2">
        {activeTab === 'messages' ? (
          <Text style={{ fontFamily: 'Lexend-Regular' }}>
            No employer has contacted you yet.
          </Text>
        ) : (
          <Text style={{ fontFamily: 'Lexend-Regular' }}>
            You have no favorite conversations yet.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
