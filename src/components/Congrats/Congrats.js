import React,{useState} from 'react';
import {SafeAreaView, StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground,} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './CongratsStyle'
import { useNavigation } from '@react-navigation/native';
export default function Congrats(props) {
  const[congratsText, setCongratsText] = useState('Are you sure? You want to Go Live');
  const navigation = useNavigation();
 if(props.visible === true){
  return ( 
    <View style={styles.rectangeleContainer}>
      <LinearGradient colors={[ '#424242','#000000']} style={styles.linearGradient}>
        <View style={styles.rectangle}>
          <Image source={require('../../../assets/ratu_icons/golive_logo.png')} style={styles.baloonIcon} />
        </View>
        
        <View style={styles.textContainer}>
          {/* <TouchableOpacity onPress={() => props.congrats(false)}>
          <Text style={styles.congratulationText}>Congratulations!!</Text>
          </TouchableOpacity> */}
      
          <Text style={styles.congratulationText}>Go Live !!</Text>
          <Text style={styles.successText}>{congratsText}</Text>
          
          <View style={{
              flexDirection:'row',
              justifyContent: 'center',}}>
            <View style={{
              marginRight: 15}}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} 
              colors={['#FFD949', '#D29222', '#FFD949',]} style={styles.okbtnContainer}>
                <TouchableOpacity style={styles.okButton}
                  onPress={() => {
                    props.congrats(false);
                    console.log(props.selectedItem)
                    setTimeout(() => {
                      navigation.navigate('GoLiveLiveStream',{
                        selectedItem:props.selectedItem
                      })
                    },300)
                  }} 
                >
                  <Text style={styles.okText}>OK</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{
              marginLeft:15}}>
              <View style={styles.okbtnContainer}>
                <TouchableOpacity style={styles.okButton1}
                  onPress={() => {
                    props.congrats(false);
                    console.log(props.selectedItem)
                    setTimeout(() => {
                      navigation.navigate('GoLiveLiveStream',{
                        selectedItem:props.selectedItem
                      })
                    },300)
                  }} 
                >
                  <Text style={styles.okText}>Cancel </Text>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </View>
      </LinearGradient>
    </View>
    );

    }
    else{
      return ( 
        <View></View>
        );
      }
    };
 