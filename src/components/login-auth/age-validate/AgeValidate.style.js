import { StyleSheet, Platform } from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    marginRight: 20,
    textAlign: 'right',
    fontFamily: 'Helvetica Neue',
    fontSize: 18,
    color: '#FFFFFF',
  },
  logo: {
    height: 192,
    width: 192,
    position: 'absolute',
    top: 100,
    left: screenWidth - 275,
    margin: 'auto'
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  TopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 40,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    top: 0,
    bottom: 0,
    height: screenHeight + 500,
  },
  signInButton: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
  },
  dateTimePicker: {
    ...Platform.select({
      ios: {
        width: '100%',
        backgroundColor: 'white',
      },
      android: {},
    }),
  },
  containerImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 18,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 350,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    zIndex: 99999
    // background: 'linear-gradient(#fcee10 0%, #cb8529 29%, #ffe600 49%, #c97e29 69%, #fced00 100%)'
  },
  buttonHeading: {
    marginBottom: 0,
    fontSize: 21,
    fontWeight: 'bold',
    color: '#fff',
    top: -100,
  },
  buttonSubHeading: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#fff',
    marginBottom: 0,
    top: -85,
  },
  buttonTextWhite: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#504f4f',
  },
  buttonSignup: {
    fontSize: 12,
  },
  bottomBox: {
    flex: 1,
    width: '100%',
    height: 350,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButton: {
    marginTop: 20,
    backgroundColor: '#577fc1',
    borderColor: '#4b91e0',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonMobile: {
    marginTop: 20,
    marginBottom: 10,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#f1db5c',
    borderColor: '#F6820D',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
  },
  gradBtn: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredViewwallet:{
    alignItems: "center",
    marginTop: '85%',
    backgroundColor: "#e7bf11",
    borderRadius: 5,        
    marginLeft: 40,
    marginRight: 40
  },
  modalView: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //paddingHorizontal: 16,
    //marginTop: 16,
  },
  modalView: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //paddingHorizontal: 16,
    //marginTop: 16,
  },
  modalText: {
    marginBottom: 2,
    //textAlign: "center",
    //flexDirection: 'column',
    fontWeight: "bold",
    color: '#FF0000'
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonClose: {
    backgroundColor: "black",  
    borderRadius: 15,
    color: '#fff', 
    padding: 3, 
    margin: 3,  
    width: '30%'
  },
});
export default styles;
