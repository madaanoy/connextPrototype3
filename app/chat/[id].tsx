// app/chat/[id].tsx
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Info, Smile, AlertTriangle, Star } from 'lucide-react-native';

import LogoAndNotif from '../components/LogoAndNotif';
import Report from '../components/Report';
import AddtoFavorites from '../components/AddtoFavorites';
import companyLogo from '../../assets/images/placeholderImage.png';
import store from '../data/conversationStore';
import type { Message } from '../data/conversations';

export default function ChatScreen() {
  const { id, role } = useLocalSearchParams();
  const router = useRouter();

  const conversationId = String(id);
  const currentRole = role === 'employer' ? 'employer' : 'jobseeker';

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [addToFavoritesModalVisible, setAddToFavoritesModalVisible] = useState(false);

  // initialize store and subscribe
  useEffect(() => {
    let mounted = true;

    (async () => {
      await store.init();
      if (!mounted) return;
      const conv = store.getConversation(conversationId);
      setMessages(conv?.messages ?? []);
    })();

    const unsub = store.subscribe(() => {
      if (!mounted) return;
      const conv = store.getConversation(conversationId);
      setMessages(conv?.messages ?? []);
    });

    return () => {
      mounted = false;
      unsub();
    };
  }, [conversationId]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: currentRole,
      timestamp: Date.now(),
    };

    // optimistic UI
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    // persist & notify subscribers
    await store.addMessage(conversationId, newMsg);
  };

  const handleSendReport = (description: string) => {
    setReportModalVisible(false);
    // Add logic to send report
    console.log("Report sent:", description);
  };

  const handleAddToFavorites = () => {
    setAddToFavoritesModalVisible(false);
    // Add logic to add to favorites
    console.log("Added to favorites");
  };

  const renderItem: ListRenderItem<Message> = ({ item }) => (
    <View className={`flex-row items-end my-2 ${item.sender === currentRole ? 'justify-end' : 'justify-start'}`}>
      {item.sender !== currentRole && (
        <Image source={companyLogo} className="w-8 h-8 rounded-full mr-2" />
      )}

      <View className={`p-3 rounded-2xl max-w-[70%] ${item.sender === currentRole ? 'bg-[#6C63FF]' : 'bg-gray-200'}`}>
        <Text style={{ fontFamily: 'Lexend-Regular' }} className={item.sender === currentRole ? 'text-white' : 'text-black'}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  // Title (participant name) — safe lookup of conversation
  const conversation = store.getConversation(conversationId);
  const title = conversation
    ? (currentRole === 'employer' ? conversation.participants.jobseeker : conversation.participants.employer)
    : 'Conversation';

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <ChevronLeft size={24} color="#37424F" />
          </TouchableOpacity>

          <Image source={companyLogo} className="w-10 h-10 rounded-full mx-2" />

          <View className="px-2">
            <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-[16px] font-semibold">{title}</Text>
            <Text className="text-xs text-gray-500">Active now</Text>
          </View>
        </View>

        <Info size={22} color="black" />
      </View>

      {/* Messages */}
      <View className="flex-1 px-4 py-4">
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Input */}
      <View className="flex-row items-center px-4 py-2 border-t border-gray-200">
        <TouchableOpacity className="flex-col items-center mr-4" onPress={() => setReportModalVisible(true)}>
          <AlertTriangle size={22} color="red" />
          <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-xs text-red-500">Report</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-col items-center mr-4" onPress={() => setAddToFavoritesModalVisible(true)}>
          <Star size={22} color="#FACC15" />
          <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-xs text-yellow-500">Add to favorites</Text>
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center border border-gray-300 rounded-full px-3 py-2">
          <TextInput
            placeholder="Send a message"
            className="flex-1"
            style={{ fontFamily: 'Lexend-Regular' }}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity onPress={handleSend}>
            <Smile size={22} color="#6C63FF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modals */}
      <Report
        visible={reportModalVisible}
        onDismiss={() => setReportModalVisible(false)}
        onSendReport={handleSendReport}
      />
      <AddtoFavorites
        visible={addToFavoritesModalVisible}
        onDismiss={() => setAddToFavoritesModalVisible(false)}
        onAddToFavorites={handleAddToFavorites}
      />
    </SafeAreaView>
  );
}
