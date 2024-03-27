import {StyleSheet, Platform} from 'react-native';
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
    //marginTop: 40,
    // backgroundColor:'red'
    // position: 'absolute',
  },
  scrollViewStyle: {
    height: 40,
    marginBottom: 5,
    //backgroundColor: '#000000',
  },
  leftContainer: {
    // flex: 1,

    flexDirection: 'row',
    justifyContent: 'flex-start',
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
  rightContainer: {
    // flex: 1,
    // backgroundColor:'green',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skip: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 20,
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
    marginLeft: -20,
    marginRight: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 34,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#000000',
  },
  colorBlack: {
    color: 'black',
  },
  colorWHite: {
    color: 'white',
  },

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
});
export default styles;
