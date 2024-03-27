import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { ScrollView, View, FlatList, Text, KeyboardAvoidingView, Image } from 'react-native'
import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";
import SocketManager from '../socket/socketManager';
import ChatMessageFormat from './LiveChatMessageFormat';
import { useAuth } from '../../hooks/Auth';
import { selectUser, getActivesubscriber } from '../../utils/api';
export default function LiveChat(props) {
    const socketRef = useRef();
    // const auth= useAuth();
    // const {uid} = auth?.user;
    const [countHiii, setHiiCount] = useState(0);
    const [uname, setUname] = useState('');
    const [subscribername, setSubscribername] = useState('');
    const [liveChats, setLiveChat] = useState([{ message: '', userName: '', roomId: '' }]);
    const [joinNotification, setJoinNotification] = useState('');
    const [leaveNotification, setLeaveNotification] = useState('');
    const disclaimer = "Ratulive does not advocate streamers to perform content that includes Smoking, Alcohol consumption, Drug abuse, pornography, gambling, nudity and other non-moral activities.Please be alert on any scams that could lead to physical and financial lost. Streamers should at all time comply with Ratulive agreement.If the above is being carried out by the streamer, please report this to us.";
    const uid = props.userId;
    const id = props.tokenid;
    // useLayoutEffect(() => {
    //     fetchuserDetails();
    // },[])
    // useEffect(()=>{
    //   fetchactivesubscriber();
    // })
    useEffect(() => {
        sendDisclaimer(disclaimer);
    }, [])
    useEffect(() => {
        console.log("called useeffect of livechat");
        // console.log('userid of viewer',props);
        // console.log('userid of viewer',props.userId);
        SocketManager.instance.listenSendMessage((data) => {
            console.log("send message event", data);
            // console.log("socket data", data)
            liveChatMessages(data);
        });
        SocketManager.instance.listenJoinRoom((data) => {
            // fetchuserDetails();
            console.log("Join room event", data);
            sendJoinNotification(data);
        });
        SocketManager.instance.listenLeaveRoom((data) => {
            console.log("Leave room Event")
            sendLeaveNotification(data);
        });
    }, [])
    // useEffect(() => {
    //     SocketManager.instance.listenSayHii((data) => {
    //         //console.log("Say HI Listener");
    //         liveChatMessages(data);
    //     })
    // }, [])
    // useEffect(()=>{
    //     socket.emit("onLiveChat", [props.msg, Math.random().toString(36).substring(7)]);
    // }) 
    async function fetchuserDetails() {
        try {
            const userinfo = await selectUser({ uid: props.userId });
            if (userinfo.error) {
                console.log('error');
            } else {
                console.log('Response', userinfo);
                setUname(userinfo[0].name);
               // console.log('username from livechat', uname);
               // console.log('usernames from livechat', userinfo[0].name)
            }
        } catch (error) {
            console.log('Error while fetching user data', error);
        }
    }
    // async function fetchactivesubscriber(){
    //         try{
    //           const subinfo = await getActivesubscriber({id});
    //           if(subinfo.error){
    //             console.log('error');
    //           }else{
    //             // setSubscriberslength(subinfo.length);
    //             setSubscribername(subinfo[0].user_name);
    //             console.log('newly added subscriber',subscribername);
    //           }
    //           } catch(error){
    //           console.log('Error while fetching active subscriber data', error);
    //           }
    //       }
    function liveChatMessages(data) {
        const { userName, message, } = data;
        setLiveChat(liveChats => [...liveChats, {
            message: message,
            userName: userName,
            roomId: id
        }])
    }
    function sendDisclaimer(disclaimer) {
        setLiveChat(liveChats => [...liveChats, {
            message: disclaimer,
            userName: "Disclaimer",
            roomId: id
        }])
    }
    function sendJoinNotification(data) {
        //fetchuserDetails();
        // console.log("called join notification");
        // console.log(data);
        const { userName, broadCastMessage } = data;
        setLiveChat(liveChats => [...liveChats, {
            message: broadCastMessage,
            userName: userName,
            roomId: id
        }])
        // console.log("Checking socket username", uname);
    }
    function sendLeaveNotification(data) {
        // console.log("called Leave notification");
        // console.log(data)
        const { userName, broadCastMessage } = data;
        setLiveChat(liveChats => [...liveChats, {
            message: broadCastMessage,
            userName: userName,
            roomId: id
        }])
    }
    if (props.visible === true && props.messageVisibility === false) {
        return (
            <KeyboardAvoidingView style={{ height: "30%", display: "flex", width: '80%', zIndex: 5, position: "absolute", bottom: 55, justifyContent: 'flex-end', flex: 1, marginBottom: '3%' }}>
                <AutoScrollFlatList keyExtractor={(liveChat) => liveChat.roomId} showScrollToEndIndicator={false} data={liveChats} renderItem={({ item }) => (
                    <ChatMessageFormat userName={item.userName} message={item.message} visible={item.message === "" ? false : true} />
                )}></AutoScrollFlatList>
            </KeyboardAvoidingView>
        )
    } else {
        return (
            <View style={{ backgroundColor: 'red' }}>
            </View>
        )
    }
}