import { StyleSheet, Dimensions } from 'react-native';
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    videoContainerpwd: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    video: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    createPwdcontainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangle: {
        height: 190,
        width: 320,
        borderRadius: 15,
        backgroundColor: 'black',
        position: 'absolute',
        opacity: .8,
    },
    createpwdTextcontainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    createpwdText: {
        color: '#fff',
        fontSize: 22,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    inputContainer: {
        flex: 4,
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#f1c40f',
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 18,
        opacity: .8,
    },
    okbtnContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    gradientOkbtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        width: '80%'
    },
    okButton: {
        width: '80%',
        height: 35,
    },
    okText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
