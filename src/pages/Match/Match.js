import React, { useEffect, useState } from 'react';
import { View, BackHandler } from 'react-native';
import matchStyles from './matchStyles';
import { getInfoMatch, resetMatchPoints } from '../../services/match';
import PlayersInfo from './components/PlayersInfo/PlayersInfo';
import PlayersControlPoints from './components/PlayersControlPoints/PlayersControlPoints';
import { deletePoint, inserPoint } from '../../services/points';
import Notification from '../../components/Notification/Notification';

const Match = ({ route, navigation }) => {


  const { getMatches, id_match } = route.params
  const [playerList, setListPlayers] = useState([])
  const [objNotifcation, setObjNotification] = useState({
    visible: false,
    message: '',
    type: ''
  })

  useEffect(() => {
    getMatchInfo()
  }, [])

  const getMatchInfo = async () => {
    const data = await getInfoMatch(id_match)
    data && setListPlayers(data)
  }

  const resetMatch = async () => {
    const reset = await resetMatchPoints(playerList.map(e => (e.id)))
    if (reset) {
      setListPlayers([...playerList.map(player => {
        player.points = [0]
        return player
      })])
      return true
    } else setObjNotification({ message: 'Problema ao apagar pontos', visible: true, type: 'error' })
  }

  const addPoint = async (idPlayer, point) => {
    let insert = await inserPoint(idPlayer, point)
    if (insert) {
      setListPlayers([...playerList.map((player) => {
        if (player.id === idPlayer) {
          player.points.push(parseInt(point))
          player.value = ''
        }
        return player
      })])
      setObjNotification({ message: 'Ponto adicionado com sucesso', visible: true, type: 'success' })
    }
  }

  const verifyIsPossibleRemoveLastPoint = (idPlayer) => {
    const player = playerList.find(player => player.id === idPlayer);
    if (player && player.points.length === 1) {
      if (player.points[0] > 0) {
        return 1;
      } else {
        return 2;
      }
    }
  };
  const removePoint = async (idPlayer) => {
    const situation = verifyIsPossibleRemoveLastPoint(idPlayer)
    let remove
    switch (situation) {
      case 1:
        remove = await deletePoint(idPlayer)
        if (remove) {
          setListPlayers([...playerList.map((player) => {
            if (player.id === idPlayer) player.points = [0]
            return player
          })])
          setObjNotification({ message: 'Ponto removido com sucesso.', visible: true, type: 'success' })
        }
        break;
      case 2:
        setObjNotification({ message: 'Não há pontos para remover', visible: true, type: 'error' })
        break;
      default:
        remove = await deletePoint(idPlayer)
        if (remove) {
          setListPlayers([...playerList.map((player) => {
            if (player.id === idPlayer) player.points.pop()
            return player
          })])
          setObjNotification({ message: 'Ponto removido com sucesso.', visible: true, type: 'success' })
        }
    }
  }

  const changeTextPlayer = (idPlayer, text) => {
    setListPlayers([...playerList.map((player) => {
      if (player.id === idPlayer) player.value = text
      return player
    })])
  }

  return (
    <View style={matchStyles.container}>
      <View style={{ flex: 0.6 }}>
        <PlayersInfo
          getMatchInfo={getMatchInfo}
          resetMatch={resetMatch}
          playerList={playerList}
          getMatches={getMatches} />
      </View>
      <View style={{ flex: 0.4, }}>
        <PlayersControlPoints
          changeTextPlayer={changeTextPlayer}
          addPoint={addPoint}
          removePoint={removePoint}
          resetMatch={resetMatch}
          setObjNotification={(e) => setObjNotification(e)}
          playerList={playerList} />

      </View>

      {objNotifcation.visible && (
        <Notification
          message={objNotifcation.message}
          type={objNotifcation.type}
          duration={1200}
          onDismiss={() => setObjNotification({ ...objNotifcation, visible: false })}
        />
      )}
    </View>
  );
};

export default Match;
