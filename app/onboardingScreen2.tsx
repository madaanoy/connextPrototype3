import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import justLogo from '../assets/images/justLogo.png';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen2() {
  return (
    <SafeAreaView className="flex-1 items-center px-5 bg-white">
      {/* Header Section */}
      <View className="flex-row items-center justify-between w-full my-8">
        <View className="flex-1">
          <Text style={styles.titleText}>
            Welcome to{'\n'}<Text style={{color: '#6C63FF'}}>connext </Text>
          </Text>
        </View>
        <Image source={justLogo} className="w-20 h-20" resizeMode="contain" />
      </View>

      {/* Introduction Text */}
      <Text style={styles.subHeaderText}>
        Please follow these guidelines so that both sides are satisfied.
      </Text>

      {/* Guidelines List */}
      <View className="w-full space-y-6">
        {/* Guideline 1 */}
        <View className="bg-gray-50 p-4 rounded-lg">
          <Text style={styles.guidelineHeader}>Be professional.</Text>
          <Text className="text-gray-600">
            When talking to each other, maintain a level of courtesy.
          </Text>
        </View>

        {/* Guideline 2 */}
        <View className="bg-gray-50 p-4 rounded-lg">
          <Text style={styles.guidelineHeader}>Protect your privacy.</Text>
          <Text className="text-gray-600">
            Be careful in sharing any personal details.
          </Text>
        </View>

        {/* Guideline 3 */}
        <View className="bg-gray-50 p-4 rounded-lg">
          <Text style={styles.guidelineHeader}>Show interest.</Text>
          <Text className="text-gray-600">
            Engage with each other. Both sides will only benefit if there's an agreement.
          </Text>
        </View>

        {/* Guideline 4 */}
        <View className="bg-gray-50 p-4 rounded-lg">
          <Text style={styles.guidelineHeader}>Report any issues.</Text>
          <Text className="text-gray-600">
            If you encounter any issues, report it to our team to maintain the level of professionalism in the community.
          </Text>
        </View>
      </View>

      {/* Proceed Button */}
      <Link
        href="/accountType"
        className="bg-[#6C63FF] px-6 py-4 rounded-xl mt-auto mb-4"
      style={{width: 150, height: 50}}>
        <Text className="text-white font-bold text-center text-lg">Start</Text>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Lexend-Medium',
    fontSize: 24,
    fontWeight: 500,
  },
  subHeaderText: {
    fontFamily: 'Poppins-Medium',
    color: '#1A1A2E',
    textAlign: 'center',
    marginRight: 80,
    marginLeft: 80,
    paddingBottom: 20
  },
  guidelineHeader: {
    fontFamily: 'Poppins-Bold',
    marginBottom: 1,
  }
})