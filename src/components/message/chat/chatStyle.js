import { StyleSheet, Platform, Dimensions } from 'react-native';
// const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    TopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        ...Platform.select({
            ios: {
                marginTop: 40,
            },
            android: {
            },
        }),
    },
    chatList: {
        paddingTop: 15,
        backgroundColor: 'black'
    },
    leftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 10,
    },
    rightContainer: {
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    OnLine: {
        width: 10,
        height: 10,
        borderRadius: 40,
        backgroundColor: '#008000',
    },
    Chats: {
        width: 28,
        height: 28,
        borderRadius: 40,
        backgroundColor: '#DC143C',
    },
    search: {
        height: 28,
        resizeMode: 'contain',
        width: 28,
        marginLeft: 0,
        marginRight: 20,
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    more: {
        height: 25,
        resizeMode: 'contain',
        width: 20,
        marginLeft: 20,
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
    },
    logo: {
        height: 60,
        resizeMode: 'contain',
        width: 45,
        // justifyContent: 'flex-start',
        // alignContent: 'flex-start',
        // alignItems: 'flex-start',
    },
    logo2: {
        height: 30,
        resizeMode: 'contain',
        width: 30,
        // justifyContent: 'flex-start',
        // alignContent: 'flex-start',
        // alignItems: 'flex-start',
        top: -15,
        right: -10
    },
    rowData: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        height: 70,
        overflow: 'hidden',
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: '#000',
        paddingLeft: 10
    },
    skip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 10,
        textAlign: 'right',
        fontSize: 18,
        color: '#FFFFFF',
    },
    menuText: {
        fontSize: 18,
        fontWeight: '400',
        marginLeft: 10,
        alignItems: 'flex-start',
        flex: 3,
        color: '#ffffff',
    },
    menuTextEnd: {
        fontSize: 14,
        fontWeight: '400',
        marginRight: 10,
        alignItems: 'flex-end',
        flex: 3,
        color: '#ffffff',
    },
    menuText1: {
        fontSize: 18,
        fontWeight: '400',
        marginLeft: 25,
        alignItems: 'flex-start',
        flex: 3,
        color: '#C0C0C0',
    },
    message: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 10,
        alignItems: 'flex-start',
        flex: 3,
        color: '#ffffff',
        marginBottom: 0,
    },
})
export default styles;