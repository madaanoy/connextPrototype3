import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function IndustryCategory() {
  const industries = [
    'Retail', 'Customer Service', 'Hospitality', 'Food & Beverage',
    'Warehouse & Logistics', 'Call Center', 'Skilled Labor', 'Office Work',
    'Sales & Marketing', 'Transportation', 'Cleaning & Maintenance'
  ];

  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(prev => prev.filter(item => item !== industry));
    } else {
      setSelectedIndustries(prev => [...prev, industry]);
    }
  };

  return (
    <View className="flex-1 bg-white pt-10 px-6">
      <Text style={styles.titleText}>Which industry are you in?</Text>
      <Text style={styles.subHeaderText} className="mt-2">
        Knowing what industry you’re in will help us in choosing the right offers to you!
      </Text>

      <View className="border-b border-gray-300 w-full my-6" />

      <View className="flex-row flex-wrap justify-center gap-2">
        {industries.map((industry, index) => {
          const isSelected = selectedIndustries.includes(industry);
          return (
            <Pressable
              key={index}
              onPress={() => toggleIndustry(industry)}
              className={`px-4 py-2 rounded-full border ${
                isSelected ? 'bg-[#6C63FF] border-[#6C63FF]' : 'border-gray-300'
              }`}
            >
              <Text
                className={`text-sm ${
                  isSelected ? 'text-white font-semibold' : 'text-black'
                }`}
              >
                {industry}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable className="bg-[#6C63FF] px-6 py-4 rounded-xl mt-12 mx-auto">
        <Text className="text-white font-bold text-center">Proceed</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Lexend-Bold',
    fontSize: 24,
    color: '#6C63FF',
    textAlign: 'center',
  },
  subHeaderText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#A1A1A1',
    textAlign: 'center',
  },
});
