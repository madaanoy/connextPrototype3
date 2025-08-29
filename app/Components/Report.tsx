import { TextInput, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Modal, Portal } from "react-native-paper";

interface ReportProps {
  visible: boolean
  onDismiss: () => void
  onSendReport: (description: string) => void
}

export default function Report({ visible, onDismiss, onSendReport }: ReportProps) {
  const [description, setDescription] = useState('');

  const handleSend = () => {
    onSendReport(description);
    setDescription('');
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={{ backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 12 }}>
        <View className='py-2 px-2'>
          <Text style={{fontFamily: 'Poppins-Bold'}} className="text-lg mb-2"> What happened? </Text>
          <TextInput
            placeholder="Describe your experience..."
            multiline
            numberOfLines={4}
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 text-base min-h-[100px] mb-4"
            style={{
              fontFamily: "Poppins-Regular",
              textAlignVertical: "top",
            }}
            placeholderTextColor="#9CA3AF"
            value={description}
            onChangeText={setDescription}
          />
        </View>
        <View className="flex-row justify-between">
          <TouchableOpacity 
            onPress={handleSend}
            className="p-3 bg-[#B80E0E] rounded-lg flex-1 mr-2"
          >
            <Text style={{fontFamily: 'Poppins-Regular'}} className="color-white text-center"> Send Report </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onDismiss}
            className="p-3 bg-[#D9D9D9] rounded-lg flex-1 ml-2"
          >
            <Text style={{fontFamily: 'Poppins-Regular'}} className="text-center"> Cancel </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}
