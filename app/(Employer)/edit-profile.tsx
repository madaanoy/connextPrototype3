import React, { useState } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { ChevronLeft, Plus, Pencil } from "lucide-react-native"
import * as ImagePicker from "expo-image-picker"
import companyProfile from "../../assets/images/placeholderImage.png"

export default function EditProfileScreen() {
  const router = useRouter()
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "We need access to your gallery to select a photo."
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri)
    }
  }
  const inputStyle = "bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base"

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={26} />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "Lexend-Bold" }}
          className="text-2xl ml-3 text-gray-900"
        >
          Edit Profile
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View className="flex-col items-center mb-6">
          <Image
            source={profileImage ? { uri: profileImage } : companyProfile}
            style={{ width: 90, height: 90, borderRadius: 45 }}
          />
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Text
              style={{ fontFamily: "Lexend-Medium" }}
              className="mt-2 text-blue-600"
            >
              Change company photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Company Name */}
        <View className="mb-4">
          <Text
            style={{ fontFamily: "Lexend-Regular", color: "#221E5C" }}
            className="text-lg mb-1"
          >
            Company Name
          </Text>
          <TextInput
            placeholder="e.g. Google Inc."
            placeholderTextColor="#9CA3AF"
            className={inputStyle}
            style={{ fontFamily: "Poppins-Regular" }}
          />
        </View>

        {/* Industry */}
        <View className="mb-4">
          <Text
            style={{ fontFamily: "Lexend-Regular", color: "#221E5C" }}
            className="text-lg mb-2"
          >
            Industry
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <Text
              className="px-4 py-2 rounded-full bg-[#6C63FF] text-white text-sm"
              style={{ fontFamily: "Lexend-Regular" }}
            >
              Food & Beverage
            </Text>
            <Text
              className="px-4 py-2 rounded-full bg-[#6C63FF] text-white text-sm"
              style={{ fontFamily: "Lexend-Regular" }}
            >
              Hospitality
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-row items-center border border-[#1572DB] px-3 py-2 rounded-full"
            >
              <Plus size={16} color="#1572DB" />
              <Text
                style={{ fontFamily: "Lexend-Regular", color: "#1572DB" }}
                className="ml-1 text-sm"
              >
                Add New
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Location */}
        <View className="mb-4">
          <Text
            style={{ fontFamily: "Lexend-Regular", color: "#221E5C" }}
            className="text-lg mb-1"
          >
            Location
          </Text>
          <TextInput
            placeholder="e.g. San Francisco, CA"
            placeholderTextColor="#9CA3AF"
            className={inputStyle}
            style={{ fontFamily: "Poppins-Regular" }}
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text
            style={{ fontFamily: "Lexend-Regular", color: "#221E5C" }}
            className="text-lg mb-1"
          >
            Email
          </Text>
          <TextInput
            placeholder="e.g. careers@company.com"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="none"
            keyboardType="email-address"
            className={inputStyle}
            style={{ fontFamily: "Poppins-Regular" }}
          />
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="flex-row justify-between px-4 py-3  bg-white">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          className="flex-1 mr-2 items-center py-3 rounded-lg"
          style={{ backgroundColor: "#E8E8E8" }}
        >
          <Text style={{ fontFamily: "Lexend-Medium", color: "#37424F" }}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          className="flex-1 ml-2 items-center py-3 rounded-lg flex-row justify-center"
          style={{ backgroundColor: "#1572DB" }}
          onPress={() => {
            /* handle save */
          }}
        >
          <Pencil size={16} color="#fff" />
          <Text
            style={{ fontFamily: "Lexend-Bold", color: "#fff", marginLeft: 8 }}
          >
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
