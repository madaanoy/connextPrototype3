import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
  runOnJS,
} from 'react-native-reanimated';

import { Link } from 'expo-router'

import appLogo from '../../assets/images/app_logo.png';
import jobSeeker from '../../assets/images/jobSeeker.png';
import Employer from '../../assets/images/Employer.png';

const { width } = Dimensions.get('window');

export default function AccountType() {
  const [selected, setSelected] = useState<'jobseeker' | 'employer'>('jobseeker');
  const [settledType, setSettledType] = useState<'jobseeker' | 'employer'>('jobseeker');

  const position = useSharedValue(0); // 0 = jobseeker, 1 = employer

  const handleSelect = (type: 'jobseeker' | 'employer') => {
    setSelected(type);
    const targetValue = type === 'jobseeker' ? 0 : 1;

    position.value = withTiming(targetValue, { duration: 100 }, () => {
      runOnJS(setSettledType)(type); // This runs after animation completes
    });
  };

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(position.value * (width * 0.5 - 16), {
            duration: 600,
          }),
        },
      ],
    };
  });

  const isActive = (type: 'jobseeker' | 'employer') => settledType === type;

  return (

    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-white">

      {/* Header */}

      <View className='items-center'>

        <Image source={appLogo} className="w-[300px] h-[95px]" resizeMode="contain" />
        <Text style={styles.titleText}>Who are you?</Text>
        <Text style={{ fontFamily: 'Lexend-Regular' }} className="text-center mx-10 my-8 text-[14px] text-black">
          Choose one account type so that we know who to pair you up with.
        </Text>

      </View>

      {/* Sliding Highlight Bar */}
      <View className="flex-row w-full justify-between relative p-1 mb-10 rounded-2xl">
        <Animated.View
          style={[
            {
              position: 'absolute',
              height: 250,
              width: width * 0.5 - 16,
              backgroundColor: '#6C63FF',
              borderRadius: 20,
              zIndex: 0,
            },
            sliderStyle,
          ]}
        />

        {/* Job Seeker */}
        <Pressable
          onPress={() => handleSelect('jobseeker')}
          className="flex-1 items-center p-4 rounded-2xl z-10"
        >
          <Image source={jobSeeker} className="mb-5 w-[100px] h-[100px]" resizeMode="contain" />
          <Text
            style={[
              styles.accountTypeText,
              { color: isActive('jobseeker') ? 'white' : 'black' },
            ]}
          >
            Job Seeker
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: isActive('jobseeker') ? 'white' : 'black',
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            This account type is for those looking for employment.
          </Text>
        </Pressable>

        {/* Employer */}
        <Pressable
          onPress={() => handleSelect('employer')}
          className="flex-1 items-center p-4 rounded-2xl z-10"
        >
          <Image source={Employer} className="mb-5 w-[100px] h-[100px]" resizeMode="contain" />
          <Text
            style={[
              styles.accountTypeText,
              { color: isActive('employer') ? 'white' : '#1A1A1A' },
            ]}
          >
            Employer
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: isActive('employer') ? 'white' : 'black',
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            This account type is for those looking for employees.
          </Text>
        </Pressable>
      </View>

      {/* Dynamic navigation button */}

      <Link
        href={selected === 'jobseeker' ? '/RegistrationScreenJS' : '/RegistrationScreenEmployer'}
        className="bg-[#6C63FF] px-10 py-3 my-5 rounded-lg items-center justify-center"
      >
        <Text className="text-white font-bold text-center">Proceed</Text>
      </Link>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 24,
    textAlign: 'center',
    color: '#6C63FF',
  },
  accountTypeText: {
    fontSize: 16,
    fontFamily: 'Lexend-Bold',
    marginBottom: 5,
  },
});
