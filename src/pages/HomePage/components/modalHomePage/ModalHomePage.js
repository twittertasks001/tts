import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { modalStyles } from './modalHomePageStyles';
import ButtonWrapper from '../../../../components/ButtonWrapper/ButtonWrapper';

const ModalComponent = ({
  visible,
  onClose,
  selectedPlayers,
  onPlayerSelection,
}) => {
  const navigation = useNavigation();

  const handlePlayerSelection = (numPlayers) => {
    onPlayerSelection(numPlayers);
    onClose()
    navigation.navigate("FormNewMatch", { selectedPlayers: numPlayers });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <Pressable style={modalStyles.modalContainer} onPress={onClose}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>Selecione o número de jogadores:</Text>
          <View style={modalStyles.playerButtonContainer}>
            <ButtonWrapper
              style={modalStyles.playerButton}
              text='2 jogadores / Duplas'
              onPress={() => handlePlayerSelection(2)}
            />
            <ButtonWrapper
              text='3 jogadores'
              style={modalStyles.playerButton}
              onPress={() => handlePlayerSelection(3)}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalComponent;
