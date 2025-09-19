import { Image, View, TouchableOpacity, Modal, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Bell, X } from 'lucide-react-native'
import justLogo from '../../assets/images/justLogo.png'
import companyLogo from '../../assets/images/placeholderImage.png'

export default function LogoAndNotif() {
  const [isPressed, setIsPressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Dummy notification data
  const notifications = [
    { id: 1, message: 'Jollibee has opened your application.', time: '2 hours ago', isNew: true },
    { id: 2, message: 'Jollibee has sent you a message.', time: '1 day ago', isNew: true },
  ];

  const handleNotificationPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleViewAll = () => {
    // Handle view all action
    console.log('View all notifications');
    closeModal();
  };

  const handleClearAll = () => {
    // Handle clear all action
    console.log('Clear all notifications');
    closeModal();
  };

  return (
    <>
      <View className='flex-row py-2 px-2 justify-between items-center'>
        <Image source={justLogo} className='w-8 h-8' style={{ resizeMode: 'contain' }} />
        <TouchableOpacity 
          onPress={handleNotificationPress} 
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          className={`relative p-2 rounded-full ${isPressed ? 'bg-indigo-500' : ''}`}
        >
          <Bell 
            size={20} 
            color={isPressed ? '#FFFFFF' : '#000000'}
          />
          {notifications.length > 0 && (
            <View className='absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-indigo-500' />
          )}
        </TouchableOpacity>
      </View>

      {/* Notification Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View className='flex-1 bg-black/50 justify-center items-center px-4'>
          <View className='bg-white rounded-2xl w-full max-w-sm mx-4 overflow-hidden'>
            {/* Header */}
            <View className='flex-row justify-between items-center p-4 border-b border-gray-100'>
              <Text className='text-lg font-semibold text-blue-600'>Notifications</Text>
              <TouchableOpacity onPress={closeModal}>
                <X size={20} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <View className='max-h-80'>
              {notifications.length === 0 ? (
                <View className='p-6 items-center'>
                  <Text className='text-gray-500 text-center'>No new notifications yet.</Text>
                </View>
              ) : (
                <ScrollView className='p-4'>
                  {notifications.map((notification) => (
                    <View key={notification.id} className='flex-row items-start mb-4 last:mb-0'>
                      <View className='w-2 h-2 rounded-full bg-[#6C63FF] mt-2 mr-3' />
                      <View className='flex-row gap-2'>
                        <Image source={companyLogo} className='w-10 h-10 rounded-full'></Image>
                        <Text style={{fontFamily: 'Lexend-Regular'}} className='text-gray-800 text-sm leading-5'>{notification.message}</Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            {/* Footer Buttons */}
            <View className='flex-row p-4 gap-10'>
              <TouchableOpacity 
                onPress={handleViewAll}
                className='flex-1 bg-blue-600 rounded-full py-2 px-4'
              >
                <Text className='text-white text-center font-medium'>View all</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleClearAll}
                className='flex-1 bg-gray-500 rounded-full py-2 px-4'
              >
                <Text className='text-white text-center font-medium'>Clear all</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}