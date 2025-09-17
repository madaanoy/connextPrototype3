import { StyleSheet, Image, View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Bell } from 'lucide-react-native'
import justLogo from '../../assets/images/justLogo.png'

export default function LogoAndNotif() {
  // Dummy notification data
  const notifications = [
    { id: 1, message: 'New job match available!', time: '2 hours ago' },
    { id: 2, message: 'Your application was viewed by an employer.', time: '1 day ago' },
    { id: 3, message: 'Reminder: Update your profile for better matches.', time: '3 days ago' },
  ];

  const handleNotificationPress = () => {
    if (notifications.length === 0) {
      Alert.alert('Notifications', 'No new notifications at this time.');
    } else {
      const notificationText = notifications.map(notif => `${notif.message} (${notif.time})`).join('\n\n');
      Alert.alert('Notifications', notificationText);
    }
  };

  return (
   <View className='flex-row py-2 px-2 justify-between items-center'>
      <Image source={justLogo} style={style.logo}></Image>
      <TouchableOpacity onPress={handleNotificationPress} style={style.notificationContainer}>
        <Bell size={20}></Bell>
        {notifications.length > 0 && <View style={style.badge}></View>}
      </TouchableOpacity>
   </View>
  )
}

const style = StyleSheet.create({
   logo: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
   },
   notificationContainer: {
      position: 'relative',
   },
   badge: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#6C63FF',
   },
})
