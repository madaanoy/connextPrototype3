import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pen } from "lucide-react-native";

import LogoAndNotif from "../../components/LogoAndNotif";
import GenericSearchBar from "../../components/GenericSearchBar";
import { useRouter } from "expo-router";

export default function EmployerHome() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <LogoAndNotif />

      <View className="px-2 py-2 flex-1">

        {/* Section Title + Search */}
        <View className="flex-row items-center mb-4">
          <Text
            style={{ fontFamily: "Lexend-Bold" }}
            className="text-2xl text-[#37424F] mr-3"
          >
            Your Openings
          </Text>

          <View className="flex-1">
            <GenericSearchBar />
          </View>

        </View>

        {/* Main Body */}
        <View>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className="color-[#747474]">You have not posted any openings yet.</Text>
        </View>

      </View>

      {/* Floating Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-[#1572DB] rounded-lg px-4 py-3 flex-row items-center"
        onPress={() => router.push("/create-opening")}
      >
        <Pen size={20} color="white" />
        <Text
          style={{ fontFamily: "Lexend-Bold" }}
          className="ml-2 text-white"
        >
          Create a Job Opening
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}