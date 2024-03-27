import { StyleSheet, TextComponent } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#171717',
    },
    textColor: {
        color: '#fff',
    },
    menuText: {
        fontSize: 18,
        fontWeight: '400',
        marginLeft: 20,
        alignItems: 'flex-start',
        flex: 3,
        color: '#ffffff',
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
        marginBottom: 2,
        marginTop: 2,
        backgroundColor: '#171717'
    }
})
export default styles;