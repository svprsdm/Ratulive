/* eslint-disable no-alert */
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
  Text,
  Alert,
  TextInput,
} from 'react-native';
// import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import styles from './PhoneAuthScreen.style';
import CustomFields from './CustomFields';
import PhoneInput from 'react-native-phone-input';
class PhoneAuthScreen extends Component {
  state = {
    phone: '',
    phoneNumberVal: '',
    phoneWithCountryCode: '',
    confirmResult: null,
    verificationCode: '',
    userId: '',
    countryCode: 'MY',
    countryNum: '60',
    valid: '',
    type: '',
    image: CustomFields.variables.imageUrl,
  };
  countryCodeChange = async () => {
    this.countryCodeChange = await this.countryCodeChange.bind(this);
    this.setState({
      countryCode: this.phone.getISOCode().toUpperCase(),
      countryNum: this.phone.getCountryCode(),
    });
  };
  updateInfo = async () => {
    this.updateInfo = await this.updateInfo.bind(this);
    const val = '+' + this.phone.getCountryCode() + this.state.phoneNumberVal;
    console.log(val);
    this.setState({
      phoneWithCountryCode: val,
    });
    await this.handleSendCode(); 
  };
  validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    console.log('Enter into Validate phone number');
    return regexp.test(this.state.phoneWithCountryCode);
   
  };
  handleSendCode = async () => {
    // Request to send OTP
    //alert(this.state.phoneWithCountryCode);
    if (this.validatePhoneNumber()) {
      await auth()
        .signInWithPhoneNumber(this.state.phoneWithCountryCode)
        .then((confirmResult) => {
          this.setState({ confirmResult });
          
          const verificationCode = this.state.verificationCode;
          const confirmResultData = this.state.confirmResult;
          this.props.navigation.navigate('OTP', {
            phone: this.state.phoneWithCountryCode,
            verificationCode,
            confirmResultData,
          });
        })
        .catch((error) => {
          //alert(error.message);
          console.log(error);
        });
    } else {
      Alert.alert(CustomFields.validations.invalidNumber);
    }
  };
  render() {
    return (
      <View style={styles.containerImage}>
        <ImageBackground source={this.state.image} style={styles.image}>
          <View style={styles.TopContainer}>
            <View style={styles.leftContainer}>
              <Image source={CustomFields.variables.Logo} style={styles.logo} />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.skip}>Skip</Text>
            </View>
          </View>
          <View style={styles.bottomBox}>
            <Text style={styles.buttonHeading}> Welcome to Ratu Live</Text>
            {/* <SafeAreaView style={[styles.container, {backgroundColor: '#333'}]}> */}
            <View style={styles.page}>
              <Text style={styles.Login}>{CustomFields.variables.Login}</Text>
              <Text style={styles.EnterMessage}>
                {CustomFields.variables.EnterMassage}
              </Text>
              <View style={styles.PhoneNumberView}>
                <Text style={{ marginLeft: 10, color: 'white', fontSize: 17 }}>
                  {this.state.countryCode}
                </Text>
                <PhoneInput
                  ref={(ref) => {
                    this.phone = ref;
                  }}
                  initialCountry="my"
                  onPressConfirm={this.countryCodeChange}
                  textProps={{
                    placeholder: CustomFields.variables.placeHolder,
                    placeholderTextColor: '#aaa',
                  }}
                  style={{ backgroundColor: '', width: 35, marginLeft: 10 }}
                  textStyle={{ color: '#fff', fontSize: 17 }}
                />
                <Text style={{ marginLeft: 0, color: 'white', fontSize: 18 }}>
                  +{this.state.countryNum}-
                </Text>
                <TextInput
                  style={styles.PhoneNumber}
                  placeholder={CustomFields.variables.placeHolder}
                  placeholderTextColor="#aaa"
                  keyboardType="phone-pad"
                  value={this.state.phoneNumberVal}
                  onChangeText={(phoneNumberVal) => {
                    this.setState({ phoneNumberVal });
                  }}
                  maxLength={15}
                  editable={this.state.confirmResult ? false : true}
                />
              </View>
              {/* <TextInput
                style={styles.PhoneNumber}
                placeholder={CustomFields.variables.placeHolder}
                placeholderTextColor="#eee"
                keyboardType="phone-pad"
                value={this.state.phone}
                onChangeText={(phone) => {
                  this.setState({phone});
                }}
                maxLength={15}
                editable={this.state.confirmResult ? false : true}
              /> */}
              <TouchableOpacity onPress={this.updateInfo}>
                <LinearGradient
                  start={{ x: 0, y: 0, z: 1.5 }}
                  end={{ x: 1, y: 1, z: 2 }}
                  colors={['#FCEE10', '#CB8529', '#FFE600', '#C97E29', '#FCED00']}
                  style={styles.PhoneContainer}>
                  <Text style={styles.buttonText}>
                    {CustomFields.variables.GetOtp}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {/* </SafeAreaView> */}
          </View>
        </ImageBackground>
      </View>
    );
  }
}
export default PhoneAuthScreen;
