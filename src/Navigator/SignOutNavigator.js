import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DOB,
  Login,
  Profile,
  PhoneAuthScreen,
  PhoneAuthVerify,
  HomeScreen,
  LocationEnable,
} from '../components';
import {
  View,
  Platform,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  Alert,
  Text,
} from 'react-native';

export default function SignOutNavigator(props) {
  //Creating Stack for every pages to navigate
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DOB">
        <Stack.Screen
          name="PhoneAuthScreen"
          component={PhoneAuthScreen}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen name="Signup" component={Login} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DOB"
          component={DOB}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OTP"
          component={PhoneAuthVerify}
          options={{
            title: 'Enter Verification Code',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
