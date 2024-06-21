import React from 'react';
import { View, Text, Image, Modal, Pressable } from 'react-native';
import IconPlay from '../../../../util/icons/play_movie.png'
import { modalStyles } from './ModalRestartMatchStyles';
import ButtonWrapper from '../../../../components/ButtonWrapper/ButtonWrapper';
import { useModal } from '../../../../context/ADContext';

const ModalRestartMatch = ({
  visible,
  onClose,
  resetMatch,
  closeTooltip
}) => {

  const { openAd } = useModal()
  const handleResetMatch = async () => {
    await openAd()
    //adicionar logica de assistir video antes de resetar 
    resetMatch()
    onClose()
    closeTooltip()
  }

  const renderButtonResetMatch = () => (
    <View style={{ display: 'flex', flexDirection: 'row', gap: 15, }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Sim</Text>
      <Image
        style={modalStyles.iconPlayAd}
        source={IconPlay}
      />
    </View>
  )

  const handleNotResetMatch = () => {
    onClose()
    closeTooltip()
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={modalStyles.modalContainer} onPress={onClose}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>Todos os pontos serão apagados, deseja realmente continuar?</Text>
          <View style={modalStyles.playerButtonContainer}>
            <ButtonWrapper
              children={renderButtonResetMatch()}
              onPress={() => handleResetMatch()}
            />
            <ButtonWrapper
              text='Não'
              style={{ backgroundColor: 'red' }}
              onPress={() => handleNotResetMatch()}
            />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ModalRestartMatch;
