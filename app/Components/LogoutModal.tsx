import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'

interface LogoutModalProps {
  visible: boolean
  onDismiss: () => void
  onLogout: () => void
}

export default function LogoutModal({ visible, onDismiss, onLogout }: LogoutModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 12 }}>
        <View className='px-2'>
          <Text style={{ fontFamily: 'Lexend-Bold' }} className='color-[#1572DB] text-lg mb-2'> Log Out </Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='text-gray-600 mb-4'> Are you sure you want to log out? </Text>
        </View>

        <View className='flex-row justify-between'>
          <TouchableOpacity 
            onPress={onLogout}
            className='p-3 bg-[#6C63FF] rounded-lg flex-1 mr-2'
          >
            <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-white text-center'> Logout </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onDismiss}
            className='p-3 bg-[#D9D9D9] rounded-lg flex-1 ml-2'
          >
            <Text style={{ fontFamily: 'Lexend-Regular' }} className='text-center'> Cancel </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  )
}
