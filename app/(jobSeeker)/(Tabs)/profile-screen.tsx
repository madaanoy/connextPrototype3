import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  Upload,
  LogOutIcon,
  SendHorizonal,
  Settings,
  Star,
  UserRoundX,
} from "lucide-react-native";
import LogoAndNotif from "../../components/LogoAndNotif";
import * as DocumentPicker from "expo-document-picker";

export default function ProfileScreen() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
        copyToCacheDirectory: true,
      });

      // ✅ New API
      if ("canceled" in res) {
        if (!res.canceled && res.assets && res.assets.length > 0) {
          const file = res.assets[0];
          setResumeFile(file.name); // <-- Store file name
          console.log("Picked file:", file);
        }
        return;
      }

      // ✅ Legacy API
      const oldRes = res as any;
      if (oldRes?.type === "success" && oldRes?.name) {
        setResumeFile(oldRes.name); // <-- Store file name
        console.log("Picked file (legacy):", oldRes);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LogoAndNotif />

      {/* Profile Section */}
      <View className="py-2 px-2">
        <Text
          style={{ fontFamily: "Lexend-Bold" }}
          className="text-2xl color-[#37424F]"
        >
          Your Profile
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row items-center justify-between px-2 py-4">
          <Text
            style={{ fontFamily: "Lexend-Regular" }}
            className="text-[#37424F]"
          >
            Name
          </Text>

          <View className="flex-row items-center">
            <Text
              style={{ fontFamily: "Lexend-Regular" }}
              className="text-[#747474] px-4"
            >
              Juan Dela Cruz
            </Text>

            {/* Programmatic navigation for the chevron */}
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Edit profile"
              onPress={() => router.push("/edit-profile")}
            >
              <ChevronRight size={20} color="#461F71" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Other profile rows */}
      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#37424F]">
            Industry
          </Text>
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#747474]">
            Hospitality, Sales
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#37424F]">
            Location
          </Text>
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#747474]">
            Lourdes Village, Pili, San Jose, Camarines Sur
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#37424F]">
            Email
          </Text>
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#747474]">
            juandelacruz@gbox.adnu.edu.ph
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#37424F]">
            Currently working at
          </Text>
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#747474]">
            Jollibee Inc.
          </Text>
        </View>
      </View>

      {/* Resume Section */}
      <View className="flex-row items-center justify-between py-2 px-2">
        <Text
          style={{ fontFamily: "Lexend-Bold" }}
          className="text-xl color-[#242573]"
        >
          Résumé
        </Text>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Edit Resume"
          onPress={() => router.push("/edit-resume")}
        >
          <ChevronRight size={20} color="#461F71" />
        </TouchableOpacity>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          {/* Upload PDF */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickDocument}
            className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2"
          >
            <Upload size={16} color="#37424F" />
            <Text
              style={{ fontFamily: "Lexend-Regular" }}
              className="ml-2 text-[#37424F]"
            >
              {resumeFile ? resumeFile : "Upload your resume here"}
            </Text>
          </TouchableOpacity>

          {/* Create Resume Button */}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Create resume"
            className="p-3 bg-[#1572DB] rounded-lg"
            onPress={() => router.push("/create-resume")}
          >
            <Text
              style={{ fontFamily: "Lexend-Bold", color: "white" }}
              className="text-sm"
            >
              Create Resume
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Miscellaneous Section */}
      <View className="py-2 px-2">
        <Text
          style={{ fontFamily: "Lexend-Bold" }}
          className="text-xl color-[#242573]"
        >
          Miscellaneous
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }}>Settings</Text>
          <Settings size={20} color={"#747474"} />
        </View>

        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }}>Send us feedback</Text>
          <SendHorizonal size={20} color={"#1572DB"} />
        </View>

        <View className="flex-row justify-between items-center px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }}>Give us a rating</Text>
          <Star size={20} color={"#FFC312"} />
        </View>
      </View>

      {/* Exit Section */}
      <View className="py-2 px-2">
        <Text
          style={{ fontFamily: "Lexend-Bold" }}
          className="text-xl color-[#242573]"
        >
          Exit
        </Text>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text
            style={{ fontFamily: "Lexend-Bold" }}
            className="text-blue-600"
            onPress={() => router.push("/loginScreen")}
          >
            Logout
          </Text>
          <LogOutIcon size={20} color={"#1572DB"} />
        </View>

        <View className="flex-row justify-between px-2 py-4">
          <Text
            style={{ fontFamily: "Lexend-Bold" }}
            className="text-red-500"
          >
            Delete my account
          </Text>
          <UserRoundX size={20} color={"#B80E0E"} />
        </View>
      </View>
    </SafeAreaView>
  );
}
