import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Avatar, Bubble, SystemMessage, Message, MessageText, InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon2 from 'react-native-vector-icons/FontAwesome5';
import CustomFields from '../CustomFields';
import styles from './chatStyle';
import { db, useAuth } from '../../../hooks/Auth';
import firestore from '@react-native-firebase/firestore';
import { doc } from 'prettier';
const ChatScreen = (props) => {
  const auth = useAuth();
  const { email, displayName, photoURL, uid } = auth?.user;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  // function formatDate() {
  //   var d = new Date();
  //   var hh = d.getHours();
  //   var m = d.getMinutes();
  //   var dd = "AM";
  //   var h = hh;
  //   if (h >= 12) {
  //     h = hh - 12;
  //     dd = "PM";
  //   }
  //   if (h == 0) {
  //     h = 12;
  //   }
  //   m = m < 10 ? "0" + m : m;
  //   // var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
  //   var replacement = h + ":" + m;
  //   replacement += " " + dd;
  //   return replacement;
  // }
  useEffect(() => {
    console.log("params", props.route.params.data);
    const ruid = props.route.params.data.id;
    const docid = ruid > uid ? uid + "-" + ruid : ruid + "-" + uid;
    console.log("docid", docid);
    setMessages([
      {
        _id: 1,
        text: `${props.route.params.data.text}`,
        createdAt: new Date(),
      },
    ]);
  }, []);
  const getAllMessages = async () => {
    const ruid = props.route.params.data.id;
    const docid = ruid > uid ? uid + "-" + ruid : ruid + "-" + uid;
    const querySanp = await db.collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', "desc")
      .get()
    const allmsg = querySanp.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate()
      }
    })
    setMessages(allmsg)
  }
  useEffect(() => {
    // getAllMessages()
    const ruid = props.route.params.data.id;
    const docid = ruid > uid ? uid + "-" + ruid : ruid + "-" + uid;
    const messageRef = db.collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', "desc")
    const unSubscribe = messageRef.onSnapshot((querySnap) => {
      if(querySnap != null){
        const allmsg = querySnap.docs.map(docSanp => {
          const data = docSanp.data()
          if (data.createdAt) {
            return {
              ...docSanp.data(),
              createdAt: docSanp.data().createdAt.toDate()
            }
          } else {
            return {
              ...docSanp.data(),
              createdAt: new Date()
            }
          }
        })
        setMessages(allmsg)
      }
    })
    return () => {
      unSubscribe()
    }
  }, [])
  const onSend = (messageArray) => {
    const ruid = props.route.params.data.id;
    const receiverData = props.route.params.data;
    const msg = messageArray[0]
    const mymsg = {
      ...msg,
      sentBy: uid,
      sentTo: ruid,
      createdAt: new Date()
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
    const docid = ruid > uid ? uid + "-" + ruid : ruid + "-" + uid;
    const time = firestore.FieldValue.serverTimestamp();
    console.log("object", time);
    db.collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() });
    var rData = {
      author: receiverData.author,
      download_url: receiverData.download_url,
      id: receiverData.id,
      isOnline: false,
      text: msg.text,
      hours: '2 hrs',
      noMessages: 0,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    console.log("Receiver Data:", rData);
    //Add the msg history for both users
    var updateUserHistory = db.collection('chatHistory')
      .doc(uid)
      .collection('historyData').doc(ruid).set(rData);
    var updateUserHistory = db.collection('chatHistory')
      .doc(ruid)
      .collection('historyData').doc(uid).set({
        author: displayName,
        download_url: photoURL,
        id: uid,
        isOnline: false,
        text: msg.text,
        hours: '2 hrs',
        noMessages: 0,
        createdAt: firestore.FieldValue.serverTimestamp()
      });
  }
  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: '#fff',
        paddingTop: 6,
      }}
      primaryStyle={{ alignItems: 'center' }}
    />
  );
  const renderActions = (props) => (
    <Actions
      {...props}
      containerStyle={{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Icon name='smile-o' style={{ fontSize: 27, height: 27, color: 'gold' }} />
      )}
      options={{
      }}
    />
  );
  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={{
        color: 'black',
        backgroundColor: '#fff',
        paddingTop: 8.5,
        paddingHorizontal: 12,
        marginLeft: 0,
      }}
    />
  );
  const renderSend = (props) => (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
        backgroundColor: 'dodgerblue',
        borderColor: 'dodgerblue',
        borderWidth: 1,
        borderRadius: 50
      }}
    >
      <Icon name='send' style={{ fontSize: 22, height: 24, color: '#fff' }} />
    </Send>
  );
  const renderAvatar = (props) => (
    <Avatar
      {...props}
      containerStyle={{ left: { marginLeft: '-15%' }, right: {} }}
      imageStyle={{ left: { marginLeft: '-15%' }, right: {} }}
    />
  );
  const renderBubble = (props) => (
    <Bubble
      {...props}
      // renderTime={() => <Text style={{color:'#fff',alignItems:'flex-end',backgroundColor:'#171717',paddingBottom:2}}></Text>}
      // renderTicks={() => <Icon2 name='check-double' style={{color:'white',fontSize:20, alignSelf:'flex-end'}} />}
      wrapperStyle={{
        left: { borderWidth: 4, backgroundColor: '#FFFACD', marginBottom: 10 },
        right: { borderWidth: 4, backgroundColor: '#48D1CC', marginBottom: 10 },
      }}
      bottomContainerStyle={{
        left: { color: '#FFFACD' },
        right: { color: '#48D1CC' },
      }}
      tickStyle={{ backgroundColor: '#171717' }}
      usernameStyle={{ color: 'black', fontWeight: '90' }}
      containerToNextStyle={{
        left: { borderColor: '#FFFACD', borderWidth: 4 },
        right: { borderColor: '#48D1CC', borderWidth: 4, color: 'black' },
      }}
      containerToPreviousStyle={{
        left: { borderColor: '#FFFACD', borderWidth: 4 },
        right: { borderColor: '#48D1CC', borderWidth: 4, color: 'black' },
      }}
    />
  );
  const renderMessageText = (props) => (
    <MessageText
      {...props}
      textStyle={{
        left: { color: 'black' },
        right: { color: 'black' },
      }}
      linkStyle={{
        left: { color: 'blue' },
        right: { color: 'blue' },
      }}
      customTextStyle={{ fontSize: 15, lineHeight: 24 }}
    />
  );
  const exitChat = () => {
    // props.navigation.navigate('message');
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={CustomFields.variables.Back} style={styles.search} />
          </TouchableOpacity>
          <View>
            <Image source={{uri:props.route.params.data.download_url}} style={{ width: 25, height: 25 }} />
            <View>
            </View>
          </View>
          <Text style={styles.skip}>{props.route.params.data.author}</Text>
        </View>
        <View style={styles.rightContainer}>
          <>
            <Image source={CustomFields.variables.Logo} style={styles.logo} />
          </>
          {/* <>
            <Image source={CustomFields.variables.More} style={styles.logo2} />
          </> */}
        </View>
      </View>
      {/* <View style={styles.chat}>{}</View> */}
      <GiftedChat
        messages={messages}
        text={text}
        alwaysShowSend={true}
        onInputTextChanged={setText}
        placeholder={'Type...'}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderAvatar={renderAvatar}
        renderBubble={renderBubble}
        // renderSystemMessage={renderSystemMessage}
        // renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        messagesContainerStyle={{ backgroundColor: '#171717' }}
        user={{
          _id: uid
        }}
      />
    </View>
  );
};
export default ChatScreen;
