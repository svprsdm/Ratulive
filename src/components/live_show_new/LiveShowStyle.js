import { StyleSheet } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Dimensions } from 'react-native'
const styles = StyleSheet.create({
    // videoContainer: {
    //     flex: 1,
    //     backgroundColor: 'black',
    // },
    // video: {
    //     position: 'absolute',
    //     width:windowWidth,
    //     height:windowHeight,
    //     top: 0,
    //     bottom: 0,
    //     left: 0,
    //     right: 0,
    //     opacity:.6
    // },
    box: {
        backgroundColor: '#a18900',
    },
    disclaimerText: {
        backgroundColor: 'yellow',
        color: 'black',
        padding: 8,
        bottom: 10,
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 12,
        margin: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    liveStreamContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: "5%",
        alignItems: "center",
        position: 'absolute',
        width: '100%'
    },
    giftContainer: {
        backgroundColor: 'rgba(0,0,0,0.9)',
        width: "100%",
        height: "30%",
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        zIndex: 9999,
        // paddingRight: 0,
        paddingBottom: 70,
    },
    giftRowContainer: {
        flexDirection: "row",
        marginBottom: 10,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },
    giftText: {
        // width:150,
        // height:35,
        marginTop: 10,
        marginLeft: "30%",
        backgroundColor: "gold",
        fontWeight: "bold",
        color: "black",
        fontSize: 22,
        borderRadius: 50,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop:2,
    },
    
    headerContainer:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center",
        //  right:110
        right:10
    },
    headerAvtarBadgeContainer: {
        backgroundColor: '#ccc',
        height: 54,
        width: 54,
        zIndex: 1,
        borderRadius: 54 / 2,
        right: -35,
        justifyContent: "center",
        alignItems: "center",
        padding: (1, 1),
    },
    avtarContainer: {
        position: "absolute",
        // backgroundColor:'white',
        // backgroundColor:'white',
    },
    badgeIcon: {
        top: "-45%",
        right: '20%'
    },
    premiumLikeContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        height: 37,
        width: 150,
        justifyContent: "space-evenly",
        alignItems: "center",
        right: -10,
        borderRadius: 50,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
    },
    crownIcon: {
        height: 10,
        width: 18
    },
    premiumCountText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: -25,
    },
    likeIcon: {
        height: 16,
        width: 16,
        top: 1,
        left: -10
    },
    likeCountText: {
        color: '#fff',
        fontSize: 14,
        marginLeft: -35,
    },
    infoContainer: {
        marginTop: '3%',
        // flexDirection:'row',
        justifyContent: "space-between",
        left: 10,
        height: 40,
        width: '100%',
        // margin:'0%',
        // alignSelf:'center',
        // marginRight:25,
        // paddingRight:20,
    },
    subscriberCount: {
        top: '10%',
        left: '50%',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row',
        color: '#fff'
    },
    counterTimerContainer: {
        top: '5%',
        right: '3%',
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    timerText: {
        fontSize: 14,
        letterSpacing: .5,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.6)',
        opacity: 1,
        borderRadius: 11.5,
        padding: (1, 4),
        // height: 23,
        fontWeight: '600',
    },
    avatarImg: {
        marginTop: 2,
        borderColor: 'white',
        borderWidth: 1,
        marginLeft: -15,
    },
    gameMicroContainer: {
        flexDirection: 'row',
        top: '10%',
        left: '2.5%',
    },
    gameContainer: {
        backgroundColor: '#616161',
        borderRadius: 50,
        opacity: .5,
        height: 35,
        width: 35,
        position: "relative",
        marginRight: '2%'
    },
    gameIcon: {
        position: "absolute",
        top: 5,
        left: 7
    },
    microsdContainer: {
        backgroundColor: '#616161',
        borderRadius: 50,
        opacity: .5,
        height: 35,
        width: 35,
        position: "relative"
    },
    microsdIcon: {
        position: "absolute",
        top: 7,
        left: 7
    },
    bottomContainer: {
        flexDirection: 'column',
        right: '2%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        top: '30%',
    },
    bottmUnderContainer: {
        top: '10%',
    },
    sideBarContainer: {
        left: '5%',
    },
    sideLikeIcon: {
        left: '15%',
        height: 51,
        width: 55,
        bottom: '120%',
    },
    sideCameraIcon: {
        right: 8,
        height: 45,
        width: 45,
        bottom: '100%',
    },
    sideGiftIcon: {
        height: 39,
        width: 39,
        right: 5,
        bottom: '90%',
    },
    sideSayIcon: {
        right: '30%',
        height: 30,
        width: 75,
        bottom: '55%',
    },
    sideerrorIcon: {
        height: 30,
        width: 30,
        left: '30%',
    },
    // LiveGift file Style
    gridView: {
        height: "90%",
        left: 0,
        right: 0,
        marginLeft: 0,
        marginRight: 0,
        // paddingRight: 30,
        width: windowWidth
    },
    itemContainer: {
        borderRadius: 5,
        padding: 10,
    },
    giftsIcon: {
        height: 50,
        width: 50,
    },
    giftIconContainer: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1,
    },
    premiumIcon: {
        width: 10,
        height: 10,
        marginTop: 7,
    },
    giftIconnumber: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 12,
        marginTop: 5
    },
    cancelIcon: {
        width: 19,
        height: 19,
    },
    cancelIconTouch: {
        width: 20,
        height: 20,
        marginTop: 20,
        marginLeft: '20%',
    },
    pearlIcon: {
        width: 20,
        height: 20
    },
    /*Modal style */
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: '45%',
        backgroundColor: "rgba(0,0,0,0.95)",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginLeft: 30,
        marginRight: 30
    },
    modalView: {
        margin: 20,
        flexDirection: 'row',
        // justifyContent:'flex-end', 
        // alignItems: 'flex-end'
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: 80,
        margin: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "gold",
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '40%'
    },
    buttonNo: {
        backgroundColor: "grey",
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    textStyle: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        flexDirection: 'column',
        color: 'white'
    },
    endLivebtn: {
        height: 30,
        width: '18%',
        backgroundColor: '#EBB022',
        padding: (10, 4),
        marginRight: '5%',
        top: '0%',
        right: -5,
        borderRadius: 20,
    },
    endliveText: {
        fontSize: 18,
        top: -1,
        left: -3,
        textAlign: 'center',
        color: '#fff',
    }
});
export default styles;
