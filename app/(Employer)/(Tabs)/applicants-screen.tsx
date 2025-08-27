// applicants-screen.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoAndNotif from '../../components/LogoAndNotif'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useJobs } from '../../context/JobOpeningContext'
import { ChevronLeft } from 'lucide-react-native';

import ApplicantCard, { CardApplicant } from '../../components/employer/ApplicantCard' // adjust path

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

  // 🔹 Sample applicants (for demo only)
  const sampleApplicants: CardApplicant[] = [
    {
      id: 1,
      fullName: "Juan Dela Cruz",
      degree: "Bachelor of Science in Information Technology",
      location: "Naga City, Philippines",
      skills: ["React Native", "JavaScript", "UI/UX"],
      experience: "2 years as a Mobile Developer at TechCorp",
    },
    {
      id: 2,
      fullName: "Maria Santos",
      degree: "Master of Business Administration",
      location: "Quezon City, Philippines",
      skills: ["Project Management", "Leadership", "Finance"],
      experience: "5 years as a Business Analyst at FinServe",
    },
    {
      id: 3,
      fullName: "Pedro Ramirez",
      degree: "Bachelor of Science in Hospitality Management",
      location: "Cebu City, Philippines",
      skills: ["Customer Service", "Event Planning", "Team Leadership"],
      experience: "3 years in Hotel Operations at GrandStay Hotels",
    },
  ];

  // Use only real applicants, no sample data
  const cardApplicants: CardApplicant[] = job.applicants.map((a: any) => ({
    id: a.id,
    fullName: a.name,
    degree: a.degree ?? "—",
    location: a.location ?? "—",
    skills: Array.isArray(a.skills) ? a.skills : [],
    experience: a.experience ?? "—",
  }));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      {/* Header */}
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <ChevronLeft size={24} color="#37424F" />
        </TouchableOpacity>
        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-2xl text-[#37424F]">
          Your Applicants ({cardApplicants.length})
        </Text>
      </View>

      {/* Swipeable Applicant Card */}
      <View style={{ flex: 1 }}>
        <ApplicantCard applicants={cardApplicants} />
      </View>
    </SafeAreaView>
  );
}
