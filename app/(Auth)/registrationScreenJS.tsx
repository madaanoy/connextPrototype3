import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';

import { Link } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';

import justLogo from '../../assets/images/justLogo.png';

export default function RegistrationScreenJS() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center justify-center py-8 px-6">
        
        {/* Header with logo and title */}
        <View className="flex-row items-center w-full max-w-md pt-8 mb-6">
          <Image source={justLogo} className="w-20 h-20" resizeMode="contain" />
          <View className="ml-4 flex-1">
            <Text style={style.titleText}>Create an account</Text>
            <Text style={style.subHeaderText}>
              Find your jobs with one swipe
            </Text>
          </View>
        </View>

        {/* Form fields */}
        <View className="w-full max-w-md">

          {/* Email */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Mail size={18} color="#616161" />
              <Text style={style.fieldHeader} className="ml-2">Email</Text>
            </View>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="johndoe@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* First Name */}
          <View className="mb-4">
            <Text style={style.fieldHeader} className="mb-2">First Name</Text>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="John"
            />
          </View>

          {/* Middle Initial */}
          <View className="mb-4">
            <Text style={style.fieldHeader} className="mb-2">Middle Initial (If applicable)</Text>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="i.e M."
              maxLength={2}
            />
          </View>

          {/* Last Name */}
          <View className="mb-4">
            <Text style={style.fieldHeader} className="mb-2">Last Name</Text>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Doe"
            />
          </View>

          {/* Password */}
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <Lock size={18} color="#616161" />
              <Text style={style.fieldHeader} className="ml-2">Password</Text>
            </View>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Create a password"
              secureTextEntry
            />
          </View>

          {/* Confirm Password */}
          <View className="mb-8">
            <View className="flex-row items-center mb-2">
              <Lock size={18} color="#616161" />
              <Text style={style.fieldHeader} className="ml-2">Confirm Password</Text>
            </View>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Confirm your password"
              secureTextEntry
            />
          </View>

          {/* Proceed Button */}
          <View className="mt-2">
            <Link
              href="/LoginScreen"
              className="bg-[#6C63FF] px-6 py-4 rounded-xl w-full"
            >
              <Text className="text-white font-bold text-center">Proceed</Text>
            </Link>
          </View>

        </View>

      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  titleText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 24,
    marginBottom: 2,
    color: '#000000',
  },
  subHeaderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A1A1A1',
  },
  fieldHeader: {
    fontFamily: 'Lexend-Bold',
    color: '#37424F',
    fontSize: 14,
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
  },
});