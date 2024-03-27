import { StyleSheet, Dimensions, Platform } from 'react-native';
const styles = StyleSheet.create({
  cardContainer: {
    flex: 3,
  },
  container: {
    flex: 1,
  },
  editIcon: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    width: 30,
    height: 30,
  },
  leftContainer: {
    //width: Dimensions.get('screen').width / 1.2,
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
  },
  rightContainer: {
    flex: 1,
    marginTop: 30,
    marginRight: 10,
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  menuList: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 30,
    backgroundColor: '#171717',
  },
  userProfile: {
    //flex: 1,
    flexDirection: 'row',
    paddingBottom: 10
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 25,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 25,
    marginLeft: 10,
  },
  headerContainer: {
    //flex: 3,
    alignItems: 'center',
    paddingBottom: 10,
    //marginTop: 10,
    //paddingTop: 10,
  },
  indicatorTab: {
    backgroundColor: 'transparent',
  },
  sceneContainer: {
    marginTop: 10,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#000000',
  },
  popular: {
    flex: 1,
    borderBottomColor: '#ffffff',
    borderBottomWidth: 0.2,
    borderTopColor: '#ffffff',
    borderTopWidth: 0.2,
    backgroundColor: '#171717',
  },
  tabContainer: {
    flex: 1,
    //marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //borderBottomColor: '#ffffff',
    borderBottomWidth: 0.2,
    borderTopColor: '#ffffff',
    borderTopWidth: 0.2,
  },
  tabLabel: {
    fontSize: 18,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 10,
    paddingTop: 10,
  },
  menuLink: {
    color: 'gold',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignContent: 'flex-end',
    fontSize: 18,
    flex: 1,
    //marginLeft: Dimensions.get('screen').width / 2,
  },
  tabLabelNumber: {
    //color: 'gray',
    fontSize: 18,
    textAlign: 'center',
    color: 'gold',
    // paddingBottom: 5,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'left',
    marginLeft: 40,
    flex: 4,
  },
  tabLabelText: {
    color: 'black',
    fontSize: 22.5,
    fontWeight: '600',
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 5,
  },
  userBioText: {
    color: 'white',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userCrown: {
    marginTop: 10,
    height: 70,
    width: 90,
  },
  userImage: {
    borderRadius: 60,
    height: 60,
    marginBottom: 5,
    width: 60,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  profileCrown: {
    width: 55, height: 32, position: 'relative', zIndex: 0, top: 6
  },
  agentModal: {
    backgroundColor: 'rgba(0,0,0,1)',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#fff',
  },
  new: {
    marginLeft: 6,
    marginTop: 5,
    color: '#fff',
  },
  radbtn: {
    marginLeft: 20,
  },
  fixToText: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'right',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 15,
    backgroundColor: 'yellow',
    color: '#000'
  },
  // separator: {
  //   marginVertical: 8,
  //   borderBottomColor: '#737373',
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  // },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonTitleSearch: {
    color: '#000'
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
    bottom: 80,
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
});
export default styles;
