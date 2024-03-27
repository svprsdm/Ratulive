import {StyleSheet, Dimensions, Platform} from 'react-native';
const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
    Crowns: {
        flex: 1,
        backgroundColor:'gold',
        borderColor:'#000',
        borderWidth:20, 
        marginBottom:125,
        marginTop:20,
    },
    container: {
        width:'100%',
        flex:1,
        backgroundColor:'#000',
        flexDirection:'column', 
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

    input: {
        height: 45,
        width: '85%',
        margin: 12,
        borderWidth: 1,
        borderColor: '#f9f9f9',
        borderRadius: 5,
        color: '#fff',
        padding:12,
        fontSize:12,
        textAlign: 'left'

      },
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
        marginLeft: 5,
        marginRight: 5,
        top: 20,
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        flexDirection: 'column',
        color: 'white'
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

})
export default styles;