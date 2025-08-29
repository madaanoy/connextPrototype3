import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'

interface AddtoFavoritesProps {
  visible: boolean
  onDismiss: () => void
  onAddToFavorites: () => void
}

export default function AddtoFavorites({ visible, onDismiss, onAddToFavorites }: AddtoFavoritesProps) {
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 12 }}>
        <Text style={{fontFamily: 'Lexend-Bold'}} className='text-center py-2 text-lg mb-4'> Add to favorites? </Text>
        <View className='flex-row justify-between'>
          <TouchableOpacity 
            onPress={onAddToFavorites}
            className='p-3 bg-[#36A832] rounded-lg flex-1 mr-2'
          >
            <Text style={{fontFamily: 'Lexend-Regular'}} className='color-white text-center'> Yes </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onDismiss}
            className='p-3 bg-[#D9D9D9] rounded-lg flex-1 ml-2'
          >
            <Text style={{fontFamily: 'Lexend-Regular'}} className='text-center'> Cancel </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  )
}
