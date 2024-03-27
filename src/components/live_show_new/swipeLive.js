import React, { useEffect, useState, useRef, useCallback, useLayoutEffect  } from 'react';
import { PanGestureHandler, State } from "react-native-gesture-handler";

import { Dimensions, Image, StyleSheet, Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  ToastAndroid,
  Text,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  View,
  Animated,
  TextInput,
  Alert
 } from "react-native";
 
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import Video from 'react-native-video';
import SocketManager from '../socket/socketManager';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures-plus';
import Header from './component/Header';
import Info from './component/Info';
import Sidebar from './component/SideBar';
import Footertab from './component/Footertab';
import Livegift from './Livegift';
import LiveChat from './LiveChat';
import AddFriendFollowButton from '../AddFriendFollow/AddFriendFollowButton';
//import { useNavigation } from '@react-navigation/native';
import { StackActions, NavigationActions } from '@react-navigation/native';
// Below Code is related to subStream
import {
  OpenVidu,
  OpenViduReactNativeAdapter,
  RTCView,
} from 'openvidu-react-native-adapter';
import {
  addSubscriber,
  createSessionToken,
  deleteActiveSubscriber,
  addGiftToDb, 
  selectUser, 
  getActiveStreams, 
  getStreamer, 
  updateviewerlist, 
  deleteviewerlist,
  updatesubscriberpaidstatus, updateesubscriberpaidstatus,  
  updateWallet,updateUserPearlAndRinggit, updatePrivatePearlCounts
} from '../../utils/api';
import {parse} from 'flatted';
// untill here is SubStream code
import { gif } from './Gif';
import Viewerslist from '../ViewersList/Viewerslist';
import ListViewer from './component/ListViewer';
// import Stream from '../LiveStream/Stream';
// import SubStream from '../LiveStream/SubStream';
import { useAuth } from '../../hooks/Auth';
import KeepAwake from 'react-native-keep-awake';

// import { ToastAndroid } from 'react-native';
import InCallManager from 'react-native-incall-manager';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var subscriber;
const { width, height } = Dimensions.get("window");
export const assets = [
  require("../../../assets/avatar_3.png"),
  require("../../../assets/avatar_2.png"),
  require("../../../assets/avatar_1.png"),
  require("../../../assets/avatar_4.png"),
  require("../../../assets/avatar_3.png"),
];
var OV;
// Below Code is related to sub Stream
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;
var ses = {};

// until here is subStream


const snapPoints = assets.map((_, i) => i * -width);
const styles1 = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  pictures: {
    width: width * assets.length,
    height,
    flexDirection: "row",
  },
  picture: {
    width,
    height,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  touchableOpacityStyle: {
    position:'absolute',
    flexDirection: 'row',
    zIndex:100,
    // width: 50,
    // height: 50,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: 20,
    top: 150,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});
