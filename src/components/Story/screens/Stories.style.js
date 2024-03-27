import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 15,
  },
  circle: {
    width: 50,
    margin: 4,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    //borderColor: '#fff',
  },
  circlee: {
    width: 50,
    margin: 4,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    //borderColor: '#fff',
  },
  modal: {
    flex: 1,
    backgroundColor: '#000'
  },
  title: {
    fontSize: 15, textAlign: 'center',
    color: '#fff', marginLeft: '5%', marginTop: '5%'
  },
  title2: {
    fontSize: 15, textAlign: 'center',
    color: '#fff', marginLeft: '5%', marginTop: '5%'
  },
  actionButtonIcon: {
    fontSize: 24,
    height: 24,
    color: 'white',
  },
});
export default styles;