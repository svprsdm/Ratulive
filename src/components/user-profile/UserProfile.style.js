import { StyleSheet, Dimensions, Platform } from 'react-native';
const styles = StyleSheet.create({
  cardContainer: {
    flex: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    flex: 10,
    marginTop: 20,
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
    backgroundColor: '#000',
  },
  menuList: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 15,
    backgroundColor: '#000',
  },
  userProfile: {
    //flex: 1,
    flexDirection: 'row',
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
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
    backgroundColor: '#000',
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
    borderBottomColor: '#666',
    borderBottomWidth: 0.2,
    borderTopColor: '#666',
    borderTopWidth: 0.2,
    backgroundColor: '#000',
    paddingBottom: 0,
    marginBottom: 5
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
    marginBottom: 6,
    paddingTop: 6,
    paddingBottom: 5
  },
  menuLink: {
    color: '#fff',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignContent: 'flex-end',
    fontSize: 18,
    flex: 1,
    //marginLeft: Dimensions.get('screen').width / 2,
  },
  tabLabelNumber: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gold',
    paddingBottom: 10,
    fontWeight: 'bold'
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
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   backgroundColor: '#bbded6'
  // },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
});
export default styles;
