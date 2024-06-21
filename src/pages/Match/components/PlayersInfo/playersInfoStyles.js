import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../util/color';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    paddingTop: 10,
    zIndex: 2
  },
  flatListPlayers: {
    height: '100%'
  },
  playerItemContainer: {
    alignItems: 'center',
    zIndex: 2,
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
    textAlign: 'center',
    flex: 0.95
  },
  limit_points: {
    marginLeft: 20
  },
  icon_info_match: {
    width: 24,
    height: 24
  },
  viewMatchName: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: COLORS.primary,
    zIndex: 100,
    borderBottomWidth: 2,
    marginBottom: 10
  },
  button: {
    fontSize: 12,
    minWidth: 50,
  },
  textButton: {
    fontSize: 10,
    alignItems: 'center',
    verticalAlign: 'middle'
  },
  viewBackgroundTooltip:{
    backgroundColor:'transparent',
    width:'100%',
    height:'100%',
    position:'absolute',
    zIndex:25
  },
  tooltip: {
    backgroundColor: 'white',
    padding: 10,
    zIndex: 252,
    borderRadius: 5,
    right: 10,
    top: 35,
    position: 'absolute',

  },
  arrowLeft: {
    position: 'absolute',
    top: windowWidth * 0.5,
    left: 5
  },
  arrowRight: {
    position: 'absolute',
    top: windowWidth * 0.5,
    right: 5
  },
});
