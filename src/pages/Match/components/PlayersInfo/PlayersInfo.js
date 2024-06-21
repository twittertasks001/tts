import { View, Text, FlatList, Pressable, Image } from 'react-native';
import matchStyles from './playersInfoStyles';
import Match_info from '../../../../util/icons/info_match.png'
import Arrow_left from '../../../../util/icons/arrow_left.png'
import Arrow_right from '../../../../util/icons/arrow_right.png'
import { TouchableOpacity } from 'react-native';
import ButtonWrapper from '../../../../components/ButtonWrapper/ButtonWrapper';
import { useRef, useState } from 'react';
import ModalRestartMatch from '../modalRestartMatch/ModalRestartMatch';
import ModalHistory from '../modalHistory/ModalHistory';
import { historyPerMatch } from '../../../../services/match';
import ModailInfoEdit from '../modalEditInfos/ModalEditInfos';

const PlayersInfo = ({ playerList, resetMatch, getMatchInfo, getMatches }) => {

  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [modalRestartMatchVisible, setModalRestartMatchVisible] = useState(false)
  const [infosToEdit, setInfosToEdit] = useState([])
  const [modalHistoryVisible, setModalHistoryVisible] = useState(false)
  const [modalEditInfos, setModalEditInfos] = useState(false)
  const [listHistory, setListHistory] = useState([])
  const [listIndex, setListIndex] = useState(0)
  const flatListRef = useRef(null);

  const renderPlayerItem = ({ item }) => {
    const totalPoints = item.points.reduce((sum, points) => sum + points, 0);

    return (
      <>
        <View style={matchStyles.playerItemContainer}>
          <Text style={matchStyles.textPlayers}>{item.name}</Text>
          <FlatList
            data={item.points}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
          <View style={matchStyles.borderTop} />
          <Text style={matchStyles.totalPoints}>{totalPoints}</Text>
        </View>
      </>
    );
  };

  const moveList = (side) => {
    flatListRef.current.scrollToIndex({ animated: true, index: side })
    setListIndex(side)
  }
  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    x <= 0 && setListIndex(0);

  }

  const handleGetHistory = async () => {
    const data = await historyPerMatch(playerList[0].id_match)
    data.length > 0 && setListHistory(data)
    data.length > 0 && setModalHistoryVisible(true)
  }

  const handleEditInfos = async () => {
    let infos = {}
    playerList.map(e => {
      if (!infos.limit_match_points) {
        infos = {
          limit_match_points: e.limit_match_points,
          id_match: e.id_match,
          match_name: e.match_name,
          players: [{ idPlayer: e.id, name: e.name }]
        }
      } else infos.players.push({ idPlayer: e.id, name: e.name })
    })
    setInfosToEdit(infos)
    setModalEditInfos(true)

  }

  return (
    <>
      {/* <Pressable onPress={() => tooltipVisible && setTooltipVisible(false)}> */}
      <View style={matchStyles.container} >
        <View style={matchStyles.flatListPlayers} >
          <View style={matchStyles.viewMatchName}>
            <Text style={[matchStyles.textPlayers, matchStyles.textMatchName]}>
              {playerList.length > 0 && playerList[0].match_name}
            </Text>
            <TouchableOpacity onPress={() => setTooltipVisible(!tooltipVisible)}>
              <Image
                style={matchStyles.icon_info_match}
                source={Match_info}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={playerList}
            renderItem={renderPlayerItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            contentContainerStyle={{ flexGrow: 1 }}
            ref={flatListRef}
            onEndReached={(e) => setListIndex(2)}
            onScroll={handleScroll}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }} // Percentual mínimo para considerar um item como visível
          />
          {
            playerList.length > 2 &&
            <>
              {listIndex !== 0 &&
                <Pressable style={matchStyles.arrowLeft} onPress={() => moveList(0)}>
                  <Image
                    source={Arrow_left}
                  />
                </Pressable>
              }
              {listIndex !== 2 &&
                <Pressable style={matchStyles.arrowRight} onPress={() => moveList(2)}>
                  <Image
                    source={Arrow_right}
                  />
                </Pressable>
              }
            </>
          }
        </View>
        <ModalRestartMatch
          resetMatch={resetMatch}
          visible={modalRestartMatchVisible}
          onClose={() => setModalRestartMatchVisible(false)}
          closeTooltip={() => setTooltipVisible(false)}
        />
      </View>
      {/* </Pressable> */}
      {tooltipVisible &&
        <Pressable style={matchStyles.viewBackgroundTooltip} onPress={() => setTooltipVisible(false)} android_disableSound>
          <View style={matchStyles.tooltip}>
            <Text>Limite de pontos: {playerList.length > 0 && playerList[0].limit_match_points}</Text>
            <ButtonWrapper
              text='Recomeçar partida'
              onPress={() => setModalRestartMatchVisible(true)}
              textStyle={matchStyles.textButton}
              style={matchStyles.button}
            />
            <ButtonWrapper
              text='Visualizar histórico'
              onPress={() => handleGetHistory()}
              textStyle={matchStyles.textButton}
              style={matchStyles.button}
            />
            <ButtonWrapper
              text='Editar informações'
              onPress={() => handleEditInfos()}
              textStyle={matchStyles.textButton}
              style={matchStyles.button}
            />
          </View>
        </Pressable>
      }
      <ModalHistory
        listHistory={listHistory}
        onClose={() => setModalHistoryVisible(false)}
        visible={modalHistoryVisible}
        playerList={playerList}
      />
      <ModailInfoEdit
        getMatches={getMatches}
        getMatchInfo={getMatchInfo}
        visible={modalEditInfos}
        onClose={() => setModalEditInfos(false)}
        infos={infosToEdit}
        closeTooltip={() => setTooltipVisible(false)}
      />
    </>

  );
};

export default PlayersInfo;
