import {
  View,
  Text,
  TouchableOpacity,
  TextInput as RNTextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ChevronLeft, ArrowLeftRight, Pen, Plus } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

type JobType = "full-time" | "part-time";

interface JobFormProps {
  mode: "create" | "edit";
  initialValues?: {
    jobTitle: string;
    jobType: JobType;
    description: string;
    responsibilities: string;
    education: string;
    experience: string;
    salaryMin: string;
    salaryMax: string;
  };
  onSubmit: (formData: any) => void;
}

export default function JobForm({ mode, initialValues, onSubmit }: JobFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobTitle: initialValues?.jobTitle || "",
    jobType: initialValues?.jobType || "full-time",
    description: initialValues?.description || "",
    responsibilities: initialValues?.responsibilities || "",
    education: initialValues?.education || "",
    experience: initialValues?.experience || "",
    salaryMin: initialValues?.salaryMin || "",
    salaryMax: initialValues?.salaryMax || "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleJobTypeSelect = (type: JobType) => {
    setFormData((prev) => ({ ...prev, jobType: type }));
  };

  const validateForm = () => {
    if (!formData.jobTitle.trim()) {
      Alert.alert("Validation Error", "Please enter a job title");
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert("Validation Error", "Please enter a job description");
      return false;
    }
    if (!formData.responsibilities.trim()) {
      Alert.alert("Validation Error", "Please enter key responsibilities");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setIsSaving(true);

    setTimeout(() => {
      onSubmit(formData);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="px-6 py-4">
          {/* Header */}
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-3 p-2 -ml-2 rounded-full active:bg-gray-100"
            >
              <ChevronLeft size={24} color="#37424F" />
            </TouchableOpacity>
            <Text
              style={{ fontFamily: "Lexend-Bold" }}
              className="text-[#37424F] text-2xl"
            >
              {mode === "create" ? "Create Job Opening" : "Edit Job Opening"}
            </Text>
          </View>

          {/* Job Title */}
          <View className="mb-6">
            <Text
              className="text-[#0B3D75] mb-3 text-base font-semibold"
              style={{ fontFamily: "Lexend-SemiBold" }}
            >
              Job Title *
            </Text>
            <RNTextInput
              value={formData.jobTitle}
              onChangeText={(text) => handleInputChange("jobTitle", text)}
              placeholder="e.g. Software Engineer"
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base"
              style={{ fontFamily: "Poppins-Regular" }}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Job Type */}
          <View className="mb-6">
            <Text
              className="text-[#0B3D75] mb-3 text-base font-semibold"
              style={{ fontFamily: "Lexend-SemiBold" }}
            >
              Job Type *
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => handleJobTypeSelect("full-time")}
                className={`px-4 py-3 rounded-lg border ${
                  formData.jobType === "full-time"
                    ? "bg-[#6C63FF] border-[#6C63FF]"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    formData.jobType === "full-time"
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                  style={{ fontFamily: "Lexend-Medium" }}
                >
                  Full-time
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleJobTypeSelect("part-time")}
                className={`px-4 py-3 rounded-lg border ${
                  formData.jobType === "part-time"
                    ? "bg-[#6C63FF] border-[#6C63FF]"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    formData.jobType === "part-time"
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                  style={{ fontFamily: "Lexend-Medium" }}
                >
                  Part-time
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text
              className="text-[#0B3D75] mb-3 text-base font-semibold"
              style={{ fontFamily: "Lexend-SemiBold" }}
            >
              Job Description *
            </Text>
            <RNTextInput
              value={formData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              placeholder="Describe the role..."
              multiline
              numberOfLines={4}
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base min-h-[100px]"
              style={{ fontFamily: "Poppins-Regular", textAlignVertical: "top" }}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Responsibilities */}
          <View className="mb-6">
            <Text
              className="text-[#0B3D75] mb-3 text-base font-semibold"
              style={{ fontFamily: "Lexend-SemiBold" }}
            >
              Key Responsibilities *
            </Text>
            <RNTextInput
              value={formData.responsibilities}
              onChangeText={(text) => handleInputChange("responsibilities", text)}
              placeholder="List responsibilities..."
              multiline
              numberOfLines={4}
              className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base min-h-[100px]"
              style={{ fontFamily: "Poppins-Regular", textAlignVertical: "top" }}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Requirements */}
          <View className="mb-6">
            <Text
              className="text-[#0B3D75] mb-4 text-base font-semibold"
              style={{ fontFamily: "Lexend-SemiBold" }}
            >
              Requirements
            </Text>
            <View className="flex-row gap-4 mb-4">
              <View className="flex-1">
                <Text
                  className="text-gray-700 mb-2 text-sm font-medium"
                  style={{ fontFamily: "Lexend-Medium" }}
                >
                  Educational Attainment
                </Text>
                <RNTextInput
                  value={formData.education}
                  onChangeText={(text) => handleInputChange("education", text)}
                  placeholder="e.g. Bachelor's Degree"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base"
                  style={{ fontFamily: "Poppins-Regular" }}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="flex-1">
                <Text
                  className="text-gray-700 mb-2 text-sm font-medium"
                  style={{ fontFamily: "Lexend-Medium" }}
                >
                  Experience
                </Text>
                <RNTextInput
                  value={formData.experience}
                  onChangeText={(text) => handleInputChange("experience", text)}
                  placeholder="e.g. 2-3 years"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base"
                  style={{ fontFamily: "Poppins-Regular" }}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>

          {/* Salary */}
          <View className="mb-24">
            <Text
              className="text-[#0B3D75] mb-3 text-base font-semibold"
              style={{ fontFamily: "Lexend-SemiBold" }}
            >
              Salary Range (Optional)
            </Text>
            <View className="flex-row items-center gap-4">
              <View className="flex-1">
                <RNTextInput
                  value={formData.salaryMin}
                  onChangeText={(text) => handleInputChange("salaryMin", text)}
                  placeholder="Min salary"
                  keyboardType="numeric"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base"
                  style={{ fontFamily: "Poppins-Regular" }}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View className="px-2">
                <ArrowLeftRight size={20} color="#9CA3AF" />
              </View>
              <View className="flex-1">
                <RNTextInput
                  value={formData.salaryMax}
                  onChangeText={(text) => handleInputChange("salaryMax", text)}
                  placeholder="Max salary"
                  keyboardType="numeric"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base"
                  style={{ fontFamily: "Poppins-Regular" }}
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
            <Text
              className="text-gray-500 mt-2 text-center text-xs"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              Leave blank to hide salary information
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Button */}
      <TouchableOpacity
        className={`absolute bottom-6 right-6 rounded-2xl px-6 py-4 flex-row items-center shadow-lg ${
          isSaving ? "bg-gray-400" : "bg-[#1572DB] active:bg-[#1259B5]"
        }`}
        onPress={handleSubmit}
        disabled={isSaving}
        style={{
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        {mode === "create" ? (
          <Plus size={20} color="white" />
        ) : (
          <Pen size={20} color="white" />
        )}
        <Text
          className="ml-3 text-white text-base font-bold"
          style={{ fontFamily: "Lexend-Bold" }}
        >
          {isSaving
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
            ? "Create Job"
            : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
