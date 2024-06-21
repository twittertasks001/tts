import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../../util/color';

export const modalStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center",
    },
    input: {
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        width: 350,
        height: 40,
    },
    button: {
        minWidth: Dimensions.get('screen').width * 0.9
    },
    errorText: {
        color: 'red',
        textAlign: `left`,
        marginBottom: 10
    },
    inputError: {
        marginBottom: 0,
        borderColor: COLORS.error
    },
    label: {
        marginBottom: 5,
        fontWeight: `bold`
    },

});