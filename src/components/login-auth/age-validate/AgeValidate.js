/* eslint-disable no-alert */
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
  Text,  
  Modal,
} from 'react-native';
import users from '../../../storage/storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './AgeValidate.style';
import auth from '@react-native-firebase/auth';
import { Profile } from '../../../components';
import CustomFields from './CustomFields';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
import EditProfile from '../../editProfile/EditProfile';
const DOB = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [age, setAge] = useState(0);
  const [modalVisibleAgeLimit, setModalVisibleAgeLimit] = React.useState(false);
  const [image, setImage] = useState(CustomFields.variables.imageUrl); // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const formattedDatee = moment(selectedDate).format('DD-MM-YYYY');
    console.log(formattedDate);
    const years = moment().diff(formattedDate, 'years', false);
    //const RandomNumber= (Math.floor(Math.random() * 1000000) + 1) ;
    const RandomNumber = Math.floor(Math.random() * 1000000) + 1;
    console.log(years);
    validateAge(years);
    console.log(age);
    users.push(years);
    users.push(formattedDatee);
    users.push(RandomNumber);
  };
  // Handle user state changes
  const validateAge = (years) => {
    if (years > 18) {
      setAge(years);
      setShow(false);
      navigation.navigate('Login', { age: years });
    } else {
      setModalVisibleAgeLimit(true);
    }
  };
  const showMode = (currentMode) => {
    if (show == false) {
      setShow(true);
      setMode(currentMode);
    } else {
      setShow(false);
      setMode(currentMode);
    }
  };
  const showDatepicker = () => {
    showMode('date');
  };
  return (
    <View style={styles.containerImage}>
      <ImageBackground source={image} style={styles.image} >
        {/* <View style={styles.child}></View> */}
        <View style={styles.cardContainer}>
          <Image source={CustomFields.variables.Logo} style={styles.logo} />
        </View>
        {/* <View style={styles.rightContainer}>
          <Text style={styles.skip}>Skip</Text>
        </View> */}
        <View style={styles.bottomBox}>
          <Text style={styles.buttonHeading}> Welcome to Ratu Live</Text>
          <Text style={styles.buttonSubHeading}>
            {' '}
            Sign up and become a Star
          </Text>
          <TouchableOpacity
            onPress={showDatepicker}>
            {/* <Text style={styles.buttonText}> Select Date Of Birth</Text> */}
            <LinearGradient
              start={{ x: 0, y: 0, z: 1.5 }}
              end={{ x: 1, y: 1, z: 2 }}
              colors={['#FCEE10', '#CB8529', '#FFE600', '#C97E29', '#FCED00']}
              style={styles.gradBtn}
            >
              <Text style={styles.buttonText}>
                Select Date Of Birth
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              style={styles.dateTimePicker}
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      </ImageBackground>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleAgeLimit}
        onRequestClose={() => {
          setModalVisibleAgeLimit(!modalVisibleAgeLimit);
        }}
      >
        <View style={styles.centeredViewwallet}>
          <Text style={styles.modalText}>Age should be more than 18</Text>
          <View style={styles.modalView}>
            <TouchableHighlight              
              style={[styles.buttonClose]}
              onPress={() => {                   
                setModalVisibleAgeLimit(!modalVisibleAgeLimit);                
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
           
          </View>
        </View>
      </Modal> 

    </View>
      
    
  );
};
export default DOB;
