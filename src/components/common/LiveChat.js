import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import SocketManager from '../../components/socket/socketManager';
import ChatMessageFormat from './LiveChatMessageFormat';
import io from 'socket.io-client';
import { SOCKET_IO_SERVER } from '../../components/socket/config';
{/* <script src="http://localhost:8097"></script> */ }
export default function LiveChat(props) {
  const socketRef = useRef();
  const [countHiii, setHiiCount] = useState(0);
  const [liveChats, setLiveChat] = useState([
    { message: '', userName: '', id: '' },
  ]);
  const [joinNotification, setJoinNotification] = useState('');
  const [leaveNotification, setLeaveNotification] = useState('');
  useEffect(() => {
    console.log('called useeffect of livechat');
    SocketManager.instance.listenSendMessage((data) => {
      console.log('Join event');
      liveChatMessages(data);
    });
    SocketManager.instance.listenJoinRoom((data) => {
      console.log('Join event');
      sendJoinNotification(data);
    });
    SocketManager.instance.listenLeaveRoom((data) => {
      console.log('Leave Event');
      sendLeaveNotification(data);
    });
  }, []);
  useEffect(() => {
    SocketManager.instance.listenSayHii((data) => {
      console.log('Say HII Listener');
      liveChatMessages(data);
    });
  }, []);
  // useEffect(()=>{
  //     socket.emit("onLiveChat", [props.msg, Math.random().toString(36).substring(7)]);
  // })
  function liveChatMessages(data) {
    const { userName, message } = data;
    setLiveChat((liveChats) => [
      ...liveChats,
      {
        message: message,
        userName: userName,
        id: Math.random().toString(36).substring(7),
      },
    ]);
  }
  function sendJoinNotification(data) {
    console.log('called join notification');
    console.log(data);
    setJoinNotification(data);
  }
  function sendLeaveNotification(data) {
    console.log('called Leave notification');
    console.log(data);
    setLeaveNotification(data);
  }
  function emptyNotifications(data) {
    if (data === 'joinNotification') {
      setJoinNotification('');
    } else if (data === 'leaveNotification') {
      setLeaveNotification('');
    } else {
      setJoinNotification('');
      setLeaveNotification('');
    }
  }
  if (props.visible && props.messageVisibility === false) {
    return (
      <KeyboardAvoidingView
        style={{
          height: '40%',
          display: 'flex',
          width: '80%',
          zIndex: 5,
          position: 'absolute',
          bottom: 55,
          justifyContent: 'flex-end',
          flex: 1,
          marginBottom: '3%',
        }}>
        <AutoScrollFlatList
          style={{ width: '100%' }}
          keyExtractor={(liveChat) => liveChat.id}
          showScrollToEndIndicator={false}
          data={liveChats}
          renderItem={({ item }) => (
            <View>
              <ChatMessageFormat
                userName={item.userName}
                message={item.message}
                joinNotification={joinNotification}
                leaveNotification={leaveNotification}
                visible={
                  item.message === '' &&
                    joinNotification === '' &&
                    leaveNotification === ''
                    ? false
                    : true
                }
                returnToEmpty={emptyNotifications}
              />
            </View>
          )}></AutoScrollFlatList>
      </KeyboardAvoidingView>
    );
  } else {
    return <View></View>;
  }
}
