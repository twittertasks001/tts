import { Dimensions, StyleSheet } from 'react-native';
const widthScreen = Dimensions.get('screen').width

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    // padding:25,
  },
  button: {
    width: widthScreen * 0.55,
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    borderRadius: 15,
    backgroundColor: '#ddd',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});