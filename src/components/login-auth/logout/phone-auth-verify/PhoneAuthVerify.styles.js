import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aaa',
  },
  verifycationCode: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    width: 300,
    height: 45,
  },
  containerImage: {
    flex: 1,
    flexDirection: 'column',
  },
  EnterMessage: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    fontFamily: 'Proxima Nova',
    fontSize: 14,
  },
  verificationView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  ResendOtp: {
    marginTop: 15,
    fontFamily: 'Open Sans',
    fontSize: 18,
    color: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  ResendImage: {
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'column',
  },
  ImageIconStyle: {
    // padding: 10,
    // margin: 5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
});
export default styles;
