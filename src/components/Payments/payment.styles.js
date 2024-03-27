import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    textAlign: 'center',
  },
  text: {
    color: '#fff',
  },
  normalText: {
    fontSize: 19,
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 19,
    marginBottom: 15,
    marginTop: 10,
    color: 'red',
    textAlign: 'center',
  },
  successText: {
    fontSize: 19,
    marginBottom: 15,
    marginTop: 10,
    color: 'green',
    textAlign: 'center',
  },
});
export default styles;
