import { StyleSheet } from 'react-native';

export const notificationStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 50,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex:3002
  },
  viewCenter: {
    position: 'absolute',
    top: 15,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#fff',
  },
  progress: {
    height: '100%',
    backgroundColor: '#000',
  },
});

