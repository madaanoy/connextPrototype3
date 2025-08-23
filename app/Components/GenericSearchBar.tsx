import React from "react";
import { View, TextInput } from "react-native";
import { Search } from "lucide-react-native";

interface GenericSearchBarProps {
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

export default function GenericSearchBar({
  onSearchChange,
  placeholder = "Search...",
}: GenericSearchBarProps) {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
      <Search size={18} color="#6B7280" />
      <TextInput
        className="flex-1 ml-2 text-gray-800"
        style={{ fontFamily: "Poppins-Regular" }}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onChangeText={onSearchChange}
      />
    </View>
  );
}
