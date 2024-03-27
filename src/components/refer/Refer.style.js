import { StyleSheet, Dimensions, Platform } from 'react-native';
const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        marginBottom: 85,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    popular: {
        flex: 1,
        flexDirection: 'row',
        marginTop: -40,
        marginLeft: 20
    },
    Button: {
        flex: 1,
        marginTop: -90,
        marginLeft: 50,
        marginRight: 50,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
    },
});
export default styles;