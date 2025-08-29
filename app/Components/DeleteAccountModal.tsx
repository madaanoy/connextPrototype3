import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'

interface DeleteAccountModalProps {
  visible: boolean
  onDismiss: () => void
  onDeleteAccount: () => void
}

export default function DeleteAccountModal({ visible, onDismiss, onDeleteAccount }: DeleteAccountModalProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 12 }}>
        <View className='px-2'>
          <Text style={{ fontFamily: 'Lexend-Bold' }} className='color-[#B80E0E] text-lg mb-2'> Delete Account </Text>
          <Text style={{ fontFamily: 'Lexend-Regular' }} className='text-gray-600 mb-4'>
            Are you sure you want to delete your account? 
            {'\n \n'}This action cannot be undone. 
          </Text>
        </View>

        <View className='flex-row justify-between'>
          <TouchableOpacity 
            onPress={onDeleteAccount}
            className='p-3 bg-[#B80E0E] rounded-lg flex-1 mr-2'
          >
            <Text style={{ fontFamily: 'Lexend-Regular' }} className='color-white text-center'> Yes </Text>
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
