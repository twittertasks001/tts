import React from 'react';
import { View, Text, Image, Modal, Pressable } from 'react-native';
import IconPlay from '../../../../util/icons/play_movie.png'
import { modalStyles } from './ModalWinnerStyles';
import ButtonWrapper from '../../../../components/ButtonWrapper/ButtonWrapper';
import { useModal } from '../../../../context/ADContext';
import { insertInHistory } from '../../../../services/match';

const ModalWinner = ({
  visible,
  onClose,
  resetMatch,
  playerToWin,
  setObjNotification
}) => {
  const { openAd } = useModal()
  const handleConfirmWinner = async () => {
    if (await resetMatch()) {
      await openAd()
      //adicionar logica de assistir video antes de resetar 
      await insertInHistory(playerToWin.id_match, playerToWin.id)
      onClose()
    } else {
      onClose()
      setObjNotification({ message: 'Problema ao apagar pontos', visible: true, type: 'error' })
    }
  }

  const renderButtonConfirmWinner = () => (
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
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={modalStyles.modalContainer} onPress={onClose}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>Confirma a vitória de
            <Text style={modalStyles.textNamePlayer}>

              {playerToWin && ` ${playerToWin.name}`}?</Text>
          </Text>
          <View style={modalStyles.playerButtonContainer}>
            <ButtonWrapper
              children={renderButtonConfirmWinner()}
              onPress={() => handleConfirmWinner()}
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

export default ModalWinner;
