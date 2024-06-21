import { StyleSheet } from 'react-native';
import { COLORS } from '../../util/color';

export const buttonstyles = StyleSheet.create({
  button: {
    minWidth: '70%',
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});