import { StyleSheet, View, Text } from 'react-native'
import { Card } from 'react-native-paper';
import React from 'react'

export default function JobPostingCard() {
   return (
      <View>

         <Card style={styles.card}>
            <Card.Content>

               <View className='flex-row'>
                  <Text> Company Profile goes here! </Text>
                  <Text> Posted by: </Text>
               </View>

               <View>
                  <Text style={styles.companyName}> Jollibee </Text>
               </View>

            </Card.Content>
         </Card>

      </View>
   )
}

const styles = StyleSheet.create({
   imageStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
   },
   card: {
      margin: 16,
      borderRadius: 8,
   },
   companyName: {
      fontSize: 18,
      marginTop: 6
   }
});
