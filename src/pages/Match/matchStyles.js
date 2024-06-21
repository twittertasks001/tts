import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  playerItemContainer: {
    alignItems: 'center',
    width: windowWidth * 0.5,
  },
  borderTop: {
    borderTopWidth: 2,
    width: '35%',
  },
  totalPoints: {
    textAlign: 'center',
  },
  textPlayers: {
    fontSize: 18,
    fontWeight: `bold`,
    marginBottom: 10,
  },
  textMatchName: {
    textAlign: 'center'
  },


  containerBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
