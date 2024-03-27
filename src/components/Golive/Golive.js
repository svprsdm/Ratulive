import React, { PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Golive = (props) => {
  const navigation = useNavigation();
  const dashboard = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Image
          source={require('../../../assets/icons/R.png')}
          style={styles.ricongolive}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Live')}>
          <Image
            source={require('../../../assets/icons/cancel.png')}
            style={styles.cancelIcongolive}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.cameraConatiner}>
        <TouchableOpacity onPress={() => navigation.navigate('GoLiveAddTitle')}>
          <Image
            source={require('../../../assets/ratu_icons/camera.png')}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
        <Text style={styles.cameraText}>Click on Camera to start</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#000',
    width: windowWidth,
    height: windowHeight,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5%',
  },
  cameraIcon: {
    height: 100,
    width: 100,
  },
  cancelIcongolive: {
    height: 30,
    width: 30,
  },
  cameraText: {
    marginTop: '3%',
    fontSize: 20,
    color: 'white',
  },
  cameraConatiner: {
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Golive;
