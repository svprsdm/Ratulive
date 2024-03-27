import { StyleSheet, Platform, Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
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
    ...Platform.select({
      ios: {
        marginTop: 40,
      },
      android: {},
    }),
    //marginTop: 40,
    // backgroundColor:'red'
    // position: 'absolute',
  },
  activeBackground: {
    backgroundColor: '#E0B037',
  },
  blackBackground: {
    backgroundColor: '#E0B037',
  },
  // leftContainer: {
  //   // flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   marginLeft: 10,
  // },
  leftContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 10,
  },
  logo: {
    height: 60,
    resizeMode: 'contain',
    width: 45,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  marker: {
    height: 20,
    resizeMode: 'contain',
    width: 20,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    tintColor: 'red',
  },
  imageTextView: {
    // paddingHorizontal: 10,
    height: 30,
    marginTop: deviceWidth / 2 - 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notification: {
    height: 24,
    // resizeMode: 'contain',
    width: 24,
    marginLeft: 20,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rightContainer: {
    // flex: 1,
    // backgroundColor:'green',
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    // flex: 1,
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginLeft: 10,
    textAlign: 'right',
    // fontFamily: 'Helvetica Neue',
    fontSize: 12,
    color: '#FFFFFF',
  },
  background: {
    paddingHorizontal: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 25,
  },
  filterView: {
    height: 35,
    // width:'100%',
    // flex: 1,
    justifyContent: 'center',
    display: 'flex',
    width: deviceWidth,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    // backgroundColor: 'black',
    // borderWidth: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
  },
  scrollViewStyle: {
    // height: 40,
    // marginBottom: 5,
    // backgroundColor: 'green',
    width: deviceWidth,
  },
  scrollViewView: {
    // height: 70,
    // flexDirection: 'row',
    // flex: 1,
    // backgroundColor: 'transparent',
    // width:'100%',
    // backgroundColor:'blue'
  },
  cardviewStyle: {
    // marginLeft: -20,
    // marginRight: 20,
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    // height: 34,
    flexDirection: 'row',
    width: '100%',
    // paddingHorizontal: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  colorBlack: {
    color: 'black',
  },
  colorWHite: {
    color: 'white',
  },
  tabViewstyle: {
    borderRadius: 30,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  textbackground: {
    // fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    backgroundColor: 'transparent',
  },
  sliderBoxView: {
    height: 100,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    // backgroundColor:'red'
  },
  flatListView: {
    // marginTop: 20,
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  flatListStyle: {
    top: 10,
    marginBottom: 40,
  },
  flatListImageView: {
    backgroundColor: '#000',
    width: deviceWidth / 2 - 15,
    margin: 5,
    borderRadius: 50,
  },
  flatlistImage: {
    alignSelf: 'center',
    // position:'absolute',
    width: '100%',
    height: deviceWidth / 2 - 10,
    borderRadius: 50,
  },
  liveImage: {
    width: 45,
    height: 20,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 50,
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
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 5,
    width: '100%'
    // borderRadius: 10,
    // bottom: 5
  }
});
export default styles;
