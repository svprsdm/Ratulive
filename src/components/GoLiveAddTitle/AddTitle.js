import React, { Component, useState } from 'react';
import {
  Platform,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
  Image,
  PermissionsAndroid,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Congrats from '../Congrats/Congrats';
// const AddTitle = () => {
const AddTitle = (props) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    title: '',
    sessionType: '',
  });
  let makeCongrats = (data) => {
    if (data === true) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const handleOkPress = () => {
    props.handleJoin();
  };
  return (
    <ImageBackground
      source={require('../../../assets/icons/pic.jpg')}
      style={{ height: '100%', width: '100%', flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
        console.log('dismiss keyboard')
      }}>
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
        <View
          style={{
            bottom: 0,
            position: 'relative',
            width: '100%',
            height: '85%',
            alignItems: 'center',
          }}>
          {/* <Stream user={auth?.user} streamType="publish" /> */}
          <Image
            source={require('../../../assets/icons/avt.jpg')}
            style={{
              height: 120,
              width: 120,
              padding: 10,
              borderRadius: 70,
              borderColor: '#FFD949',
              borderWidth: 3,
            }}
          />
          <TextInput
            style={{
              height: 50,
              marginTop: '3%',
              borderWidth: 1,
              width: '80%',
              borderRadius: 5,
              borderColor: '#FFD949',
              backgroundColor: 'rgba(0,0,0,0.8)',
              paddingLeft: 25,
              color: '#fff'
            }}
            placeholder="Add Title"
            placeholderTextColor="white"
            onChangeText={(text) => props.onChangeText(text)}
          />
          <View style={{ width: '85%', color: '#fff' }}>
            <DropDownPicker
              placeholder="Session Type"
              items={[
                { label: 'Pay Per Session', value: 'payperssion' },
                { label: 'Pay Per Session', value: 'payperminute' },
                { label: 'Use Password', value: 'passworduse' },
              ]}
              labelStyle={{
                color: '#fff',
                padding: 10,
              }}
              defaultIndex={0}
              containerStyle={{
                height: 70,
                marginTop: 10,
                padding: 10,
                alignItems: 'center',
              }}
              style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: 70,
                borderColor: '#FFD949',
              }}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                marginTop: 10,
                borderColor: '#FFD949',
              }}
              onChangeItem={(item) =>
                setSelectedItem({ ...selectedItem, sessionType: item.value })
              }
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 130,
            }}>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              style={{
                backgroundColor: '#EBB022',
                width: '50%',
                height: 50,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 20 }}>OK</Text>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', top: '50%' }}>
            <Congrats
              congrats={makeCongrats}
              visible={isVisible}
              selectedItem={selectedItem}
              handleOkPress={handleOkPress}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5%',
  },
  cameraIcon: {
    height: 80,
    width: 80,
  },
  cancelIcongolive: {
    height: 20,
    width: 20,
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
export default AddTitle;
