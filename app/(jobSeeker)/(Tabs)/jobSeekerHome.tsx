import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Bell } from 'lucide-react-native';

import JobPostingCard from '../../components/JobPostingCard'
import justLogo from '../../../assets/images/justLogo.png';

export default function JobSeekerHome() {
  return (
    <View className="flex-1 bg-white">

      <View className="pt-10">
        <View className="flex-row justify-between items-center mr-10">
          <Image
            source={justLogo}
            style={styles.imageStyle}
            className="ml-2 mt-5"
          />
          <Bell size={20} />
        </View>

        <Text
          style={{ fontFamily: 'Poppins-Bold' }}
          className="pl-10 mt-6 text-2xl"
        >
          Find Jobs
        </Text>
      </View>

      <JobPostingCard/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});
