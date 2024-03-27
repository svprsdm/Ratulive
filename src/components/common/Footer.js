import React, { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import SocketManager from '../../components/socket/socketManager';
export default function Footer(props) {
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  if (props.visible === true && props.footerOnGiftPop === false) {
    return (
      <View
        style={{
          backgroundColor: 'grey',
          opacity: 0.7,
          height: 55,
          width: '100%',
          flexDirection: 'row',
        }}>
        {/* <Image
          source={require('../../../assets/icons/smile.png')}
          style={{ height: 25, width: 25, marginTop: 15, marginLeft: 5 }}
        /> */}
        <TextInput
          placeholder={'Say Something'}
          style={{ opacity: 0.7, height: 55, width: '75%', marginLeft: '1%' }}
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity
          onPress={() => {
            if (userName === '' && roomId === '') {
              SocketManager.instance.emitSendMessage({
                roomId: Math.random().toString(36).substring(8),
                userName: 'Random Number',
                message: newMessage,
              });
              Keyboard.dismiss();
              setNewMessage('');
              setRoomId('');
              setUserName('');
            } else {
              SocketManager.instance.emitSendMessage({
                roomId: roomId,
                userName: userName,
                message: newMessage,
              });
              Keyboard.dismiss();
              setNewMessage('');
            }
          }}>
          <View
            style={{
              backgroundColor: 'gold',
              borderRadius: 10,
              height: 20,
              width: 50,
              marginTop: 20,
            }}>
            <Text style={{ marginLeft: 10 }}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <View />;
  }
}
