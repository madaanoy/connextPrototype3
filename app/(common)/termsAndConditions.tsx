import { ScrollView, View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function termsandconditions() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center flex-row">
        <ChevronLeft size={24} />
        <Text
          style={{ fontFamily: "Lexend-Bold" }}
          className="color-[#37424F] text-2xl"
          onPress={() => router.back()}
        >
          {" "}
          Terms and Conditions{" "}
        </Text>
      </View>

      {/* Content */}
      <ScrollView className="px-4 py-6">
        <Text className="mb-4 font-bold">
          Effective date:{" September 1, 2029"}
        </Text>

        <Text className="mb-3">
          These Terms and Conditions (“Terms") govern your use of the connext
          service (the “Service") operated by{" "}
          <Text style={{ fontFamily: "Lexend-Bold" }}>connext</Text> (“we,”
          “us,” or “Company”). By accessing or using the Service, you agree to
          these Terms. If you do not agree, do not use the Service.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          1. Eligibility
        </Text>
        <Text className="mb-3">
          You must be at least 18 years old (or the age of majority in your
          jurisdiction) and capable of entering into a binding contract to use
          the Service. By using the Service you represent and warrant that you
          meet these requirements.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          2. Account & Security
        </Text>
        <Text className="mb-3">
          1. To access certain features you may create an account. Provide
          accurate information and keep your credentials secure. 2. You are
          responsible for all activity under your account. Notify us immediately
          of any unauthorized use.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          3. Services
        </Text>
        <Text className="mb-3">
          connext provides [brief description of services — e.g., a platform
          that connects X and Y, facilitates Z]. We may add, change, suspend or
          remove features at any time.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          4. User Conduct
        </Text>
        <Text className="mb-3">
          You agree not to: - Use the Service for illegal activities. - Post or
          transmit unlawful, harmful, abusive, obscene, or infringing content. -
          Interfere with, damage, or disrupt the Service or other users’ access.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          5. Content & License
        </Text>
        <Text className="mb-3">
          1. You retain ownership of content you upload, submit, or post. 2. By
          submitting content, you grant connext a non-exclusive, worldwide,
          royalty-free license to host, use, reproduce, modify, and display that
          content as necessary to provide the Service.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          6. Payments & Fees
        </Text>
        <Text className="mb-3">
          If any part of the Service requires payment, you agree to pay the fees
          described at the time of purchase. Fees are non-refundable except as
          required by law or as otherwise stated.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          7. Intellectual Property
        </Text>
        <Text className="mb-3">
          All rights, title and interest in connext’s software, design, text,
          graphics, logos, and other materials are our property or licensed to
          us. You may not copy, modify, distribute, or create derivative works
          without our prior written consent.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          8. Privacy
        </Text>
        <Text className="mb-3">
          Our Privacy Policy explains how we collect, use, and share
          information. By using the Service you agree to the terms of the
          Privacy Policy. [Link or reference to Privacy Policy]
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          9. Termination
        </Text>
        <Text className="mb-3">
          We may suspend or terminate your access for violation of these Terms
          or for any reason, with or without notice. You may close your account
          at any time through your account settings or by contacting support.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          10. Disclaimers
        </Text>
        <Text className="mb-3">
          The Service is provided “as is” and “as available.” To the fullest
          extent permitted by law, connext disclaims all warranties, express or
          implied, including merchantability, fitness for a particular purpose,
          and non-infringement.
        </Text>

        <Text style={{ fontFamily: "Lexend-Bold" }} className="text-base mt-3">
          11. Limitation of Liability
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
