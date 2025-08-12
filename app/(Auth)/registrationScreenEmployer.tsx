import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

import { Link } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { MapPin, Mail, Lock, } from 'lucide-react-native'

import justLogo from '../../assets/images/justLogo.png';
import ProceedButton from '../Components/ProceedButton'

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

  return (

    <View className="flex-1 bg-white py-10">

      <View className="items-center justify-center pt-6 mt-10 px-10">
        {/* Header Section */}
        <View className="flex-row items-center w-full max-w-md">

          <Image source={justLogo} className="w-20 h-20" resizeMode="contain" />
          <View className="ml-4 flex-1">
            <Text style={style.titleText}>Create an account</Text>
            <Text style={style.subHeaderText}>
              Find your employees with one swipe
            </Text>

          </View>

        </View>

        {/* Form Fields */}
        <View className="w-full max-w-md mt-8">

          {/* Email */}
          <View className="mb-4">

            <View className='flex-row items-center mb-2'>
              <Mail size={18}></Mail>
              <Text style={style.fieldHeader} className='ml-2'>Email</Text>
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
            
            <Text style={style.fieldHeader}>Company Name</Text>
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Ateneo de Naga University"
            />
          </View>

          {/* Company Documents */}
          <View className="mb-4">

            <Text style={style.fieldHeader}>
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

            <View className='flex-row items-center mb-2'>
              <MapPin size={18}></MapPin>
              <Text style={style.fieldHeader} className='ml-2'>Company Address</Text>
            </View>
            
            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Ateneo Ave, Naga City, 4400 Camarines Sur"  
            />
          </View>

          {/* Password */}
          <View className="mb-4">

            <View className='flex-row items-center mb-2'>
              <Lock size={18}></Lock>
              <Text style={style.fieldHeader} className='ml-2'>Password</Text>
            </View>

            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Create a password"
              secureTextEntry
            />

          </View>

          {/* Confirm Password */}
          <View className="mb-4">

            <View className='flex-row items-center mb-2'>
              <Lock size={18}></Lock>
              <Text style={style.fieldHeader} className='ml-2'>Confirm Password</Text>
            </View>

            <TextInput
              style={style.textInput}
              className="border border-gray-300 rounded-md p-3"
              placeholder="Confirm your password"
              secureTextEntry
            />
          </View>

          {/* Proceed Button */}
          <ProceedButton 
          href='/confirmRegistration' 
          label='Proceed'/>
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
    marginBottom: 6,
  },
  textInput: {
    fontFamily: 'Poppins-Regular',
  },
});
