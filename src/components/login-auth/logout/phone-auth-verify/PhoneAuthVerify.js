import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  LogBox,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
//import styles from '../phone-auth/PhoneAuthScreen.style';
import CustomFields from './CustomFields';
import styles from './PhoneAuthVerify.styles';
import CodeInput from 'react-native-code-input';
import { useAuth } from '../../../../hooks/Auth';
import { addUser } from '../../../../utils/api';
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
LogBox.ignoreAllLogs();
export default function PhoneAuthVerify({ route, navigation }) {
  const [verificationCode, setVerificationCode] = useState();
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState(route.params.phone);
  const auth = useAuth();
  // const {uid} = auth?.user;
  //changePhoneNumber = () => {
  // this.setState({confirmResult: null, verificationCode: ''});
  //};
  //   adduserDetails = async() =>{
  // }
  //const auth = useAuth();
  handleVerifyCode = () => {
    //const {uid} = auth?.user;
    // Request for OTP verification
    
    const { confirmResult } = route.params.confirmResultData;
    if (verificationCode.length == 6) {     
      route.params.confirmResultData
        .confirm(verificationCode)
        .then(async (user) => {
          try {
          }
          catch (error) {
            console.log('There was an error adding user to db:',);
          }
          // const response = await adduserDetails();
          // console.log(response);
          //Alert.alert(`Verified! ${user.user.uid}`);
        })
      // .catch((error) => {
      //   //Alert.alert(error.message);
      //   console.log(error);
      // });
    } else {
      //.alert(CustomFields.validations.otpCode);
    }
  };
  return (
    <View style={styles.verificationView}>
      <View style={{ height: 200, width: '100%' }}>
        <CodeInput
          useRef="codeInputRef1"
          activeColor="#000"
          inactiveColor="#acacac"
          backgroundColor="#acacac"
          codeLength={6}
          autoFocus={false}
          inputPosition="center"
          size={50}
          onFulfill={(code) => setVerificationCode(code)}
          containerStyle={{ marginTop: 100 }}
          codeInputStyle={{ borderWidth: 1.5, borderRadius: 5 }}
        />
      </View>
      <Text style={styles.ResendOtp}>
        {CustomFields.variables.VerificationCodeMassage}
        {phone}
      </Text>
      <TouchableOpacity style={styles.ResendImage} onPress={handleVerifyCode}>
        <Image
          source={CustomFields.variables.proceedImage}
          style={styles.ImageIconStyle}
        />
      </TouchableOpacity>
      <Text style={styles.ResendOtp}>{CustomFields.variables.ResendOtp}</Text>
    </View>
  );
}
