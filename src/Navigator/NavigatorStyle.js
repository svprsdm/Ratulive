import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {
            x: 2, y: 0
        },
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 10,
        right: 0,
        top: 5,
        left: 5
    },
    acnBtn: {
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#fff'
    }
})