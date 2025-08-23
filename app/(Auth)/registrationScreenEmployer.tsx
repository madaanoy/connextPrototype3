import {
  SafeAreaView, StyleSheet,
  View, Text, Image, TextInput,
  Pressable, ScrollView
} from 'react-native';
import React, { useState } from 'react';


import * as DocumentPicker from 'expo-document-picker';
import { MapPin, Mail, Lock } from 'lucide-react-native';

import justLogo from '../../assets/images/justLogo.png';
import ProceedButton from '../components/ProceedButton';
import { useRouter } from "expo-router";

export default function RegistrationScreenEmployer() {
  const [documentName, setDocumentName] = useState<string | null>(null);

  const handleDocumentPick = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setDocumentName(asset.name);
      console.log('Picked document:', asset);
    }
  };

  const route = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center justify-center py-8 px-6">

          {/* Header Section */}
          <View className="flex-row items-center w-full max-w-md pt-8 mb-6">
            <Image source={justLogo} className="w-20 h-20" resizeMode="contain" />
            <View className="ml-4 flex-1">
              <Text style={style.titleText}>Create an account</Text>
              <Text style={style.subHeaderText}>
                Find your employees with one swipe
              </Text>
            </View>
          </View>

          {/* Form Fields */}
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
                placeholder="companyname@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Company Name */}
            <View className="mb-4">
              <Text style={style.fieldHeader} className="mb-2">Company Name</Text>
              <TextInput
                style={style.textInput}
                className="border border-gray-300 rounded-md p-3"
                placeholder="Ateneo de Naga University"
              />
            </View>

            {/* Company Documents */}
            <View className="mb-4">
              <Text style={style.fieldHeader} className="mb-2">
                Company Documents (Required for verification)
              </Text>
              <Pressable
                onPress={handleDocumentPick}
                className="border border-gray-300 rounded-md p-3 bg-gray-100"
              >
                <Text className="text-gray-700">
                  {documentName ? documentName : 'Upload document'}
                </Text>
              </Pressable>
            </View>

            {/* Company Address */}
            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <MapPin size={18} color="#616161" />
                <Text style={style.fieldHeader} className="ml-2">Company Address</Text>
              </View>
              <TextInput
                style={style.textInput}
                className="border border-gray-300 rounded-md p-3"
                placeholder="Ateneo Ave, Naga City, 4400 Camarines Sur"
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
              <ProceedButton href="/ConfirmRegistration" label="Proceed" />
            </View>
          </View>

          <View className='items-center mt-4'>
            <Text> Already have an account? <Text className='color-[#6C63FF] font-bold' onPress={() => route.push('/LoginScreen')}>
              Login here!
            </Text>
            </Text>
          </View>

        </View>
      </ScrollView>
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