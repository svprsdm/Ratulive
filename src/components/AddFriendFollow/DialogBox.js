import React, { useState } from "react";
import { Button, StyleSheet, View, Image, TouchableOpacity, FlatList,ToastAndroid } from "react-native";
import { Card, RadioButton, Text } from 'react-native-paper';
import Dialog from "react-native-dialog";
import {updatereport} from '../../utils/api';
import { useAuth } from "../../hooks/Auth";
import { useNavigation } from '@react-navigation/native';
export default function App(props) {
  const [visible, setVisible] = useState(false);
  const [reason,setreason] = useState('');
  const auth = useAuth();
    const {uid} = auth?.user;
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    setVisible(false);
  };

  async function reportuser(){
    
    const reportuseridd=[uid + ' ' + value];
    console.log('reportuser',value);
    console.log('reportuser',reportuseridd);
    console.log('reportuser',props.tokenid);
    try{
      await updatereport({id:props.tokenid,userid:reportuseridd});
      props.hideDialog();
      ToastAndroid.show('Your request has been submitted', ToastAndroid.SHORT);
      
    }catch(error){
      console.log('Error while updating', error);
      }
  }

  const navigation = useNavigation();
  const [value, setValue] = React.useState('first');
  const [blockDurationValues, setBlockDurationValues] = React.useState([{ value: '1 day' },
  { value: '2 week' },
  { value: '1 year' },
  { value: 'Permanently' }]);
  const [reportDialogTextValues, setReportDialogTextValues] = React.useState([{ value: 'Sexual Content' },
  { value: 'Violent Content' },
  { value: 'Abusive Content' },
  { value: ' Spam' },
  { value: ' Other' },
  { value: ' Report' }]);
  if (props.dialog === 'block') {
    return (
      <View style={styles.container}>
        <Dialog.Container visible={props.visible} contentStyle={{ backgroundColor: 'black' }} blurStyle={{ backgroundColor: 'black' }}>
          <View style={styles.blockdialogtop}>
            <Text style={styles.blockcontactforText}>
              Block contact for
            </Text>
            <TouchableOpacity onPress={() => { props.hideDialog() }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require('../../../assets/icons/cancel.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: 150, }}>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}>
              <FlatList
                data={blockDurationValues}
                renderItem={({ item }) => (
                  <View style={styles.blockcardContent}>
                    <RadioButton value={item.value} uncheckedColor="white" />
                    <Text style={styles.onedayText}>{item.value}</Text>
                  </View>
                )}
                KeyExtractor={({ item }) => item.value}
              />
            </RadioButton.Group>
          </View>

          <TouchableOpacity onPress={() => {reportuser()}}
               style={{textAlign: "center", justifyContent:"center", alignItems: 'center', marginTop: 20}}>
                <Text style={{color: '#fff', borderRadius: 5,
                  backgroundColor: '#f1c40f',
                  paddingTop:10,
                  paddingBottom:10,
                  width: '50%',
                  textAlign:'center',
                  alignItems: 'center',
                  justifyContent:"center",
                  }}>
                    OK
                </Text>
              </TouchableOpacity>
        </Dialog.Container> 
      </View>
    );
  }
  else {
    return (
      <View>
        <Dialog.Container visible={props.visible} contentStyle={{ backgroundColor: 'black' }} blurStyle={{ backgroundColor: 'black' }}>
          <View style={styles.blockdialogtop}>
            <Text style={styles.blockcontactforText}>
              Report This User
            </Text>
            <TouchableOpacity onPress={() => { props.hideDialog() }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={require('../../../assets/icons/cancel.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: 280 }}>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}>
              <FlatList
                data={reportDialogTextValues}
                renderItem={({ item }) => (
                  <View style={styles.blockcardContent}>
                    <RadioButton value={item.value} uncheckedColor='white' />
                    <Text style={styles.onedayText}> {item.value}</Text>
                  </View>
                  )}
                  KeyExtractor={({item}) => item.value}
                />
              </RadioButton.Group>
              <TouchableOpacity onPress={() => {reportuser()}}
               style={{textAlign: "center", justifyContent:"center", alignItems: 'center', marginTop: 20}}>
                <Text style={{color: '#fff', borderRadius: 5,
                  backgroundColor: '#f1c40f',
                  paddingTop:10,
                  paddingBottom:10,
                  width: '50%',
                  textAlign:'center',
                  alignItems: 'center',
                  justifyContent:"center",
                  }}>
                    OK
                </Text>
              </TouchableOpacity>
            </View>
          </Dialog.Container> 
        </View>
        ); 
      }
    }
    
    const styles = StyleSheet.create({
      container:{
        backgroundColor:'black'
      },
      blockcardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#212121',
      },
      blockCard: {
        top: '10%',
        width: '112%',
        right:16,
        height:100,
        backgroundColor: '#212121',
      },
      blockdialogtop:{
        flexDirection:'row',
        justifyContent:'space-between',
        bottom:20,
      },
      blockcontactforText: {
        marginLeft: 8,
        fontSize: 15,
        color: 'white',
        opacity: 0.9,
        letterSpacing: 1,
      },
      blockcardContent: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      onedayText: {
        margin: 9,
        fontSize: 14,
        letterSpacing: 1,
        color: 'white',
        opacity: 0.9,
      },
      addFriendBtn: {
        
        backgroundColor: '#f1c40f',
        alignItems: 'center',
        height: 50,
        paddingTop: 3,
        borderRadius: 5,
      },
      addFriendText: {
        paddingTop: 10,
        color: 'white',
      },
    });
