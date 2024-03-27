//import React in our code
import React, { useState } from 'react';
//import all the components we are going to use
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
const Root = createStackNavigator()
const Screen1 = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Screen 1</Text>
    <Button
      title="Go to Screen 2"
      onPress={() => {
        navigation.push('Screen2')
      }}
    />
  </View>
)
const Screen2 = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Screen 2</Text>
    <Button
      title="Go back"
      onPress={() => {
        navigation.pop()
      }}
    />
  </View>
)
const Private = () => {
  return (
    <View>
      {/* <Text style={{color: '#fff'}}>New</Text> */}
      {/* <View>{Screen1}</View> */}
      <NavigationContainer independent={true}>
        <Root.Navigator>
          <Root.Screen name="Screen1" component={Screen1} />
          <Root.Screen name="Screen2" component={Screen2} />
        </Root.Navigator>
      </NavigationContainer>
    </View>
  )
}
const styles = StyleSheet.create({
})
export default Private;