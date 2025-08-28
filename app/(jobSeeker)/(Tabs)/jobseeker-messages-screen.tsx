// app/jobseeker-messages-screen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import LogoAndNotif from '../../components/LogoAndNotif';
import SearchBar from '../../components/SearchBar';
import companyLogo from '../../../assets/images/placeholderImage.png'
import store from '../../data/conversationStore';
import type { Conversation } from '../../data/conversations';

export default function JobSeekerMessagesScreen() {
  const [activeTab, setActiveTab] = useState('messages'); // 'messages' | 'favorites'
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      await store.init();
      if (!mounted) return;
      setConversations(store.getConversations());
    })();

    const unsub = store.subscribe(() => {
      if (!mounted) return;
      setConversations(store.getConversations());
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, []);

  const handleOpenChat = (conversationId: string) => {
    router.push(`/chat/${conversationId}?role=jobseeker`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      {/* Tab Header */}
      <View className="flex-row justify-between py-2 px-2">
        <TouchableOpacity onPress={() => setActiveTab('messages')}>
          <Text style={{ fontFamily: 'Lexend-Bold' }} className={`text-2xl ${activeTab === 'messages' ? 'text-[#6C63FF]' : 'text-gray-400'}`}>
            Your Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('favorites')}>
          <Text style={{ fontFamily: 'Lexend-Bold' }} className={`text-2xl ${activeTab === 'favorites' ? 'text-[#6C63FF]' : 'text-gray-400'}`}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      <SearchBar />

      {/* Content */}
      <View className="px-4 py-2 mt-2">
        {activeTab === 'messages' ? (
          conversations.map((c) => (
            <TouchableOpacity
              key={c.id}
              onPress={() => handleOpenChat(c.id)}
              className="flex-row items-center p-3 border-b border-gray-200"
            >
              <Image source={companyLogo} className="w-12 h-12 rounded-full mr-3" />

              <View>
                <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-lg">{c.participants.employer}</Text>
                <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-gray-600">
                  {c.messages[c.messages.length - 1]?.text ?? 'No messages yet'}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ fontFamily: 'Lexend-Regular' }}>
            You have no favorite conversations yet.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