export default function swipeLive( { props, route , navigation}, shouldBeAwake) {
  if (shouldBeAwake) { KeepAwake.activate(); }
  else { KeepAwake.deactivate(); }
  const [flag,setFlag]= useState(0);
  const [number, setNumber] = React.useState(null);
  const { activeusers } = route.params;
  const token_url = activeusers.token_url;
  const [pswd , setpswd] = useState(activeusers.password);
  const urlParams = new URLSearchParams(token_url); 
  const[ sessionData, setSessionData]= useState(activeusers.session_data);
  const[ sessionId, setSessionId]= useState(activeusers.session_id);
  const[ tokenUrl, setTokenUrl]= useState(activeusers.token_url);

  const pearlreceived = activeusers.pearls_via_private;
  const value = activeusers.crowns.replace(/(^.*\[|\].*$)/g, '');
  const valuee = value.replace(/(^")|("$)/g, '');
  

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [privatemodepassword, setPrivatemodepassword] = useState(false);
  const [privatemodechips, setPrivatemodechips] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const btnHandler = () => {
    setShouldShow(previousState => !previousState);
  };

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [crownsModalVisible, setCrownsModalVisible] = useState(false);
  const [modalVisibleWallet, setModalVisibleWallet] = React.useState(false);
  const [modalVisibleWrongPswd, setModalVisibleWrongPswd] = React.useState(false);
  
  const [isVisible, setISVisible] = useState(true);
  const [giftPop, setGiftPopVisible] = useState(false);
  const [leavestream, setleavestream] = useState(false);
  const [modalstatus, setModalstatus] = useState(false);  
  const [modalVisible, setModalVisible] = useState(false);
  const [viewerstatus, setviewerstatus] = useState(true);
  const [messageBoxVisibile, setMessageBoxVisibility] = useState(true);
  const [heartCount, setHeartCount] = useState(0);
  const [countHeart, setCountHeart] = useState(0);
  const [errorPop, setErrorPopVisibility] = useState(false);
  const [viewerslistPop, setViewerslistPopVisibility] = useState(false);  
  const socketRef = useRef();
  const [imageName, setImageName] = useState(null);
  const [giftvalue, setGiftvalue] = useState(''); 
  const [userid, setUserid] = useState('');
  const [imagesize, setImagesize] = useState(false);
  const [uname, setUname] = useState(null);
  const [times, setTimes] = useState(0); 
  const [livepassword, setLivepassword] = useState('');
  const [chipsvalue, setChipsvalue] = useState('');  
  const [username, setUsername] = useState('Random');  
  const [giftCoinCount, setGiftCoinCount] = useState(0);    
  const [ccount, setCcount] = useState(0);
  const [activeStreamers, setActiveStreamers] = useState([]);
  const [nextactiveStreamers, setNextactiveStreamers] = useState(0); 
  const [token_id, settoken_id] = useState(urlParams.get('token'));
  const [liveGifts, setLiveGifts] = useState([
    { imageName: '', userName: '', times: '' },
  ]);
 
  const [lastGift, setLastGift] = useState({
    imageName: '', userName: '', times: ''
  });
  const [previousGift, setPreviousGift] = useState({
    imageName: '', userName: '', times: ''
  });
  const auth = useAuth();
  const { uid } = auth?.user;

  var multiData = [];
   //const navigation = useNavigation();
  // Beloc to is only for testing purpose
  const [mySessionId, setmySessionId] = useState(auth.user._users?.displayName ??  auth.user.displayName );
  const [myUserName, setmyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [ovsession, setOvsession] = useState(ses);
  const [mainStreamManager, setmainStreamManager] = useState(undefined);
  const [subscribers, setsubscribers] = useState([]);
  const [role, setrole] = useState('SUBSCRIBER');
  const [mirror, setmirror] = useState(false);
  const [videoSource, setvideoSource] = useState(undefined);
  const [video, setvideo] = useState();
  const [audio, setaudio] = useState();
  const [error, seterror] = useState();
  const [viewer, setviewer] = useState();
  const [kickedoutlist, setkickedoutlist] = useState('');
  const [entering, setentering] = useState();
  const [publisher, setpublisher] = useState();
  const [x, setx] = useState(0);
  const [balance, setBalance] = React.useState(0);
  const [firstX, setFirstX] = useState(0);
  const [pearlbalance, setPearlbalance] = React.useState(0);
  const [crownvalue, setCrownvalue] = React.useState(valuee);

  //  testing code below

  const[position,setPosition]= useState(0);
  const [streamerList,setStreamerList]= useState([]);

 
  const [streamData,setStreamData]= useState({        
    session_data:'',
    profile_pic:'',
    session_id:'',
    token_id:'',
    token_url:'',
    title:'',
    session_type:'',
    password:'', 
    paidviewer:'',  
    pearls_via_private:'', 
    crowns:'',           
    position: ''   
    });

  // exit button leave stream and audio
  async function exitStreamAudio(){
    
    
    InCallManager.setSpeakerphoneOn(false);  
    subscriber.subscribeToAudio(false);  
    
    SocketManager.instance.emitLeaveRoom({
      userName: username,
      tokenId: token_id,
      
    });   
    if (ovsession) {
      //console.log('************ disconnect',ovsession);      
      ovsession.unsubscribe(subscriber);              
    }
    
    ovsession.disconnect();
    ses = {};
    setOvsession('');
    //subscriber.capabilities.forceDisconnect= true;
    setsubscribers([]);
    subscriber = null;
    //ses = {};
    OV = null;   
  }

  
   // swipeStream
   async function swipeStream(){
    //  await leaveSession();
     await changeStreamData();
    
   }

   //Check Password for Private sessioin
   async function checkpassword(){
    if(number == pswd){   
      if (streamData.session_data == "" && streamData.session_id == "" && streamData.token_url == "")
      {
         
          //console.log('ENter into join session for private');          
          setPasswordModalVisible(!passwordModalVisible);
          updatesubscriber();
          const ovReact = new OpenViduReactNativeAdapter();
          ovReact.initialize();
          joinSession();
          updateviewer();

      }else{
        
        navigation.replace('swipeLive', {activeusers: streamData});
      }  
     
    }else{
      //ToastAndroid.show('Entered password Incorrect', ToastAndroid.SHORT);
      //showAlert('Entered password is wrong');
      setModalVisibleWrongPswd(true);
    }
  }
  
  async function updatesubscriber(){
    const paidid = [uid];
    try {
      await updatesubscriberpaidstatus({id:activeusers.token_id, subscriber:paidid})
      await updateesubscriberpaidstatus({id:activeusers.token_id, subscriber:paidid})     
    } catch (error) { 
      console.log('error while updating paid user for stream', error);   
    }
  }

  const updatebalance = async () => {
    if (crownvalue <= balance) {
      try {
       
        // const updatedpearls = await updatePearlCount({ uid: streamerid, pearl_count });
        if(valuee <= 1000)
        {

          const usercrowns = Number(balance) - Number(crownvalue);
          const pearl_count = Number(pearlbalance) + Number(valuee);
          const updatestatus = await updateWallet({ uid: uid, wallet: usercrowns });

          const ringgitearned = valuee * 5;
          const ringgitearnedd = ringgitearned*0.000250227*0.1;
          // const privatePearls =  await updatePearlCount({uid: uid,pearl_count: ringgitearned}); 
          // const privateRMpub = await updateRinggitEarnedPublisher({token_id: activeusers.token_id, ringgitearned: ringgitearnedd});
          // const privateRMuser = await updateRinggitEarned({uid: uid,ringgitearned: ringgitearnedd});
          updateUserPearlAndRinggit({
            uid: uid,
            pearl_count: ringgitearned,
            token_id: activeusers.token_id, 
            ringgitearned: ringgitearnedd
          });

          const privateearnedpearl = JSON.stringify(Number(pearlreceived) + Number(ringgitearned));        
          // const updatepearls = await updatePrivatePearl({ id: activeusers.token_id, privateearnedpearl })
          // const updateepearls = await updateePrivatePearl({ id: activeusers.token_id, privateearnedpearl })

          updatePrivatePearlCounts({
            id: activeusers.token_id, 
            privateearnedpearl
          });

          if (updatestatus != null) {          
            if (streamData.session_data == "" && streamData.session_id == "" && streamData.token_url == "")
            {
                updatesubscriber();
                const ovReact = new OpenViduReactNativeAdapter();
                ovReact.initialize();
                joinSession();
                updateviewer();
              }else{        
                navigation.replace('swipeLive', {activeusers: streamData});
              }  
          }

        }else{

          const usercrowns = Number(balance) - Number(crownvalue);
          const pearl_count = Number(pearlbalance) + Number(valuee);
          const updatestatus = await updateWallet({ uid: uid, wallet: usercrowns });
          
          const ringgitearned = valuee * 5;
          //const ringgitearnedd = ringgitearned*0.0000229112*0.1;
          const ringgitearnedd = ringgitearned*0.000250227*0.1;
          // const privatePearls =  await updatePearlCount({uid: uid,pearl_count: ringgitearned});
          // const privateRMpub = await updateRinggitEarnedPublisher({token_id: activeusers.token_id, ringgitearned: ringgitearnedd});
          // const privateRMuser = await updateRinggitEarned({uid: uid,ringgitearned: ringgitearnedd});
          updateUserPearlAndRinggit({
            uid: uid,
            pearl_count: ringgitearned,
            token_id: activeusers.token_id, 
            ringgitearned: ringgitearnedd
          });
          const privateearnedpearl = JSON.stringify(Number(pearlreceived) + Number(ringgitearned));        
          // const updatepearls = await updatePrivatePearl({ id: activeusers.token_id, privateearnedpearl })
          // const updateepearls = await updateePrivatePearl({ id: activeusers.token_id, privateearnedpearl })
          
          updatePrivatePearlCounts({
            id: activeusers.token_id, 
            privateearnedpearl
          });


          if (updatestatus != null) {
            console.log('updated');
            if (streamData.session_data == "" && streamData.session_id == "" && streamData.token_url == "")
            {
                updatesubscriber();
                const ovReact = new OpenViduReactNativeAdapter();
                ovReact.initialize();
                joinSession();
                updateviewer();
              }else{
        
                navigation.replace('swipeLive', {activeusers: streamData});
              }  
          }

        }
        
      } catch (error) {
        console.log('Error while adding details', error);
      }
    } else {
      setModalVisibleWallet(true);
      // Alert.alert("Your wallet balance is Low, Please topup and continue");
    }
  }

   // change stream data and position
   async function changeStreamData(){
    var newPostion= activeusers.position ? activeusers.position+1: 1;     
    var len = streamerList.length;
    deleteviewer();
    
      if (len > 0) {
        newPostion = newPostion < len ? newPostion : 0;
        console.log('Position', newPostion);
        const newStreamData = streamerList[newPostion];
        console.log('Active streamers list', newStreamData);
        const newStream = {
          ...newStreamData,
          position: newPostion
        };
      
        exitStreamAudio();
        setStreamData(newStream);
        setSessionId(newStream.session_id);
      }  

   }
   React.useEffect(() => {
    const fetchData = async () => {
      fetchuserDetails();
      fetchactivestreamers();
      fetchstreamerDetails();
    };  
    fetchData();
  }, []);
  
  React.useEffect(() => {
    const handleJoinSession = () => {
      const ovReact = new OpenViduReactNativeAdapter();
      ovReact.initialize();
      joinSession();
      updateviewer();
    };
  
    const handleSetPasswordModal = () => {
      setpswd(activeusers.password);
      setPasswordModalVisible(true);
    };
  
    const handleSetCrownsModal = () => {
      setCrownsModalVisible(true);
    };
  
     //fetchuserDetails();
     //fetchactivestreamers();
     //fetchstreamerDetails();
  
    if (!streamData || (streamData.session_data === "" && streamData.session_id === "" && streamData.token_url === "")) {
      if (activeusers.session_type === 'privatepassword') {
       // console.log('Enter into useeffect if', activeusers.paidviewer);
        const paidviewerlist = activeusers.paidviewer;
        if (paidviewerlist != null) {
          const condition = paidviewerlist.indexOf(uid);
          if (condition >= 0) {
            console.log('Enter into useeffect if inside condition', activeusers.paidviewer);
            handleJoinSession();
          } else {
            handleSetPasswordModal();
          }
        } else {
          handleSetPasswordModal();
        }
      } else if (activeusers.session_type === 'privatecrowns') {
        const paidviewerlist = activeusers.paidviewer;
        if (paidviewerlist != null) {
          const condition = paidviewerlist.indexOf(uid);
          if (condition >= 0) {
            handleJoinSession();
          } else {
            handleSetCrownsModal();
          }
        } else {
          handleSetCrownsModal();
        }
      } else {
        handleJoinSession();
      }
    } else {
      // Init state variables on swipe     
        navigation.replace('swipeLive', { activeusers: streamData });
  
    }
  
    return () => {
      exitStreamAudio();
    };
  }, [sessionId]);
  
 
  React.useEffect(() => {
    // Code that depends on the updated state
    //console.log("OV.initSession()",ovsession);
    streamsession();
  }, [ovsession]);
 
  async function checkAndroidPermissions() {
    try {
      const camera = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'OpenVidu needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const audio = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Permission',
          message: 'OpenVidu needs access to your microphone',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const storage = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'STORAGE',
          message: 'OpenVidu  needs access to your storage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (camera === PermissionsAndroid.RESULTS.GRANTED) {
        // // console.log('You can use the camera');
      } else {
        // // console.log('Camera permission denied');
      }
      if (audio === PermissionsAndroid.RESULTS.GRANTED) {
        // // console.log('You can use the audio');
      } else {
        // // console.log('audio permission denied');
      }
      if (storage === PermissionsAndroid.RESULTS.GRANTED) {
        // // console.log('You can use the storage');
      } else {
        // // console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  async function joinSession() {
    // --- 1) Get an OpenVidu object ---
    const parsedSession = parse(sessionData);
    // // console.log('pppaprppapappf =======', props.selected);
    // // console.log('uname');
    // console.log('pppaprppapappf =======', {
    //   parsedSession,
    // });
    OV = new OpenVidu();
    OV.enableProdMode();
    //setentering(true);
    // // console.log("OV.initSession()",OV.initSession());
    // --- 2) Init a session ---
    ses = OV.initSession();
    setOvsession(ses);      
  }
  async function streamsession() {
   //const mySession = ses;
    setx(1);
    // // console.log('streamsession',mySession);
    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    InCallManager.setSpeakerphoneOn(true);
    ovsession.on('streamCreated', async (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
    
     
      subscriber = await ovsession.subscribeAsync(
        event.stream,
        undefined,
      );
      setsubscribers(Array.from(subscribers));
      subscribers.push(subscriber);      
      // Update the state with the new subscribers
      setsubscribers(subscribers);
      setFlag(1);
    });
    // On every Stream destroyed...
    ovsession.on('streamDestroyed', (event) => {
      event.preventDefault();
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream);
    });
    
    ovsession.on('sessionDisconnected', (event) => {
      if (event.reason === 'networkDisconnect') {
        console.warn('Dang-it... You lost your connection to the session');
        exitStreamAudio();
      } else {
        // Disconnected from the session for other reason than a network drop
        exitStreamAudio();
      }
    });
    // --- 4) Connect to the session with a valid user token ---
    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    const {
      data: { token },
    } = await createSessionToken({
      session_id: sessionId, // nbvhjdfghdgfjh
      role: 'SUBSCRIBER',
    });
    //console.log({"token":tokenUrl});
    const token_url = tokenUrl;
    const urlParams = new URLSearchParams(token_url);
    const token_id = urlParams.get('token');

    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    try {
      await ovsession.connect(token, {        
        clientData: auth.user.displayName || auth.user._user.displayName,
      });
      //setentering(false);
    } catch (error) {
       console.log(
        'There was an error connecting to the session:',
         error.code,
         error.message,
       );
    }
    if (Platform.OS === 'android') {
      await checkAndroidPermissions();
    }
    // --- 5) Get your own camera stream ---
    // if (role !== 'SUBSCRIBER') {
    //   const properties = {
    //     audioSource: undefined, // The source of audio. If undefined default microphone
    //     videoSource: undefined, // The source of video. If undefined default webcam
    //     publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
    //     publishVideo: true, // Whether you want to start publishing with your video enabled or not
    //     resolution: '640x480', // The resolution of your video
    //     frameRate: 30, // The frame rate of your video
    //     insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
    //   };
    //   //console.log("publisher","testing")
    //   // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
    //   // element: we will manage it on our own) and with the desired propertiesç
    //   const publisher = await OV.initPublisherAsync(
    //     undefined,
    //     properties,
    //   );
    //   // // console.log({publisher});
    //   // --- 6) Publish your stream ---
    //   // Set the main video in the page to display our webcam and store our Publisher
    //   setmainStreamManager(publisher);
      
    //   setvideoSource(!properties.videoSource ? '1' : properties.videoSource);
    //   //sessionpublisher();
    //   mySession.publish(publisher);
    // }
    try {
      await addSubscriber({
        // id: this.props.user.userId || this.props.user._user.userId,
        id: uid,
        // user_name: this.props.user.displayName,
        user_name: username != null? username: 'random',
        stream_token_id: token_id,
      });
    } catch (error) {
      console.log(
        'There was an error connecting to the session:',
         error.code,
         error.message,
       );
    }
  }

  function deleteSubscriber(stream) {
    setsubscribers(Array.from(subscribers));
   
    // var subscribers = Array.from(subscribers);
    const index = subscribers.indexOf(stream.streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setsubscribers(subscribers);
    }
  }
 
  // call leave and then call publisher()

  async function leaveSession() {


    const mySession = ses;
    //InCallManager.setSpeakerphoneOn(false); 
    // console.log('************my session Data 1234567890',mySession);

    // const urlParams = new URLSearchParams(mySession.options.participantId);
    // const token_id = urlParams.get('token');
    // // console.log('************my session',{token_id});
    // const token_id = props.id;
    if (mySession) {
       console.log('************ disconnect',mySession);
       setFlag(0);
      mySession.unsubscribe(subscriber);
      //mySession.disconnect();
      // props.navigation.navigate('Ended');
      
    }
    // Empty all properties...
    // setTimeout(() => {
    //   OV = null;
    //   setsession('undefined');
    //   setsubscribers([]);
    //   setmySessionId('SessionA');
    //   setmyUserName('Participant' + Math.floor(Math.random() * 100));
    //   setmainStreamManager('undefined');
    //   setpublisher('undefined');
    // });

    // try {
    //   await deleteActiveSubscriber({
    //     id: token_id,
    //     earned_crowns: 2000,
    //   });
    // } catch (error) {
    //   // // console.log('error deleting user from stream', error);
    // }
  }
 


  // until here is subStream


  let makeGiftPopVisible = () => {
    setGiftPopVisible(!giftPop);
  }
  let updateleavestream = () => {
    setleavestream(!leavestream);
    // // console.log('updateleavestream', leavestream);
   
    ses.capabilities.forceDisconnect= true;
    subscriber.subscribeToAudio(false);
  }

  let makeErrorPopVisible = (data) => {
    if (data == true) {
      setErrorPopVisibility(true);
    } else {
      setErrorPopVisibility(false);
    }
  };
  let makeViewerPopVisible = (data) => {
    if (data == true) {
      setViewerslistPopVisibility(true);
    } else {
      setViewerslistPopVisibility(false);
    }
  };
  let setMessageVisible = () => {
    setMessageBoxVisibility(false);
  };
  const handleAddGift = async (crowns) => {
    const token_url = item.token_url;
    const urlParams = new URLSearchParams(token_url);
    const token_id = urlParams.get('token');
    // // console.log({ token_id });
    // // console.log('add gift console');
    try {
      await addGiftToDb({
        id: auth?.userId,
        crowns_spent: crowns,
        stream_token_id: token_id,
      });
    } catch (error) {
      // console.log('error adding gift', error);
    }
  };

  async function updateviewer() {
    const viewerid = [uid];
    try {
      await updateviewerlist({
        id: token_id,
        viewerlist: viewerid
      })
      // // console.log('viewer updated');
    } catch (error) {
      // // console.log('error while updating viewerlist', error);
    }
  }
  async function fetchuserDetails() {
    /*for getting user info*/
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        // // console.log('error');
      }
      else {
        // // console.log('Data from db',userinfo);
        setUsername(userinfo[0].name);
        setBalance(userinfo[0].wallet);
        
        // // console.log('username form Liveshow', username);
      }
    }
    catch (error) {
      // console.log('Error while fetching user data', error);
    }
  }
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      fadeOut();
    }, 500);
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  };
  async function deleteviewer() {
    const viewerid = [uid];
    try {
      await deleteviewerlist({
        id: token_id,
        vieweruid: viewerid,
      })
      // props.streamerstatus(true);
    } catch (error) {
      // console.log('error while deleting user from stream', error);
    }
  }
  // async function updatesubscriber() {
  //   try {
  //     await updatesubscriberstatus({
  //       id,
  //       status: 'INACTIVE',
  //       userid: uid,
  //     })
  //   } catch (error) {
  //     // console.log('error while deleting user from stream', error);
  //   }
  // }

  function liveChatMessages() {
    // const { userName, imgName, roomId, giftCoin, times } = data;
    // // console.log('testing ', liveGifts);
    if (liveGifts.imageName == "" && liveGifts.userName == "" && liveGifts.times == "") {
      // // console.log("object", emptyData);
    }
    else {
      setLiveGifts((liveGifts) => [
        ...liveGifts,
        {
          imageName: imageName,
          userName: uname,
          times: times,
        },
      ]);
    }
    setPreviousGift(lastGift);
  }
  React.useEffect(() => {
    if (imageName != null && uname != null && times != 0) {
      if (imageName == previousGift.imageName && uname == previousGift.userName) {
        let len = liveGifts.length;
        let liveGiftDatas = liveGifts.slice(0, len - 1);
        let lastData = liveGifts[len - 1];
        lastData.times = lastGift.times;
        liveGiftDatas.push(lastData);
        // // console.log("liveGiftDatas",liveGiftDatas);
        setLiveGifts(liveGiftDatas);
        setPreviousGift(lastGift);
      }
      else {
        liveChatMessages();
      }
    }
  }, [giftCoinCount]);
  React.useEffect(() => {
    SocketManager.instance.listenGiftCount((count) => {
      setGiftCoinCount(prevCount => {
        // // console.log('previos count',prevCount)
        return prevCount + count;
      })
      // setCcount(count + 1);
      // // console.log('giftcoincount',count);
    });
  }, [])
  useEffect( () => {
    
    if (username != 'Random') {
      SocketManager.instance.emitJoinRoom({
        userName: username,
        tokenId: token_id,
      });
    }
    SocketManager.instance.listenSendGift((data) => {
      // makeGiftPopVisible(false);
      fadeIn();
      // setHeartCount(prevState => prevState + 10);
      const { userName, imgName, roomId, giftCoin, times } = data;
      
      setLastGift({
        imageName: imgName,
        userName: userName,
        times: times,
      });
      // liveChatMessages(data);
      setImageName(imgName);
      setTimes(times);
      setUname(userName);
      setUserid(roomId);
      setGiftvalue(giftCoin);
      // if(giftvalue >= 1000){
      //   setImagesize(true);
      // }else{
      //   setImagesize(false);
      // }
      
        var x = {
          userName: data.userName,
          imgName: data.imgName,
          giftCoin: data.giftCoin,
          times: data.gifts
        }
        multiData.push(x);
      
      
      // // console.log("multiData***********", multiData);
      // // console.log('LiveShow from use effect', data);
      // // console.log('LiveShow from use effect', count);
      // // console.log(userName, imgName, userid + 'LiveShow from use effect');
    });
  }, [username]);

   // getting the LiveStream List
   async function fetchactivestreamers() {
    try {
      const users = await getActiveStreams();
      setStreamerList(users);
    // console.log("users:", users);
    }
     catch (error) {
      // console.log('error in fetching active streamers', error);
    }
  }

  async function fetchstreamerDetails() {
    try {
      const userinfo = await selectUser({ uid: activeusers.session_id });
      if (userinfo.error) {
        console.log('error');
      } else {
        console.log('Response from goliveprivatecrowns', userinfo);
        setPearlbalance(userinfo[0].pearl_count);
        console.log('Pearlbalance', pearlbalance);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

  

  function threelineviewcondition() {
    if (
      times != 0
      ) {
      return <AutoScrollFlatList
        style={{
          width: '100%',
          height: 240,
        }}
        // keyExtractor={(liveGifts) => liveGifts.id}
        showScrollToEndIndicator={false}
        scrollEnabled={false}
        data={liveGifts}
        renderItem={({ item }) => (
          <Animated.View
            style={[
              styles.fadingContainer,
              {
                opacity: fadeAnim,
                marginLeft: 0,
                display: 'flex',
                width: '65%',
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                // height: 100,
                justifyContent: 'center',
                // transform: [{
                //   translateX: fadeAnim.interpolate({
                //     inputRange: [0, 1],
                //     outputRange: [600, 1]
                //   }),
                // }],
              },
            ]}
          >
            <View style={{
              // backgroundColor:'gold',
              height: 80
            }}>
              <Text
                style={{
                  color: 'yellow',
                  alignSelf: 'flex-start',
                  alignContent: 'center',
                  justifyContent: 'center', //Centered horizontally
                  alignItems: 'center', //Centered vertically
                  flex: 1,
                  textAlignVertical: 'center',
                  flexDirection: 'row',
                  padding: 20,
                  // borderRadius:2,
                  position: 'relative',
                  padding: 2,
                  fontWeight: '700',
                  marginTop: 0,
                  // backgroundColor: 'rgba(0,0,0,0.5)',
                  width: '96%'
                }}
              >
                {item.userName} { }
                <Text
                  style={{
                    fontWeight: '100'
                  }}> Sent</Text>
                <Text
                  style={{
                    fontSize: 18
                  }}
                > X </Text>
                <Text
                  style={{
                    fontSize: 24
                  }}
                > {item.times} </Text>
              </Text>
              <Image
                source={gif[item.imageName]}
                style={{
                  width: 70,
                  height: 70,
                  bottom: 1,
                  right: 5,
                  alignSelf: 'flex-end',
                  justifyContent: 'flex-start',
                  alignContent: 'flex-start',
                  alignItems: 'flex-start',
                  flexDirection: 'row',
                  backgroundColor: 'rgba(0,0,0,1)',
                  borderRadius: 100,
                  position: 'absolute',
                }}
              />
            </View>
          </Animated.View>
        )}></AutoScrollFlatList>
    }else {
      return null;
    }
    }
  
 
  // // console.log(heartCount);
  let countHearts = (count) => {
    setCountHeart((count) => count + 1);
    setImageName('like1');
  };
 
    const config = {
      velocityThreshold: 0.1,
      directionalOffsetThreshold: 80,
    };
    return (
    <View >
              <TouchableHighlight onPress={()=> {setISVisible(!isVisible);}}   style={styles1.touchableOpacityStyle}>
                  <Image
                  // FAB using TouchableOpacity with an image
                  // For online image
                  source={{
                  uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
                  }}
                  // For local image
                  //source={require('./images/float-add-icon.png')}
                  style={styles1.floatingButtonStyle}
                  />
                </TouchableHighlight>

              <GestureRecognizer       
                     
                      config={config}
                      onSwipeUp={() => {          
                        swipeStream();
                      }}
                      //config={config}
                      onSwipeDown={() => {          
                        swipeStream();
                      }}

                      onLongPressRelease={() => {          
                        swipeStream();
                      }}>
                     
                
      
        {auth.user &&  (

       <ScrollView style={{
        top: 0,
        height: '100%',
        backgroundColor: '#000',
        display: 'flex' }}
        >
        <View
          style={[styles.container, {
            flexDirection: 'row',
            flexWrap: 'wrap' }]}
            >
           {subscribers.map((item, index) => {
              return (
                <View key={index}>
                  {/* <Text style={{color: '#fff'}}>
                      {getNicknameTag(item.stream)}
                    </Text> */}
                  
                  <RTCView
                    zOrder={0}
                    objectFit={'cover'}
                    style={styles.selfView}
                    streamURL={item.stream.getMediaStream().toURL()}
                  />
                </View>
              );
            })}
         </View>
      </ScrollView>
        )}

    </GestureRecognizer> 
        {/* for(i=0;i<multiData.length;i++){} */}
        <View
          style={{
            alignItems: 'flex-start',
            position: 'absolute',
            alignSelf: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            top: '30%',
            width: '100%'
          }}
        >
          {threelineviewcondition()}
          {/* <Text
           style={{
             color: 'white',
           }}
          >Test</Text> */}
          {/* {condition()} */}
        </View>

        <Header
          visible={isVisible}
          tokenid={token_id}
          streamstatus={updateleavestream}
          modalstatus={modalstatus}
          audioSetting={exitStreamAudio}
        />
        <Info
          visible={isVisible}
          viewListVisible={makeViewerPopVisible}
          viewersPop={viewerslistPop}
          tokenid={token_id}
          audioSetting={exitStreamAudio}
        />

        {/* <ListViewer viewListVisible={makeViewerPopVisible} viewersPop={viewerslistPop}/> */}
        <Sidebar
          visible={isVisible}
          giftPopVisibility={makeGiftPopVisible}
          trackHeartCount={countHearts}
          errorPopVisibility={makeErrorPopVisible}
          userId={uid}
          tokenid={token_id} 
          audioSetting={exitStreamAudio}         
        />

        <LiveChat
          visible={isVisible}
          messageVisibility={giftPop === true ? true : false}
          userId={uid}
          tokenid={token_id}
        />
        <Footertab
          visible={isVisible}
          footerOnGiftPop={giftPop === true ? true : false}
          tokenid={token_id}
        />
        <Livegift
          visible={giftPop}
          giftPopUpVisibility={makeGiftPopVisible}
          // addGift={handleAddGift}
          username={username}
          walletbal={balance}
          tokenid={token_id}
        />
        <AddFriendFollowButton
          visible={errorPop}
          errorPopVisibility={makeErrorPopVisible}
        />
        {/* <Viewerslist visible={viewerslistPop}/> */}
      
        

      <Modal
        style={styles.modalStyle}
        animationType="slide"
        transparent={true}
        visible={passwordModalVisible}
        onRequestClose={() => {
          setPasswordModalVisible(!passwordModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>It's Private Live, Enter password to continue</Text> 
          
          <View style={styles.modalView}>       
            <TextInput
                style={styles.input}                
                onChangeText={(number) => {
                  setNumber(number);
                }}
                value={number}
                mode="flat"
                placeholder="Enter Password"
                keyboardType="numeric"
                placeholderStyle={{ color: '#fff' }}
                placeholderTextColor={'#fff'}
                // onSubmitEditing={()=>{              
                // //setPasswordModalVisible(!passwordModalVisible);
                // checkpassword();
                // }}
              />    
              <TouchableHighlight  
               style={styles.buttonNo}                   
                  onPress={() => { 
                    checkpassword();
                   
                  }}
                >
                  <Text style={styles.textStyle}>Submit</Text>
                </TouchableHighlight> 
              <TouchableHighlight 
              
              onPress={()=> {                
              swipeStream();    
              setPasswordModalVisible(!passwordModalVisible);          
              }} 
              underlayColor="transparent"
              //style={styles.swipe}
                      >
                  <Image style={{ flex: 1, resizeMode: 'contain' }}
                  // FAB using TouchableOpacity with an image
                  // For online image
                  source={require('./assets/swipeupdown.webp')}  
                  // For local image
                  //source={require('../../../assets/avatar_3.png')}                  
                  />
                </TouchableHighlight>

            </View> 
        </View>
      </Modal>   
      
      

      <Modal
        style={styles.modalStyle}
        animationType="slide"
        transparent={true}
        visible={crownsModalVisible}
        onRequestClose={() => {
          setCrownsModalVisible(!crownsModalVisible);
        }}
      >
          <View style={styles.centeredView}>
            <Text style={styles.modalText}>It's Private stream,It requires {crownvalue} crowns.</Text>    
            
            <View style={styles.modalView}>
                <TouchableHighlight          
                  style={styles.buttonNo1}         
                  onPress={() => { 
                    updatebalance();
                    setCrownsModalVisible(!crownsModalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Proceed</Text>
                </TouchableHighlight>

                <TouchableHighlight onPress={()=> {                
              swipeStream();    
              setCrownsModalVisible(!crownsModalVisible);         
              }} 
              underlayColor="transparent"
              style={styles.swipe}
                      >
                  <Image style={{ flex: 1, resizeMode: 'contain' }}
                  // FAB using TouchableOpacity with an image
                  // For online image
                  source={require('./assets/swipeupdown.webp')}  
                  // For local image
                  //source={require('../../../assets/avatar_3.png')}                  
                  />
                </TouchableHighlight>

            </View>
          </View>
      </Modal>   

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleWallet}
        onRequestClose={() => {
          setModalVisibleWallet(!modalVisibleWallet);
        }}
      >
        <View style={styles.centeredViewwallet}>
          <Text style={styles.modalText}>Your Wallet Balance is Low</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              
              style={[styles.buttonClose]}

              onPress={() => {
                SocketManager.instance.emitLeaveRoom({
                  userName: username,
                  tokenId: token_id                  
                });                
                setModalVisibleWallet(!modalVisibleWallet);
                exitStreamAudio();
                navigation.navigate('Live')
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>

            <TouchableHighlight
              
              style={[styles.buttonClose]}
              onPress={() => {
                setModalVisibleWallet(!modalVisibleWallet);
                navigation.navigate('topup')
              }}
            >
              <Text style={styles.textStyle}>Topup</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> 

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleWrongPswd}
        onRequestClose={() => {
          setModalVisibleWrongPswd(!modalVisibleWrongPswd);
        }}
      >
        <View style={styles.centeredViewwrongPwd}>
          <Text style={styles.modalTextpwd}>Enetered Wrong Password</Text>
          <View style={styles.modalView}>
            <TouchableHighlight              
              style={[styles.buttonClose]}
              onPress={() => {                   
                setModalVisibleWrongPswd(!modalVisibleWrongPswd);                
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
           
          </View>
        </View>
      </Modal> 
      


    </View>


    );
 
}
const styles = StyleSheet.create({

  //  below Styles for SurStream
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: '100%',
    height: '100%',
  },
  modalStyle:{
    zIndex: 2,
    position: 'absolute',
    //backgroundColor: 'rgba(0,0,0,0.5)',
    
  },
  selfView: {
    width: windowWidth,
    height: windowHeight,
  },
  remoteView: {
    width: 150,
    height: 150,
  },
  button: {
    padding: 10,
  },
  img: {
    flex: 1,
    width: 400,
    height: 200,
  },
  buttonContainer: {
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  modalText: {
    marginBottom: 2,
    //textAlign: "center",
    //flexDirection: 'column',
    color: '#000'
  },
  modalTextpwd:{
    marginBottom: 2,   
    fontWeight: "bold",
    color: '#FF0000'
  },
  modalTexttest: {
    marginBottom: 2,
    //textAlign: "center",
    //flexDirection: 'column',
    
    zIndex: 10,                  
    backgroundColor: 'rgba(0,0,0,0.1)',   
    color: '#FF0000'
  },
  input: {
    height: 40,    
    width: "40%",
    //backgroundColor: 'rgba(0,0,0,0.8)',
    borderColor: '#000',
    borderWidth: 2,
    color: '#fff',  
    padding: 3, 
    borderRadius: 5,
    marginBottom: 25,
    marginRight: 5,
    marginTop: 5   
  },
  centeredView: {   
    alignItems: "center",
    marginTop: '85%',
    backgroundColor: "#e7bf11",
    borderRadius: 5,        
    marginLeft: 20,
    marginRight: 20
},
centeredViewwallet:{
  alignItems: "center",
  marginTop: '85%',
  backgroundColor: "#e7bf11",
  borderRadius: 5,        
  marginLeft: 40,
  marginRight: 40
},
centeredViewwrongPwd:{
  alignItems: "center",
  marginTop: '60%',
  backgroundColor: "#e7bf11",
  borderRadius: 5,        
  marginLeft: 40,
  marginRight: 40
},
btnStyle: {
  //height: 40,    
  width: "60%",  
  //borderColor: '#000',
  //borderWidth: 2,
  color: '#fff',  
  padding: 3, 
  borderRadius: 20,
  margin: 10  
},
buttonClose: {
  backgroundColor: "black",  
  borderRadius: 15,
  color: '#fff', 
  padding: 3, 
  margin: 3,  
  width: '30%'
},
buttonNo: {
  height: 40,
  backgroundColor: "black",    
  borderRadius: 10,
  color: '#fff',  
  padding: 3,
  textAlign: 'center',
  marginRight: 15,  
  marginBottom: 25,
  marginTop: 5    
},
buttonNo1: {
  height: 40,
  width: '30%',
  backgroundColor: "black",    
  borderRadius: 10,
  color: '#fff',  
  padding: 3,
  textAlign: 'center',
  marginRight: 40,  
  marginBottom: 30  
},
swipe:{
  //marginRight: 20,
},
modalView: {
  flexDirection: 'row',
  //justifyContent: 'space-between',
  //paddingHorizontal: 16,
  //marginTop: 16,
},
textStyle: {
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center"
},

alertContainer: {
  backgroundColor: "#e7bf11",
  padding: 20,
},
alertText: {
  color: "#FF0000",
  fontSize: 18,
  fontWeight: 'bold',
},


});