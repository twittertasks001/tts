import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../util/color';

export const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.backGroundModal,
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    playerButtonContainer: {
        gap: 25,
        alignItems: `center`,
    },
    playerButton: {
        marginVertical: 0,
        marginHorizontal: 5,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
    },
    playerButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    playerButtonSelected: {
        backgroundColor: 'red',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        borderRadius: 15,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});