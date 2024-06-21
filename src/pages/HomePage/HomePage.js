import React, { useState } from 'react';
import { ImageBackground, View } from 'react-native';

import { homeStyles } from './homeStyles';
import ModalComponent from './components/modalHomePage/ModalHomePage';
import ButtonWrapper from '../../components/ButtonWrapper/ButtonWrapper';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../util/icons/logo.jpg'

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState(2);
  const navigation = useNavigation();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePlayerSelection = (numPlayers) => {
    setSelectedPlayers(numPlayers);
  };

  return (
    <View style={homeStyles.container}>
      {/* <View> */}

      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
        }}
        resizeMode="stretch"
        source={Logo}>

        <ButtonWrapper style={{ marginHorizontal: 30, backgroundColor: 'black' }} onPress={openModal} text="Nova partida" />
        <ButtonWrapper style={{ marginHorizontal: 30, backgroundColor: 'black' }} onPress={() => navigation.navigate('ConsultMatches')} text="Consultar partidas" />

      </ImageBackground>
      {/* </View> */}
      <ModalComponent
        visible={modalVisible}
        onClose={closeModal}
        selectedPlayers={selectedPlayers}
        onPlayerSelection={handlePlayerSelection}
      />
    </View>
  );
};

export default HomePage;
