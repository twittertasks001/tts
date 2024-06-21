import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../util/color';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    paddingTop: 10
  },
  flatListPlayers: {
    height: '100%'
  },
  playerItemContainer: {
    paddingTop: 10,
    backgroundColor: COLORS.secondBackground,
    alignItems: 'center',
    width: windowWidth,
  },
  textPlayers: {
    fontSize: 18,
    fontWeight: `bold`,
    marginBottom: 5,
  },
  textBtnWinner: {

  },
  input: {
    width: windowWidth * 0.25
  },
  button: {
    fontSize: 12,
    minWidth: windowWidth * 0.5,
    backgroundColor: COLORS.success
  },
  exclusionButton: {
    backgroundColor: COLORS.error
  },
  winnerText: {
    color: COLORS.success
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: 5
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: 5
  },
  btnWinner: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: COLORS.success,
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginVertical: 0,
    paddingVertical: 0,
    paddingHorizontal: 20,
    marginBottom: 15,

  },
  textWinner: {
    fontSize: 12,
  },
  viewButtonWinner: {
    display: "flex",
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 10,
    alignItems: 'center'
  },
});
