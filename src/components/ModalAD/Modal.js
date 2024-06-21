import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity } from 'react-native';

const Modal = ({ isVisible, onClose, children }) => {
  return (
    <RNModal
      transparent
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: 300 }}>
          <Text style={{ marginBottom: 10, fontSize: 18, fontWeight: 'bold' }}>Título do Modal</Text>
          {children}
          <TouchableOpacity onPress={onClose} style={{ marginTop: 20, padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Fechar Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
