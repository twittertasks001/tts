import { View, Text, Modal, } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { modalStyles } from './ModalHistoryStyles';

const ModalHistory = ({
  visible,
  onClose,
  listHistory,
  playerList
}) => {

  const renderFlatList = ({ item, index }) => {
    return (
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{index + 1}ª partida - {item.player_name}</Text>

    )
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={modalStyles.viewMatchName}>
        <Text style={{ textAlign: 'center' }}>{playerList.length > 0 && playerList[0].match_name} - HISTÓRICO</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={listHistory}
          renderItem={renderFlatList}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </Modal>
  );
};

export default ModalHistory;
