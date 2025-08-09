import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-paper';
import companyLogo from '../../assets/images/placeholderImage.png';

import { BriefcaseBusiness, PhilippinePeso, MapPin, Expand } from 'lucide-react-native'

export default function JobPostingCard() {
   return (
      <View>
         <Card style={[styles.card, { backgroundColor: '#6C63FF' }]}>
            <Card.Content>

               {/* Row for logo + posted by + company name */}
               <View style={styles.row}>
                  <Image
                     source={companyLogo}
                     style={styles.imageStyle}
                  />

                  {/* Column for "Posted by" and company name */}
                  <View>
                     <Text style={styles.postedByText}>Posted by:</Text>
                     <Text style={styles.companyName}>Jollibee</Text>
                  </View>

               </View>

               <View className='mt-5'>
                  <View className='flex-row items-center gap-2 mb-2'>
                     <BriefcaseBusiness size={20} color={'white'} />
                     <Text style={styles.companyName}>
                        Clean Up Crew
                     </Text>
                  </View>

                  <View className='flex-row items-center gap-2 mb-2'>
                     <PhilippinePeso size={20} color={'white'} />
                     <Text className='text-[18px] color-white font-bold'>
                        PHP 40,000 {'-'} 55,000/month
                     </Text>
                  </View>

                  <View className='flex-row items-center gap-2 mb-2'>
                     <MapPin size={20} color={'white'} />
                     <Text style={styles.jobLocation}>
                        Ateneo Ave, Naga City, 4400
                     </Text>
                  </View>

                  <View className="border-b border-gray-300 flex-1 my-5" />

                  <View>
                     <Text style={styles.jobDescription}>
                        The Cleanup Crew Member is responsible for maintaining a clean and safe environment in the Jollibee restaurant. {'\n \n'}
                        This includes cleaning dining areas, restrooms, kitchen spaces, and outdoor areas,
                        ensuring that high standards of hygiene and safety are met throughout the restaurant.
                     </Text>
                  </View>

                  <View className='flex-row items-center justify-evenly mt-5'>
                     <Text style={{fontFamily: 'Lexend-Medium'}} className='p-3 bg-slate-100 rounded-xl color-[#1572DB]'> 
                     80% match for you 
                     </Text>

                     <Text className='color-white'> Tap to view more  
                        <Expand size={18} color={'white'}/> 
                     </Text> 

                  </View>

               </View>

            </Card.Content>
         </Card>
      </View>
   );
}

const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
   },
   imageStyle: {
      width: 50,
      height: 50,
      borderRadius: 25, // full circle
      resizeMode: 'cover',
   },
   postedByText: {
      fontFamily: 'Lexend-Bold',
      color: 'white',
      fontSize: 12,
   },
   card: {
      margin: 10,
      borderRadius: 8,
   },
   companyName: {
      fontSize: 20,
      color: 'white',
      fontFamily: 'Lexend-Bold',
   },
   jobPosition: {
      fontFamily: 'Lexend-Medium',
      fontSize: 18,
      color: 'white'
   },
   jobLocation: {
      fontFamily: 'Lexend-Medium',
      fontSize: 18,
      color: 'white'
   },
   jobDescription: {
      fontSize: 16,
      fontFamily: 'Lexend-Regular',
      color: 'white'
   }
});
