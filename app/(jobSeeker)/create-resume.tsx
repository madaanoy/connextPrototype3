import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ChevronLeft, Pencil, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function CreateResumeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center my-2 py-2">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <ChevronLeft size={28} color="#37424F" />
          </TouchableOpacity>
          <Text
            style={[styles.title, { fontFamily: "Lexend-Bold" }]}
            className="px-2"
          >
            Create Resume
          </Text>
        </View>

        {/* Experience & Education */}
        <View className="flex-row my-2 py-2">
          <View className="flex-1 mr-3">
            <Text style={styles.label}>Experience</Text>
            <TextInput
              placeholder="ex. Custodian at ABC Services"
              placeholderTextColor="#9AA4AF"
              className="border border-gray-300 px-3 py-3 rounded-lg"
            />
          </View>

          <View className="flex-1">
            <Text style={styles.label}>Educational Attainment</Text>
            <TextInput
              placeholder="Highschool Graduate"
              placeholderTextColor="#9AA4AF"
              className="border border-gray-300 px-3 py-3 rounded-lg"
            />
          </View>
        </View>

        {/* Add New Buttons */}
        <View className="flex-row justify-between">
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-1 px-5 py-3 mb-3 mr-2 rounded-lg border border-gray-300"
          >
            <View className="flex-row items-center justify-center">
              <Plus size={14} color="#1572DB" />
              <Text
                style={{ fontFamily: "Poppins-Regular" }}
                className="text-[#1572DB] ml-2"
              >
                Add new
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            className="flex-1 px-5 py-3 mb-3 ml-2 rounded-lg border border-gray-300"
          >
            <View className="flex-row items-center justify-center">
              <Plus size={14} color="#1572DB" />
              <Text
                style={{ fontFamily: "Poppins-Regular" }}
                className="text-[#1572DB] ml-2"
              >
                Add new
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Degree */}
        <View className="flex-row my-2 py-2">
          <View className="flex-1">
            <Text style={styles.label}>Degree (if applicable)</Text>
            <TextInput
              placeholder="Bachelor of Science in ..."
              placeholderTextColor="#9AA4AF"
              className="border border-gray-300 px-3 py-3 rounded-lg"
            />
          </View>
        </View>

        {/* Technical Skills */}
        <View className="flex-row my-2 py-2">
          <View className="flex-1">
            <Text style={styles.label}>Technical Skills</Text>
            <TextInput
              placeholder="Bachelor of Science in ..."
              placeholderTextColor="#9AA4AF"
              className="border border-gray-300 px-3 py-3 rounded-lg"
            />
          </View>
        </View>

        {/* Add new skills button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="px-5 py-3 mb-3 rounded-lg border border-gray-300"
        >
          <View className="flex-row items-center">
            <Plus size={14} color="#1572DB" />
            <Text
              style={{ fontFamily: "Poppins-Regular" }}
              className="text-[#1572DB] ml-2"
            >
              Add new
            </Text>
          </View>
        </TouchableOpacity>

        {/* Certifications */}
        <View className="flex-row my-2 py-2">
          <View className="flex-1">
            <Text style={styles.label}>Certifications (if any)</Text>
            <TextInput
              placeholder="Bachelor of Science in ..."
              placeholderTextColor="#9AA4AF"
              className="border border-gray-300 px-3 py-3 rounded-lg"
            />
          </View>
        </View>

        {/* Add new skills button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="px-5 py-3 mb-3 rounded-lg border border-gray-300"
        >
          <View className="flex-row items-center">
            <Plus size={14} color="#1572DB" />
            <Text
              style={{ fontFamily: "Poppins-Regular" }}
              className="text-[#1572DB] ml-2"
            >
              Add new
            </Text>
          </View>
        </TouchableOpacity>


        {/* Contact Number */}
        <View className="flex-row my-2 py-2">
          <View className="flex-1 mr-3">
            <Text style={styles.label}>Contact No.</Text>
            <TextInput
              placeholder="+63 912 345 6789"
              placeholderTextColor="#9AA4AF"
              className="border border-gray-300 px-3 py-3 rounded-lg"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </ScrollView>

      {/* Fixed Buttons at Bottom */}
      <View className="flex-row justify-between mx-4 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="flex-1 mr-3 items-center py-3 rounded-lg bg-[#E8E8E8]"
        >
          <Text style={{ fontFamily: "Lexend-Medium" }} className="text-[#37424F]">
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 ml-3 items-center py-3 rounded-lg flex-row justify-center bg-[#1572DB]"
          onPress={() => {
            /* handle save */
          }}
        >
          <Pencil size={16} color="#fff" />
          <Text
            style={{ fontFamily: "Lexend-Bold" }}
            className="text-white ml-2"
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    color: "#37424F",
  },
  label: {
    color: "#221E5C",
    fontSize: 14,
    marginBottom: 6,
    fontFamily: "Lexend-Regular",
  },
});