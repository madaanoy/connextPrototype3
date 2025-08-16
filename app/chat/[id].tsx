import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import LogoAndNotif from '../components/LogoAndNotif';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white p-4">

      {/* <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-xl mb-4">
        Chat with Conversation {id}
      </Text> */}

      <LogoAndNotif></LogoAndNotif>

      {/* Example message list */}
      <FlatList
        data={[
          { id: '1', text: "Hi, I'm interested in your application", sender: 'them' },
          { id: '2', text: 'Sure, let’s discuss!', sender: 'me' },
        ]}
        renderItem={({ item }) => (
          <View
            className={`p-3 my-1 rounded-lg ${
              item.sender === 'me' ? 'bg-[#6C63FF] self-end' : 'bg-gray-200 self-start'
            }`}
          >
            <Text
              style={{ fontFamily: 'Lexend-Regular' }}
              className={item.sender === 'me' ? 'text-white' : 'text-black'}
            >
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Reply input */}
      <View className="mt-auto flex-row items-center">
        <TextInput
          placeholder="Send a message"
          className="flex-1 border border-gray-300 rounded-lg p-3 mr-2"
        />
        <Button title="Send" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}
