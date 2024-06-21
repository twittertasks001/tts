import { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import playersControlPointsStyle from './playersControlPointsStyles';
import TextInputWrapper from '../../../../components/TextInputWrapper/TextInputWrapper';
import ButtonWrapper from '../../../../components/ButtonWrapper/ButtonWrapper';
import Arrow_left from '../../../../util/icons/arrow_left.png'
import Arrow_right from '../../../../util/icons/arrow_right.png'
import { verifyOpenAd } from '../../../../util/functions/actions';
import { useModal } from '../../../../context/ADContext';
import Modal from '../../../../components/ModalAD/Modal';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
} from '@react-native-admob/admob';
import Trophy from '../../../../util/icons/trophy.png'
import ModalWinner from '../modalWinner/ModalWinner';

const PlayersControlPoints = ({ playerList, addPoint, changeTextPlayer, removePoint, setObjNotification, resetMatch }) => {
  const flatListRef = useRef(null);
  const [listIndex, setListIndex] = useState(0)
  const [modalWinnnerVisible, setModalWinnerVisible] = useState(false)
  const [playerToWin, setPlayerToWin] = useState(null)
  const { openAd } = useModal();
  const interstitial = InterstitialAd.createAd(TestIds.INTERSTITIAL);

  // const interstitial = InterstitialAd.createAd(
  //   Platform.OS === 'ios'
  //     ? 'YOUR_IOS_INTERSTITIALAD_UNIT_ID' // ex) ca-app-pub-6884803621329557/4984547374
  //     : 'YOUR_ANDROID_INTERSTITIALAD_UNIT_ID', // ex) ca-app-pub-6884803621329557/1290798655
  // );

  const handleClickAddPoint = async (item) => {
    const mustOpenAd = await verifyOpenAd()
    if (mustOpenAd) await openAd()
    if (item.value) {
      addPoint(item.id, item.value);
    } else setObjNotification({ visible: true, message: 'Adicione ao menos um ponto..', type: 'error' })
  };

  const handleRemovePoint = async (id) => {
    const mustOpenAd = await verifyOpenAd()
    if (mustOpenAd) await openAd()
    removePoint(id)
  }
  const moveList = (side) => {
    const indexToMove = playerList.length > 2 ? (!side ? (listIndex - 1) : (listIndex + 1)) : (side ? 1 : 0)
    flatListRef.current.scrollToIndex({ animated: true, index: indexToMove })
    setListIndex(side)
  }

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    x >= 392 && x < 600 && playerList.length > 2 && setListIndex(1)
    x <= 0 && setListIndex(0);
  };

  const handleClickConfirmWinner = (player) => {
    setPlayerToWin(player)
    setModalWinnerVisible(true)
  }

  const renderControllerPlayer = ({ item, index }) => {

    const winnerPlayer = item.points.reduce((sum, points) => sum + points, 0) >= parseInt(item.limit_match_points) ? true : false
    return (
      <>
        <View style={playersControlPointsStyle.playerItemContainer}>
          {winnerPlayer
            ?
            <ButtonWrapper
              onPress={() => handleClickConfirmWinner(item)}
              textStyle={playersControlPointsStyle.textWinner}
              style={playersControlPointsStyle.btnWinner}
              children={
                <View style={playersControlPointsStyle.viewButtonWinner}>
                  <Text style={playersControlPointsStyle.textPlayers}>{item.name} - Marcar como vencedor</Text>
                  <Image
                    source={Trophy}
                  />
                </View>}
            />
            :
            <Text style={playersControlPointsStyle.textPlayers}>
              {item.name}
            </Text>
          }

          <TextInputWrapper
            onChangeText={(e) => changeTextPlayer(item.id, e)}
            value={item.value ? item.value : ''}
            keyboardType='numeric'
            style={playersControlPointsStyle.input} />
          <ButtonWrapper
            text='Adicionar ponto'
            onPress={() => handleClickAddPoint(item)}

            textStyle={playersControlPointsStyle.textButton}
            style={playersControlPointsStyle.button} />
          <ButtonWrapper
            text='Remover ultimo ponto'
            onPress={() => handleRemovePoint(item.id)}
            style={[playersControlPointsStyle.button, playersControlPointsStyle.exclusionButton]}
          />
        </View >

      </>
    );
  };

  return (<>
    <View style={playersControlPointsStyle.container}>
      <View style={playersControlPointsStyle.flatListPlayers} >
        <FlatList
          keyboardShouldPersistTaps='handled'
          data={playerList}
          ref={flatListRef}
          renderItem={renderControllerPlayer}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          onEndReached={() => setListIndex(2)}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </View>
    {listIndex !== 0 &&
      <Pressable style={playersControlPointsStyle.arrowLeft} onPress={() => moveList()}>
        <Image
          source={Arrow_left}
        />
      </Pressable>
    }
    {listIndex !== 2 &&
      <Pressable style={playersControlPointsStyle.arrowRight} onPress={() => moveList(1)}>
        <Image
          source={Arrow_right}
        />
      </Pressable>
    }
    <ModalWinner
      onClose={() => setModalWinnerVisible(false)}
      visible={modalWinnnerVisible}
      playerToWin={playerToWin}
      resetMatch={resetMatch}
      setObjNotification={setObjNotification}
    />

  </>
  );
};

export default PlayersControlPoints;
