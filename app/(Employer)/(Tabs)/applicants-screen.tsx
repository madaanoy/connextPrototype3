import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoAndNotif from '../../components/LogoAndNotif';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useJobs } from '../../context/JobOpeningContext';
import { ChevronLeft } from 'lucide-react-native';

export default function ApplicantsScreen() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const { jobs } = useJobs();

  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">Job not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header */}
      <LogoAndNotif />

      {/* Title Row */}
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ChevronLeft size={24} color="#37424F" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: 'Lexend-Bold' }}
          className="text-2xl text-[#37424F]"
        >
          Your Applicants ({job.applicants.length})
        </Text>
      </View>

      {/* Applicants List */}
      {job.applicants.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text
            className="text-gray-500"
            style={{ fontFamily: 'Poppins-Regular' }}
          >
            No applicants yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={job.applicants}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
              <Text
                style={{ fontFamily: 'Lexend-Medium' }}
                className="text-gray-900 text-base"
              >
                {item.name}
              </Text>
              <Text
                style={{ fontFamily: 'Poppins-Regular' }}
                className="text-gray-600 text-sm"
              >
                {item.email}
              </Text>
              <Text
                className="text-gray-400 text-xs mt-1"
                style={{ fontFamily: 'Poppins-Regular' }}
              >
                Applied on {item.appliedAt.toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}