import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import appLogo from '../assets/images/app_logo.png';
import { Link } from 'expo-router';

export default function ConfirmRegistration() {
   return (
      <View className="flex-1 items-center justify-center px-5 bg-white">
         {/* Logo */}
         <Image
            source={appLogo}
            resizeMode="contain"
            style={styles.image}
         />

         {/* Title */}
         <Text style={styles.titleText}>
            Thank you for registering!
         </Text>

         {/* Content */}
         <View className="items-center justify-center px-4 space-y-4">
            <Text style={styles.bodyText} className='mb-5'>
               Please wait while we verify your status as an Employer.
               As a platform that provides opportunities, it is important
               that we be careful in verifying our Employers.
            </Text>

            <Text style={styles.bodyText}>
               After verification, we will be sending you an email regarding
               your status. {'\n\n'}

               Thank you.
            </Text>
         </View>

         <Link
            href="/loginScreen"
            className="bg-[#6C63FF] px-6 py-4 rounded-xl" style={{ width: 150, height: 50, marginTop: '50%' }}>
            <Text className="text-white font-bold text-center">I understand</Text>
         </Link>
         <Text className='mt-5'> Read our terms and conditions<Link href="termsAndConditions" className='text-blue-500 font-bold'> here. </Link> </Text>
      </View>
   );
}

const styles = StyleSheet.create({
   titleText: {
      fontFamily: 'Lexend-Bold',
      fontSize: 24,
      marginBottom: 25
   },
   image: {
      width: 300,
      height: 100,
      marginBottom: 20
   },
   bodyText: {
      fontFamily: 'Poppins-Regular',
      color: '#37424F',
      fontSize: 14,
      textAlign: 'justify'
   }
});