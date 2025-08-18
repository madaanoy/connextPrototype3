import React from "react";
import {
   View,
   Text,
   TextInput,
   TouchableOpacity,
   ScrollView,
   StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Plus, Pencil, Bell } from "lucide-react-native";

export default function EditProfileScreen() {
   const router = useRouter();

   return (
      <SafeAreaView className="flex-1 bg-white">

         <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {/* Back + Title */}
            <View className="flex-row items-center my-2 py-2">
               <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
                  <ChevronLeft size={28} color="#37424F" />
               </TouchableOpacity>
               <Text style={[styles.title, { fontFamily: "Lexend-Bold" }]} className="px-2">
                  Edit Profile
               </Text>
            </View>

            {/* First Name & Last Name (side-by-side) - added horizontal gap via marginRight */}
            <View className="flex-row my-2 py-2">
               <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                     placeholder="Juan"
                     placeholderTextColor="#9AA4AF"
                     className="border border-gray-300 px-3 py-3 rounded-lg"
                  />
               </View>

               <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                     placeholder="Dela Cruz"
                     placeholderTextColor="#9AA4AF"
                     className="border border-gray-300 px-3 py-3 rounded-lg"
                  />
               </View>
            </View>

            {/* Middle Initial (narrow) */}
            <View className="my-2 py-2">
               <Text style={styles.label}>Middle Initial (if applicable)</Text>
               <TextInput
                  placeholder="M."
                  placeholderTextColor="#9AA4AF"
                  className="border border-gray-300 px-3 py-3 rounded-lg mt-2"
                  style={{ width: 100}}
               />
            </View>

            {/* Industry pills */}
            <View className="my-2 py-2">
               <Text style={styles.label}>Industry</Text>

               <View className="flex-row flex-wrap items-center">
                  <TouchableOpacity activeOpacity={0.8} className="px-5 py-3 mr-3 mb-3 rounded-lg" style={{ backgroundColor: "#6C63FF" }}>
                     <Text style={{ fontFamily: "Poppins-Medium", color: "white"}}>Hospitality</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} className="px-5 py-3 mr-3 mb-3 rounded-lg" style={{ backgroundColor: "#6C63FF" }}>
                     <Text style={{ fontFamily: "Poppins-Medium", color: "white" }}>Sales</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} className="px-5 py-3 mb-3 rounded-lg border border-gray-300">
                     <View className="flex-row items-center">
                        <Plus size={14} color="#1572DB" />
                        <Text style={{ fontFamily: "Poppins-Regular", color: "#1572DB", marginLeft: 8 }}>
                           Add new
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>

            {/* Location */}
            <View className="my-2 py-2">
               <Text style={styles.label}>Location</Text>
               <TextInput
                  placeholder="Ateneo Ave, Naga City, 4400 Camarines Sur"
                  placeholderTextColor="#9AA4AF"
                  className="border border-gray-300 px-3 py-3 rounded-lg mt-2"
               />
            </View>

            {/* Email */}
            <View className="my-2 py-2">
               <Text style={styles.label}>Email</Text>
               <TextInput
                  placeholder="adnu@gmail.edu.ph"
                  placeholderTextColor="#9AA4AF"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  className="border border-gray-300 px-3 py-3 rounded-lg mt-2"
               />
            </View>
         </ScrollView>

         {/* Buttons */}
         <View className="flex-row justify-between mt-auto mx-4 mb-4">
            <TouchableOpacity
               onPress={() => router.back()}
               activeOpacity={0.8}
               className="flex-1 mr-3 items-center py-3 rounded-lg"
               style={{ backgroundColor: "#E8E8E8" }}
            >
               <Text style={{ fontFamily: "Lexend-Medium", color: "#37424F" }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
               activeOpacity={0.8}
               className="flex-1 ml-3 items-center py-3 rounded-lg flex-row justify-center"
               style={{ backgroundColor: "#1572DB" }}
               onPress={() => {/* handle save */ }}
            >
               <Pencil size={16} color="#fff" />
               <Text style={{ fontFamily: "Lexend-Bold", color: "#fff", marginLeft: 8 }}>
                  Save Changes
               </Text>
            </TouchableOpacity>
         </View>

      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   content: {
      paddingHorizontal: 15,
      paddingBottom: 30,
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