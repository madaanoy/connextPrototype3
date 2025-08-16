import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import React from 'react';

import { Link } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';

import justLogo from '../../assets/images/justLogo.png';
import ProceedButton  from '../components/ProceedButton'

export default function RegistrationScreenJS() {
  return (
    <View className="flex-1 bg-white pt-10">

      <View className="items-center justify-center mt-10 py-5 px-10">
        {/* Header with logo and title */}
        <View className="flex-row items-center w-full pt-10 max-w-md">
          <Image source={justLogo} className="w-20 h-20" resizeMode="contain" />
          <View className="ml-1 flex-1">
            <Text style={style.titleText}>Create an account</Text>
            <Text style={style.subHeaderText} className="ml-1">
              Find your jobs with one swipe
            </Text>

          </View>

        </View>

        {/* Form fields */}
        <View className="w-full max-w-md py-3 mt-8">

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
              
            />
          </View>

          {/* Confirm Password */}
          <View className="mb-10">
            <View className="flex-row items-center mb-2">
              <Lock size={18} color="#616161" />
              <Text style={style.fieldHeader} className="ml-2">Confirm Password</Text>
            </View>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Confirm your password"
              
            />
          </View>

          {/* Proceed Button */}
          <Link
            href="/LoginScreen"
            className="bg-[#6C63FF] px-6 py-4 rounded-xl w-full"
          >
            <Text className="text-white font-bold text-center">Proceed</Text>
          </Link>

        </View>

      </View>

    </View>
  );
}

const style = StyleSheet.create({
  titleText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 24,
    marginBottom: 2,
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