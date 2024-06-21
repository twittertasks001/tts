import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../../../util/color';
const screenHeight = Dimensions.get(`screen`).height

export const cardMatchStyles = StyleSheet.create({

  containerCard: {
    height: screenHeight * 0.1,
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 10,
    paddingTop: 2,
    paddingHorizontal: 10,
    gap: 5,
    marginVertical:10
  },
  text: {
    color: COLORS.text,
    fontSize: 12
  },
  textMatchName: {
    fontSize: 15,
    textAlign: `center`,

  }
});
