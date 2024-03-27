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
      android: {
      },
    }),
    //marginTop: 40,
    // backgroundColor:'red'
    // position: 'absolute',
  },
  scrollViewStyle: {
    height: 40,
    marginBottom: 5,
    //backgroundColor: '#000000',
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
    height: 30,
    resizeMode: 'contain',
    width: 30,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageTextView: {
    paddingHorizontal: 10,
    height: 30,
    marginTop: deviceWidth / 2 - 70,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  notification: {
    height: 30,
    resizeMode: 'contain',
    width: 30,
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
    fontSize: 18,
    color: '#FFFFFF',
  },
  scrollViewView: {
    height: 70,
    flexDirection: 'row',
    //backgroundColor: 'black',
  },
  background: {
    paddingHorizontal: 20,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 25,
  },
  cardviewStyle: {
    marginLeft: -17,
    marginRight: 18,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 34,
    flexDirection: 'row',
    paddingHorizontal: 9,
    backgroundColor: '#000000',
  },
  colorBlack: {
    color: 'black',
  },
  colorWHite: {
    color: 'white',
  },
  // pentagon: {
  //   backgroundColor: 'transparent'
  // },
  // pentagonInner: {
  //   width: 90,
  //   borderBottomColor: 'red',
  //   borderBottomWidth: 0,
  //   borderLeftColor: 'transparent',
  //   borderLeftWidth: 15,
  //   borderRightColor: 'transparent',
  //   borderRightWidth: 15,
  //   borderTopColor: 'red',
  //   borderTopWidth: 60
  // },
  // pentagonBefore: {
  //   position: 'absolute',
  //   height: 0,
  //   width: 0,
  //   top: -35,
  //   left: 0,
  //   borderStyle: "solid",
  //   borderBottomColor: 'red',
  //   borderBottomWidth: 35,
  //   borderLeftColor: 'transparent',
  //   borderLeftWidth: 45,
  //   borderRightColor: 'transparent',
  //   borderRightWidth: 45,
  //   borderTopWidth: 0,
  //   borderTopColor: 'transparent',
  // },
  rowData: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#666',
    alignItems: 'center',
    borderBottomWidth: 1,
    // height: 80,
    overflow: 'hidden',
    marginBottom: 2,
    marginTop: 2,
    // borderRadius: 40,
    // backgroundColor: 'pink',
    // marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  messageItem: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginRight: 30,
    height: 20,
    width: 24
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 10,
    //width: Dimensions.get('screen').width / 2,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 25,
    alignItems: 'flex-start',
    flex: 3,
    color: '#ffffff',
  },
  leaderList: {
    bottom:30,
    left:60,
    marginLeft:2,
    // alignItems: 'flex-start',
    flex: 3,
  },
  leaderTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 20,
    color: '#ffffff',
  },
  leaderCount: {
    fontSize: 12,
    fontWeight: '400',
    marginLeft: 20,
    color: '#ffffff',
    marginTop: 5,
    left:200,
    bottom:25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent:'flex-end',
    // alignSelf:'flex-end',
    alignItems:'flex-end',
    // flex: 1
    // right:'100%'
  },
  // leaderCount:{
  //   color:'#fff',
  //   marginLeft: 20,
  //   marginTop: 3,
  // },
  leaderCountNumber: {
    color: '#fff',
    // padding: 10,
    // margin:10,
    // position:'absolute'
    fontSize: 13,
    
  },
  leaderIcon: {
    height: 12,
    width: 12,
    // padding:10,
    // right: 10,
    // marginRight: 10
  },
  rightText: {
    flex: 1,
    color: '#ffffff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingVertical: 2,
  },
  list: {
    flex: 1,
    borderRadius: 40,
    borderColor: '#ffffff',
    borderWidth: 0,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: 60,
  },
  list1: {
    flex: 1,
    borderRadius: 20,
    borderColor: '#ffffff',
    borderWidth: 2,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  icon: {
    width: 45,
    height: 45,
    marginLeft: 10,
    borderRadius: 40,
    overflow: 'hidden'
  },
  icon1: {
    width: 58,
    height: 58,
    marginLeft: 10,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: '#FFD700',
    borderWidth: 2
  },
  icon2: {
    width: 53,
    height: 53,
    marginLeft: 10,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: '#DCDCDC',
    borderWidth: 2
  },
  icon3: {
    width: 53,
    height: 53,
    marginLeft: 10,
    borderRadius: 40,
    overflow: 'hidden',
    borderColor: '#BC8F8F',
    borderWidth: 2
  },
  trapezoid1: {
    width: 50,
    height: 0,
    borderBottomWidth: 20,
    borderBottomColor: '#FFD700',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderStyle: 'solid'
  },
  trapezoid2: {
    width: 50,
    height: 10,
    marginLeft: 5,
    borderBottomWidth: 20,
    borderBottomColor: '#DCDCDC',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderStyle: 'solid'
  },
  trapezoid3: {
    width: 50,
    height: 0,
    borderBottomWidth: 20,
    borderBottomColor: '#BC8F8F',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderStyle: 'solid'
  },
  pentagon: {
    backgroundColor: 'transparent'
  },
  pentagonInner: {
    width: 90,
    borderBottomColor: 'red',
    borderBottomWidth: 0,
    borderLeftColor: 'transparent',
    borderLeftWidth: 18,
    borderRightColor: 'transparent',
    borderRightWidth: 18,
    borderTopColor: 'red',
    borderTopWidth: 50
  },
  pentagonBefore: {
    position: 'absolute',
    height: 0,
    width: 0,
    top: -35,
    left: 0,
    borderStyle: 'solid',
    borderBottomColor: 'red',
    borderBottomWidth: 35,
    borderLeftColor: 'transparent',
    borderLeftWidth: 45,
    borderRightColor: 'transparent',
    borderRightWidth: 45,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },
  // rectangle: { width: 18, height: 18, backgroundColor: '#FFD700' },
  // triangle: {
  //   width: 0,
  //   height: 0,
  //   backgroundColor: 'transparent',
  //   borderStyle: 'solid',
  //   borderRightWidth: 18,
  //   borderTopWidth: 18,
  //   borderRightColor: 'transparent',
  //   borderTopColor: '#FFD700',
  //   borderLeftColor: '#FFD700'
  // },
  // triangleCornerBottomLeft: {
  //   transform: [
  //     {rotate: '-180deg'}
  //   ]
  // },
  // triangleCornerBottomRight: {
  //   transform: [
  //     {rotate: '270deg'}
  //   ]
  // },
  // pentagon: {
  //   backgroundColor: 'transparent',
  //   marginTop:30
  // },
  // pentagonInner: {
  //   width: 90,
  //   borderBottomColor: 'white',
  //   borderBottomWidth: 0,
  //   borderLeftColor: 'transparent',
  //   borderLeftWidth: 18,
  //   borderRightColor: 'transparent',
  //   borderRightWidth: 18,
  //   borderTopColor: 'white',
  //   borderTopWidth: 50
  // },
  // pentagonBefore: {
  //   position: 'absolute',
  //   height: 0,
  //   width: 0,
  //   top: -35,
  //   left: 0,
  //   borderStyle: 'solid',
  //   borderBottomColor: 'white',
  //   borderBottomWidth: 35,
  //   borderLeftColor: 'transparent',
  //   borderLeftWidth: 45,
  //   borderRightColor: 'transparent',
  //   borderRightWidth: 45,
  //   borderTopWidth: 0,
  //   borderTopColor: 'transparent',
  // },
  // pentagonImage: {
  //   backgroundSize: '100% 100%',
  //   clipPath: polygon('50% ')
  // },
  rowView: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    height: 70,
    backgroundColor: '#0d0d0d',
    color: '#fff',
  },
  // div {
  //   width: '280px',
  //   height: '280px',
  //   -webkit-clip-path: polygon('50%', '0%', '100%', '38%', '82%', '100%', '18%', '100%', '0%', '38%'),
  //   clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%),
  // }
  tabViewstyle: {
    borderRadius: 30,
    marginLeft: 5,
  },
  textbackground: {
    // fontFamily: fonts.PoppinsRegular,
    fontSize: 15,
  },
  sliderBoxView: {
    height: 100,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    //   backgroundColor:'red'
  },
  flatListView: {
    marginTop: 15,
    // paddingTop:10,
    backgroundColor: '#000',
    // flex: 3,
    paddingBottom: 10,
    borderBottomColor: '#222',
    borderBottomWidth:1,
    height:60,
    marginBottom:5,
  },

  scrollView:{
    // height:60,
  }

});
export default styles;