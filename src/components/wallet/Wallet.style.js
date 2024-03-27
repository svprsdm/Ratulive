import {StyleSheet, Dimensions, Platform} from 'react-native';
const styles = StyleSheet.create({
    Crowns: {
        flex: 1,
        backgroundColor:'gold',
        borderColor:'#000',
        borderWidth:20, 
        marginBottom:125,
        marginTop:20,
    },
    container: {
        flex: 1,
        backgroundColor:'#000'
    },

    cardContainer: {
        backgroundColor: "#FFD700",
        marginBottom: 80,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        paddingBottom:25,
        opacity:1
    },


    leftContainer: {
        flex: 10,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 40,
    },
    
    rightContainer: {
        flex: 1,
        marginTop: 30,
        marginRight: 10,
        justifyContent: 'flex-start',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
    },

    popular: {
        flex: 2,
        marginTop:-50,
    },

})
export default styles;