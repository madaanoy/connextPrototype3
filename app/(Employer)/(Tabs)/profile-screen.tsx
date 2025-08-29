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
import LogoutModal from "../../components/LogoutModal";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import * as DocumentPicker from "expo-document-picker";

export default function ProfileScreen() {
  const router = useRouter();
  const [resumeFile, setResumeFile] = useState<{ name: string; size: number } | null>(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: false,
        copyToCacheDirectory: true,
      });

      if ("canceled" in res) {
        if (!res.canceled && res.assets && res.assets.length > 0) {
          const file = res.assets[0];
          setResumeFile({ name: file.name, size: file.size ?? 0 });
        }
        return;
      }

      const oldRes = res as any;
      if (oldRes?.type === "success" && oldRes?.name) {
        setResumeFile({ name: oldRes.name, size: oldRes.size ?? 0 });
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  const handleLogout = () => {
    setLogoutModalVisible(false);
    router.push("/LoginScreen");
  };

  const handleDeleteAccount = () => {
    setDeleteAccountModalVisible(false);
    // Add actual delete account logic here
    console.log("Account deletion requested");
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
              Jollibee Inc.
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
            Fast Food, Sales
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#37424F]">
            Location
          </Text>
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#747474]">
            Ateneo Ave, Naga City, 4400
          </Text>
        </View>
      </View>

      <View className="px-2">
        <View className="flex-row justify-between px-2 py-4">
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#37424F]">
            Email
          </Text>
          <Text style={{ fontFamily: "Lexend-Regular" }} className="text-[#747474]">
            jollibeeinc@gmail.com
          </Text>
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
        <TouchableOpacity 
          className="flex-row justify-between items-center px-2 py-4"
          onPress={() => setLogoutModalVisible(true)}
        >
          <Text
            style={{ fontFamily: "Lexend-Bold" }}
            className="text-blue-600"
          >
            Logout
          </Text>
          <LogOutIcon size={20} color={"#1572DB"} />
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-row justify-between items-center px-2 py-4"
          onPress={() => setDeleteAccountModalVisible(true)}
        >
          <Text
            style={{ fontFamily: "Lexend-Bold" }}
            className="text-red-500"
          >
            Delete my account
          </Text>
          <UserRoundX size={20} color={"#B80E0E"} />
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <LogoutModal
        visible={logoutModalVisible}
        onDismiss={() => setLogoutModalVisible(false)}
        onLogout={handleLogout}
      />
      <DeleteAccountModal
        visible={deleteAccountModalVisible}
        onDismiss={() => setDeleteAccountModalVisible(false)}
        onDeleteAccount={handleDeleteAccount}
      />
    </SafeAreaView>
  );
}