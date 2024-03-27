import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomFields from './CustomFields';
import LinearGradient from 'react-native-linear-gradient';
import styles from './Login.styles';
import { googleSignIn, useAuth } from '../../../hooks/Auth';
function Login(props) {
  const image = require('../../../../assets/ratu.gif');
  const auth = useAuth();
  return (
    <View style={styles.containerImage}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.TopContainer}>
          <View style={styles.leftContainer}>
            <Image source={CustomFields.variables.Logo} style={styles.logo} />
          </View>
          <View style={styles.rightContainer}>
            {/* <Text style={styles.skip}>Skip</Text> */}
          </View>
        </View>
        {/* Bottom Box */}
        <View style={styles.bottomBox}>
          <Text style={styles.Heading}>
            {CustomFields.variables.WelcomeMassageHead}
          </Text>
          <Text style={styles.SubHeading}>
            {CustomFields.variables.WelcomeMassageSub}
          </Text>
          <LinearGradient
            start={{ x: 0, y: 0, z: 1.5 }}
            end={{ x: 1, y: 1, z: 2 }}
            colors={['#FCEE10', '#CB8529', '#FFE600', '#C97E29', '#FCED00']}
            style={styles.PhoneContainer}>
            <TouchableOpacity
              style={styles.PhoneContainer}
              onPress={() => props.navigation.navigate('PhoneAuthScreen')}>
              <Image
                source={CustomFields.variables.PhoneImage}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.signIn}>
                {CustomFields.variables.PhoneNumber}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          {/* <TouchableOpacity
              style={styles.FaceBookContainer}
              onPress={() => this.facebookLogIn()}>
              <Image
                source={CustomFields.variables.FaceBookImage}
                style={styles.buttonImageIconStyle}
              />
              <Text style={styles.signIn}>
                {CustomFields.variables.FaceBookSignIn}
              </Text>
            </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.GoogleContainer}
            onPress={() => auth.googleSignIn()}>
            <Image
              source={CustomFields.variables.GoogleImage}
              style={styles.buttonImageIconStyle}
            />
            <Text style={styles.signInGoogle}>
              {CustomFields.variables.GoogleSignIn}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
export default Login;
