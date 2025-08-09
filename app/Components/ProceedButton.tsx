import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

// Allow props so we can reuse it with different text and links
type ProceedButtonProps = {
  label: string;
  href: string;
};

export default function ProceedButton({ label, href }: ProceedButtonProps) {
  return (
    <Link
      href={href}
      className="bg-[#6C63FF] px-6 py-4 items-center rounded-xl"
    style={style.ProceedButton}>
      <Text className="text-white font-bold text-center">
        {label}
      </Text>
    </Link>
  );
}

const style = StyleSheet.create({
  ProceedButton: {
    marginTop: 20,
  }
})