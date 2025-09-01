import { View, Text, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Image} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { TextInput } from 'react-native-paper';


export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    Alert.alert('Success', 'A password reset link has been sent to your email.');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center mx-4 mt-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#37424F" />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'Lexend-Bold' }} className="text-2xl text-[#37424F] ml-2">
          Forgot Password?
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-grow justify-center px-6"
      >
        <Text className="text-center text-gray-600 mb-6">
          Enter your email and we'll send you a link to reset your password.
        </Text>

        <View className="w-full mb-6">
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-[#6C63FF] px-6 py-4 rounded-xl w-full items-center"
        >
          <Text className="text-white font-bold text-center">Send Reset Link</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
