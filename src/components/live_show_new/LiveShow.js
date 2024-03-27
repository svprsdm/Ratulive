import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
import Video from 'react-native-video';
import SocketManager from '../socket/socketManager';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Header from './component/Header';
import Info from './component/Info';
import Sidebar from './component/SideBar';
import Footertab from './component/Footertab';
import Livegift from './Livegift';
import LiveChat from './LiveChat';
import AddFriendFollowButton from '../AddFriendFollow/AddFriendFollowButton';
// reverted
// import {
//   OpenVidu,
//   OpenViduReactNativeAdapter,
//   RTCView,
// } from 'openvidu-react-native-adapter';
// import {
//   addSubscriber,
//   createSessionToken,
//   deleteActiveSubscriber,
// } from '../../utils/api';
// import {parse} from 'flatted';
// reverted
import { gif } from './Gif';
import Viewerslist from '../ViewersList/Viewerslist';
import ListViewer from './component/ListViewer';
import Stream from '../LiveStream/Stream';
import SubStream from '../LiveStream/SubStream';
import { useAuth } from '../../hooks/Auth';
import KeepAwake from 'react-native-keep-awake';
import { addGiftToDb, selectUser, getActiveStreams, getStreamer, updateviewerlist, deleteviewerlist } from '../../utils/api';
import { ToastAndroid } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function LiveShow({ route, navigation }, shouldBeAwake) {
  if (shouldBeAwake) { KeepAwake.activate(); }
  else { KeepAwake.deactivate(); }
  const { activeusers } = route.params;
  const token_url = activeusers.token_url;
  const urlParams = new URLSearchParams(token_url);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [privatemodepassword, setPrivatemodepassword] = useState(false);
  const [privatemodechips, setPrivatemodechips] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const btnHandler = () => {
    setShouldShow(previousState => !previousState);
  };
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
  const [activeStreamers, setActiveStreamers] = useState();
  const [nextactiveStreamers, setNextactiveStreamers] = useState(0);
  const [giftCoinCount, setGiftCoinCount] = useState(0);
  const [ccount, setCcount] = useState(0);
  const [token_id, settoken_id] = useState(urlParams.get('token'));
  const [liveGifts, setLiveGifts] = useState([
    // { imageName: '', userName: '', times: '' },
  ]);
  const [lastGift, setLastGift] = useState({
    imageName: '', userName: '', times: ''
  });
  const [previousGift, setPreviousGift] = useState({
    imageName: '', userName: '', times: ''
  });
  const auth = useAuth();
  const { uid } = auth?.user;
  // console.log('Liveshow auth console', { auth });
  var multiData = [];
  // const {item} = route.params?.data;
  //  settoken_id(urlParams.get('token'));
  // console.log({"token_id by vinoth":token_id});
  // reverted
  // const[mySessionId,setmySessionId] = useState(auth.user?._users?.displayName ?? '');
  // const[myUserName,setmyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  // const[session,setsession] = useState(undefined);
  // const[mainStreamManager,setmainStreamManager]= useState(undefined);
  // const[subscribers,setsubscribers] = useState([]);
  // const[role,setrole] =  useState('SUBSCRIBER');
  // const[mirror,setmirror] =  useState(false);
  // const[videoSource,setvideoSource] = useState(undefined);
  // const[video,setvideo] = useState();
  // const[audio,setaudio] = useState();
  // const[error,seterror] = useState();
  // const[viewer,setviewer] = useState();
  // const[kickedoutlist,setkickedoutlist] = useState('');
  // const[entering,setentering]= useState();
  // const[publisher,setpublisher]= useState();
  // const[x,setx]=useState(0);
  // reverted
  // console.log('Liveshow**********', { token_id });
  // console.log('live show***********', { route });
  // React.useLayoutEffect(()=>{
  //   const ovReact = new OpenViduReactNativeAdapter();
  //   ovReact.initialize();
  // },[])
  // useEffect(()=>{
  //   joinSession();
  //   return () => {
  //     leaveSession();
  //   }
  // },[x])
  React.useEffect(() => {
    fetchuserDetails();
  });
  React.useEffect(() => {
    updateviewer();
  }, []);
  let makeGiftPopVisible = () => {
    setGiftPopVisible(!giftPop);
  }
  let updateleavestream = () => {
    setleavestream(!leavestream);
    // console.log('updateleavestream', leavestream);
    //  fetchactivestreamers();
  }
  // let makeGiftPopVisible = (data) => {
  //   if (data === true) {
  //     setGiftPopVisible(true);
  //   }
  //   else {
  //     setGiftPopVisible(false);
  //   }
  // };
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
    // console.log({ token_id });
    // console.log('add gift console');
    try {
      await addGiftToDb({
        id: auth?.userId,
        crowns_spent: crowns,
        stream_token_id: token_id,
      });
    } catch (error) {
      console.log('error adding gift', error);
    }
  };
  //   async function checkAndroidPermissions() {
  //     try {
  //       const camera = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message: 'OpenVidu needs access to your camera',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       const audio = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //         {
  //           title: 'Audio Permission',
  //           message: 'OpenVidu needs access to your microphone',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       const storage = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'STORAGE',
  //           message: 'OpenVidu  needs access to your storage ',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (camera === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the camera');
  //       } else {
  //         console.log('Camera permission denied');
  //       }
  //       if (audio === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the audio');
  //       } else {
  //         console.log('audio permission denied');
  //       }
  //       if (storage === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the storage');
  //       } else {
  //         console.log('storage permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  //   function joinSession() {
  //     // --- 1) Get an OpenVidu object ---
  //     const parsedSession = parse(activeusers.session_data);
  //     // console.log('pppaprppapappf =======', props.selected);
  //     // console.log('uname');
  //     console.log('pppaprppapappf =======', {
  //       parsedSession,
  //     });
  //     OV = new OpenVidu();
  //     OV.enableProdMode();
  //     setentering(true);
  //     // --- 2) Init a session ---
  //     setsession(OV.initSession());
  //     streamsession();
  //   }
  //   async function streamsession(){
  //     console.log('streamsession');
  //     const mySession = session;
  //     setx(1);
  //     console.log('streamsession',mySession);
  //     // --- 3) Specify the actions when events take place in the session ---
  //     // On every new Stream received...
  //     mySession.on('streamCreated', async (event) => {
  //       // Subscribe to the Stream to receive it. Second parameter is undefined
  //       // so OpenVidu doesn't create an HTML video by its own
  //       console.log('inside streamer');
  //       const subscriber = await mySession.subscribeAsync(
  //         event.stream,
  //         undefined,
  //       );
  //       setsubscribers(Array.from(subscribers)) ;
  //       subscribers.push(subscriber);
  //       // Update the state with the new subscribers
  //       setsubscribers(subscribers);
  //     });
  //     // On every Stream destroyed...
  //     mySession.on('streamDestroyed', (event) => {
  //       event.preventDefault();
  //       // Remove the stream from 'subscribers' array
  //       deleteSubscriber(event.stream);
  //     });
  //     // --- 4) Connect to the session with a valid user token ---
  //     // 'getToken' method is simulating what your server-side should do.
  //     // 'token' parameter should be retrieved and returned by your own backend
  //     const {
  //       data: {token},
  //     } = await createSessionToken({
  //       session_id: activeusers.session_id,
  //       role: 'SUBSCRIBER',
  //     });
  //     const token_url = activeusers.token_url;
  //     const urlParams = new URLSearchParams(token_url);
  //     const token_id = urlParams.get('token');
  //     console.log({token_id});
  //     // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
  //     // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
  //     try {
  //       await mySession.connect(token, {
  //         clientData:
  //         auth.user.displayName || auth.user._user.displayName,
  //       });
  //       setentering(false);
  //     } catch (error) {
  //       console.log(
  //         'There was an error connecting to the session:',
  //         error.code,
  //         error.message,
  //       );
  //     }
  //     if (Platform.OS === 'android') {
  //       await checkAndroidPermissions();
  //     }
  //     // --- 5) Get your own camera stream ---
  //     if (role !== 'SUBSCRIBER') {
  //       const properties = {
  //         audioSource: undefined, // The source of audio. If undefined default microphone
  //         videoSource: undefined, // The source of video. If undefined default webcam
  //         publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
  //         publishVideo: true, // Whether you want to start publishing with your video enabled or not
  //         resolution: '640x480', // The resolution of your video
  //         frameRate: 30, // The frame rate of your video
  //         insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
  //       };
  //       // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
  //       // element: we will manage it on our own) and with the desired propertiesç
  //       const publisher = await OV.initPublisherAsync(
  //         undefined,
  //         properties,
  //       );
  //       console.log({publisher});
  //       // --- 6) Publish your stream ---
  //       // Set the main video in the page to display our webcam and store our Publisher
  //       setmainStreamManager(publisher);
  //       setvideoSource(!properties.videoSource ? '1' : properties.videoSource);
  //       sessionpublisher();
  //     }
  //     try {
  //       await addSubscriber({
  //         // id: this.props.user.userId || this.props.user._user.userId,
  //         id: uid,
  //         // user_name: this.props.user.displayName,
  //         user_name: username,
  //         stream_token_id: token_id,
  //       });
  //     } catch (error) {
  //       console.log(
  //         'There was an error adding user to db:',
  //         error.code,
  //         error.message,
  //       );
  //     }
  // }
  // function sessionpublisher(){
  //   mySession.publish(publisher);
  // }
  //   function getNicknameTag(stream) {
  //     // Gets the nickName of the user
  //     console.log({stream});
  //     try {
  //       if (
  //         stream.connection &&
  //         JSON.parse(stream.connection.data) &&
  //         JSON.parse(stream.connection.data).clientData
  //       ) {
  //         return JSON.parse(stream.connection.data).clientData;
  //       }
  //     } catch (error) {}
  //     return '';
  //   }
  //   function deleteSubscriber(stream) {
  //     setsubscribers(Array.from(subscribers)) ;
  //     // var subscribers = Array.from(subscribers);
  //     const index = subscribers.indexOf(stream.streamManager, 0);
  //     if (index > -1) {
  //       subscribers.splice(index, 1);
  //       setsubscribers(subscribers);
  //     }
  //   }
  //   async function leaveSession() {
  //     // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
  //     const mySession = session;
  //     console.log('************my session',mySession);
  //     const urlParams = new URLSearchParams(mySession.options.participantId);
  //     const token_id = urlParams.get('token');
  //     console.log('************my session',{token_id});
  //     // const token_id = props.id;
  //     if (mySession) {
  //       // console.log('************ disconnect',mySession);
  //       mySession.disconnect();
  //       // props.navigation.navigate('Ended');
  //     }
  //     // Empty all properties...
  //     setTimeout(() => {
  //       OV = null;
  //       setsession(undefined);
  //       setsubscribers([]);
  //       setmySessionId('SessionA');
  //       setmyUserName('Participant' + Math.floor(Math.random() * 100));
  //       setmainStreamManager(undefined);
  //       setpublisher(undefined)
  //     });
  //     // try {
  //     //   await updatesubscriberstatus({
  //     //     id: token_id,
  //     //     status: 'INACTIVE'
  //     //   })
  //     // } catch (error) {
  //     //   console.log('error while deleting user from stream', error);
  //     // }
  //     try {
  //       await deleteActiveSubscriber({
  //         id: token_id,
  //         earned_crowns: 2000,
  //       });
  //     } catch (error) {
  //       console.log('error deleting user from stream', error);
  //     }
  //   }
  //   function toggleCamera() {
  //     /**
  //      * _switchCamera() Method provided by react-native-webrtc:
  //      * This function allows to switch the front / back cameras in a video track on the fly, without the need for adding / removing tracks or renegotiating
  //      */
  //     const camera = mainStreamManager.stream
  //       .getMediaStream()
  //       .getVideoTracks()[0];
  //     if (!!camera) {
  //       camera._switchCamera();
  //       setmirror(!mirror)
  //     }
  //     /**
  //      * Traditional way:
  //      * Renegotiating stream and init new publisher to change the camera
  //      */
  //     /*
  //         this.OV.getDevices().then(devices => {
  //             console.log("DEVICES => ", devices);
  //             let device = devices.filter(device => device.kind === 'videoinput' && device.deviceId !== this.state.videoSource)[0]
  //             const properties = {
  //                 audioSource: undefined,
  //                 videoSource: device.deviceId,
  //                 publishAudio: true,
  //                 publishVideo: true,
  //                 resolution: '640x480',
  //                 frameRate: 30,
  //                 insertMode: 'APPEND',
  //             }
  //             let publisher = this.OV.initPublisher(undefined, properties);
  //             this.state.session.unpublish(this.state.mainStreamManager);
  //             this.setState({
  //                 videoSource : device.deviceId,
  //                 mainStreamManager: publisher,
  //                 mirror: !this.state.mirror
  //             });
  //             this.state.session.publish(publisher);
  //         });
  //         */
  //   }
  //   function muteUnmuteMic() {
  //     mainStreamManager.publishAudio(!audio);
  //     setaudio(!audio);
  //   }
  //   function muteUnmuteCamera() {
  //     console.log('inside mute camera');
  //     mainStreamManager.publishVideo(!video);
  //     setvideo(!video);
  //   }
  async function updateviewer() {
    const viewerid = [uid];
    try {
      await updateviewerlist({
        id: token_id,
        viewerlist: viewerid
      })
      // console.log('viewer updated');
    } catch (error) {
      // console.log('error while updating viewerlist', error);
    }
  }
  async function fetchuserDetails() {
    /*for getting user info*/
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        // console.log('error');
      }
      else {
        // console.log('Data from db',userinfo);
        setUsername(userinfo[0].name);
        // console.log('username form Liveshow', username);
      }
    }
    catch (error) {
      console.log('Error while fetching user data', error);
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
    }, 5000);
  };
  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
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
      console.log('error while deleting user from stream', error);
    }
  }
  async function updatesubscriber() {
    try {
      await updatesubscriberstatus({
        id,
        status: 'INACTIVE',
        userid: uid,
      })
    } catch (error) {
      console.log('error while deleting user from stream', error);
    }
  }
  // function liveChatMessages(data) {
  //    const { userName, imgName, roomId, giftCoin, times } = data;
  //   setLiveGifts((liveGifts) => [
  //     ...liveGifts,
  //     {
  //       imageName: imgName,
  //       userName: userName,
  //       times: times,
  //     },
  //   ]);
  // }
  // function liveChatMessages() {
  //   // const { userName, imgName, roomId, giftCoin, times } = data;
  //   console.log('testing testing testing testing testing testing testing testing');
  //   setLiveGifts((liveGifts) => [
  //     ...liveGifts,
  //     {
  //       imageName: imageName,
  //       userName: uname,
  //       times: times,
  //     },
  //   ]);
  // }
  function liveChatMessages() {
    // const { userName, imgName, roomId, giftCoin, times } = data;
    // console.log('testing ', liveGifts);
    if (liveGifts.imageName == "" && liveGifts.userName == "") {
      // console.log("object", emptyData);
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
        // console.log("liveGiftDatas",liveGiftDatas);
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
        // console.log('previos count',prevCount)
        return prevCount + count;
      })
      // setCcount(count + 1);
      // console.log('giftcoincount',count);
    });
  }, [])
  useEffect(() => {
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
      // console.log('image and username',imgName,userName);
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
      // console.log("multiData***********", multiData);
      // console.log('LiveShow from use effect', data);
      // console.log('LiveShow from use effect', count);
      // console.log(userName, imgName, userid + 'LiveShow from use effect');
    });
  }, [username]);
  async function fetchactivestreamers() {
    try {
      const users = await getActiveStreams();
      if (users.error) {
        console.log('error');
      } else {
        setActiveStreamers(users);
        // console.log('activeusers************', users);
        // console.log('activeusers************ variable', activeStreamers);
        setActiveStreamers(users);
        if (users.length > 0) {
          for (let i = 0; i <= users.length; i++) {
            if (users[i].token_id == token_id) {
              const activeuser = users[i + 1];
              if (activeuser == null) {
                // console.log("active final stream",activeuser);
                settoken_id(users[0].token_id);
                // nextactiveStreamers(users[0]);
                setNextactiveStreamers(users[0]);
                // navigation.navigate('LiveShow', { activeusers: users[0] });
              } else {
                // nextactiveStreamers(activeuser);
                // console.log("active necxt stream",activeuser);
                settoken_id(activeuser.token_id);
                // token_id=activeuser.token_id;
                setNextactiveStreamers(activeuser);
                //  navigation.navigate('LiveShow', { activeusers: activeuser });
                // ToastAndroid.show('You reached the end', ToastAndroid.SHORT);
                // return null;
              }
            }
          }
        }
        // console.log(users[nextactiveStreamers + 1]);
      }
    } catch (error) {
      console.log('error in fetching active streamers', error);
    }
  }
  async function fetchactivestreamer() {
    try {
      const users = await getActiveStreams();
      if (users.error) {
        console.log('error');
      } else {
        setActiveStreamers(users);
        for (let i = 0; i <= users.length; i++) {
          if (users[i].token_id == token_id) {
            const activeuser = users[i - 1];
            if (activeuser != null) {
              // navigation.navigate('LiveShow', { activeusers: activeuser });
            } else {
              ToastAndroid.show('You reached the end', ToastAndroid.SHORT);
              return null;
            }
          }
        }
        // console.log(users[nextactiveStreamers + 1]);
      }
    } catch (error) {
      console.log('error in fetching active streamers', error);
    }
  }
  //   function threelineviewcondition(){
  //     if (giftvalue >= 1000 && giftvalue < 100000) {
  //      return  <AutoScrollFlatList
  //      style={{
  //        width: '100%',
  //        height: 240,
  //       }}
  //      // keyExtractor={(liveGifts) => liveGifts.id}
  //      showScrollToEndIndicator={false}
  //      scrollEnabled={false}
  //      data={liveGifts}
  //      renderItem={({ item }) => (
  //        <Animated.View
  //          style={[
  //            styles.fadingContainer,
  //            {
  //              opacity: fadeAnim,
  //              marginLeft: 0,
  //              display: 'flex',
  //              width: '65%',
  //              borderTopRightRadius: 50,
  //              borderBottomRightRadius: 50,
  //              // height: 100,
  //              justifyContent: 'center',
  //              // transform: [{
  //              //   translateX: fadeAnim.interpolate({
  //              //     inputRange: [0, 1],
  //              //     outputRange: [600, 1]
  //              //   }),
  //              // }],
  //            },
  //          ]}
  //        >
  //          <View style={{
  //            // backgroundColor:'gold',
  //            height: 80
  //          }}>
  //            <Text
  //              style={{
  //                color: 'yellow',
  //                alignSelf: 'flex-start',
  //                alignContent: 'center',
  //                justifyContent: 'center', //Centered horizontally
  //                alignItems: 'center', //Centered vertically
  //                flex: 1,
  //                textAlignVertical: 'center',
  //                flexDirection: 'row',
  //                padding: 20,
  //                // borderRadius:2,
  //                position: 'relative',
  //                padding: 2,
  //                fontWeight: '700',
  //                marginTop: 0,
  //                // backgroundColor: 'rgba(0,0,0,0.5)',
  //                width: '96%'
  //              }}
  //            >
  //              {item.userName} { }
  //              <Text
  //              style={{
  //                fontWeight: '100'
  //              }}> Sent</Text>
  //              <Text
  //                style={{
  //                  fontSize: 18
  //                }}
  //              > X </Text>
  //              <Text
  //                style={{
  //                  fontSize: 24
  //                }}
  //              > {item.times} </Text>
  //            </Text>
  //            <Image
  //              source={gif[item.imageName]}
  //              style={{
  //                width: 225,
  //                height: 225,
  //                bottom: -50,
  //                left:120,
  //                right: 5,
  //                alignSelf: 'flex-end',
  //                justifyContent: 'flex-start',
  //                alignContent: 'flex-start',
  //                alignItems: 'flex-start',
  //                flexDirection: 'row',
  //                backgroundColor: 'rgba(0,0,0,1)',
  //                borderRadius: 200,
  //                position: 'absolute',
  //              }}
  //            />
  //          </View>
  //        </Animated.View>
  //      )}></AutoScrollFlatList>
  //    } else if (giftvalue >= 100000) {
  //     return  <AutoScrollFlatList
  //     style={{
  //       width: '100%',
  //       height: 240,
  //      }}
  //     // keyExtractor={(liveGifts) => liveGifts.id}
  //     showScrollToEndIndicator={false}
  //     scrollEnabled={false}
  //     data={liveGifts}
  //     renderItem={({ item }) => (
  //       <Animated.View
  //         style={[
  //           styles.fadingContainer,
  //           {
  //             opacity: fadeAnim,
  //             marginLeft: 0,
  //             display: 'flex',
  //             width: '65%',
  //             borderTopRightRadius: 50,
  //             borderBottomRightRadius: 50,
  //             // height: 100,
  //             justifyContent: 'center',
  //             // transform: [{
  //             //   translateX: fadeAnim.interpolate({
  //             //     inputRange: [0, 1],
  //             //     outputRange: [600, 1]
  //             //   }),
  //             // }],
  //           },
  //         ]}
  //       >
  //         <View style={{
  //           // backgroundColor:'gold',
  //           height: 80
  //         }}>
  //           <Text
  //             style={{
  //               color: 'yellow',
  //               alignSelf: 'flex-start',
  //               alignContent: 'center',
  //               justifyContent: 'center', //Centered horizontally
  //               alignItems: 'center', //Centered vertically
  //               flex: 1,
  //               textAlignVertical: 'center',
  //               flexDirection: 'row',
  //               padding: 20,
  //               // borderRadius:2,
  //               position: 'relative',
  //               padding: 2,
  //               fontWeight: '700',
  //               marginTop: 0,
  //               // backgroundColor: 'rgba(0,0,0,0.5)',
  //               width: '96%'
  //             }}
  //           >
  //             {item.userName} { }
  //             <Text
  //             style={{
  //               fontWeight: '100'
  //             }}> Sent</Text>
  //             <Text
  //               style={{
  //                 fontSize: 18
  //               }}
  //             > X </Text>
  //             <Text
  //               style={{
  //                 fontSize: 24
  //               }}
  //             > {item.times} </Text>
  //           </Text>
  //           <Image
  //             source={gif[item.imageName]}
  //             style={{
  //               width: 500,
  //               height: 500,
  //               left:10,
  //               bottom: -350,
  //               right: 5,
  //               alignSelf: 'flex-end',
  //               justifyContent: 'flex-start',
  //               alignContent: 'flex-start',
  //               alignItems: 'flex-start',
  //               flexDirection: 'row',
  //               backgroundColor: 'rgba(0,0,0,1)',
  //               borderRadius: 200,
  //               position: 'absolute',
  //             }}
  //           />
  //         </View>
  //       </Animated.View>
  //     )}></AutoScrollFlatList>
  //    } else if (giftvalue < 1000) {
  //     return  <AutoScrollFlatList
  //     style={{
  //       width: '100%',
  //       height: 240,
  //      }}
  //     // keyExtractor={(liveGifts) => liveGifts.id}
  //     showScrollToEndIndicator={false}
  //     scrollEnabled={false}
  //     data={liveGifts}
  //     renderItem={({ item }) => (
  //       <Animated.View
  //         style={[
  //           styles.fadingContainer,
  //           {
  //             opacity: fadeAnim,
  //             marginLeft: 0,
  //             display: 'flex',
  //             width: '65%',
  //             borderTopRightRadius: 50,
  //             borderBottomRightRadius: 50,
  //             // height: 100,
  //             justifyContent: 'center',
  //             // transform: [{
  //             //   translateX: fadeAnim.interpolate({
  //             //     inputRange: [0, 1],
  //             //     outputRange: [600, 1]
  //             //   }),
  //             // }],
  //           },
  //         ]}
  //       >
  //         <View style={{
  //           // backgroundColor:'gold',
  //           height: 80
  //         }}>
  //           <Text
  //             style={{
  //               color: 'yellow',
  //               alignSelf: 'flex-start',
  //               alignContent: 'center',
  //               justifyContent: 'center', //Centered horizontally
  //               alignItems: 'center', //Centered vertically
  //               flex: 1,
  //               textAlignVertical: 'center',
  //               flexDirection: 'row',
  //               padding: 20,
  //               // borderRadius:2,
  //               position: 'relative',
  //               padding: 2,
  //               fontWeight: '700',
  //               marginTop: 0,
  //               // backgroundColor: 'rgba(0,0,0,0.5)',
  //               width: '96%'
  //             }}
  //           >
  //             {item.userName} { }
  //             <Text
  //             style={{
  //               fontWeight: '100'
  //             }}> Sent</Text>
  //             <Text
  //               style={{
  //                 fontSize: 18
  //               }}
  //             > X </Text>
  //             <Text
  //               style={{
  //                 fontSize: 24
  //               }}
  //             > {item.times} </Text>
  //           </Text>
  //           <Image
  //             source={gif[item.imageName]}
  //             style={{
  //               width: 70,
  //               height: 70,
  //               bottom: 1,
  //               right: 5,
  //               alignSelf: 'flex-end',
  //               justifyContent: 'flex-start',
  //               alignContent: 'flex-start',
  //               alignItems: 'flex-start',
  //               flexDirection: 'row',
  //               backgroundColor: 'rgba(0,0,0,1)',
  //               borderRadius: 100,
  //               position: 'absolute',
  //             }}
  //           />
  //         </View>
  //       </Animated.View>
  //     )}></AutoScrollFlatList>
  //    }
  // }
  function threelineviewcondition() {
    if (imageName != null && uname != null && times != 0) {
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
    } else {
      return null;
    }
  }
  function condition() {
    if (giftvalue >= 1000 && giftvalue < 100000) {
      return <View>
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
            fontSize: 20,
            // borderRadius:2,
            position: 'relative',
            padding: 2,
            fontWeight: '700',
            marginTop: 0,
            // backgroundColor: 'rgba(0,0,0,0.5)',
            width: '96%'
          }}
        >{uname} { }<Text
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
          > {times} </Text>
        </Text>
        <Image
          source={gif[imageName]}
          style={{
            width: 225,
            height: 225,
            left: 120,
            bottom: -50,
            alignSelf: 'flex-end',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            // backgroundColor:'rgba(0,0,0,1)',
            borderRadius: 200,
            position: 'absolute',
          }}
        />
      </View>
    } else if (giftvalue >= 100000) {
      return <View
        style={{
          top: -100
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
            fontSize: 20,
            // borderRadius:2,
            position: 'relative',
            padding: 2,
            fontWeight: '700',
            marginTop: 0,
            // backgroundColor: 'rgba(0,0,0,0.5)',
            width: '96%'
          }}
        >{uname} { }<Text
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
          > {times} </Text>
        </Text>
        <Image
          source={gif[imageName]}
          style={{
            width: 500,
            height: 500,
            left: 10,
            bottom: -350,
            alignSelf: 'flex-end',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            // backgroundColor:'rgba(0,0,0,1)',
            borderRadius: 200,
            position: 'absolute',
          }}
        />
      </View>
    } else if (giftvalue < 1000) {
      return <View>
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
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '96%'
          }}
        >{uname} { }<Text
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
          > {times} </Text>
        </Text>
        <Image
          source={gif[imageName]}
          style={{
            width: 80,
            height: 80,
            bottom: -18,
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
    }
  }
  useEffect(() => {
    // getstreamerinformation();
  }, []);
  async function getstreamerinformation() {
    try {
      const streamerinfo = await getStreamer({ id: token_id });
      if (streamerinfo.error) {
        console.log('error');
      } else {
        setLivepassword(streamerinfo[0].password);
        setChipsvalue(streamerinfo[0].crowns);
      }
    } catch (error) {
      console.log('Error while fetching streamer data', error);
    }
  }
  // console.log(heartCount);
  let countHearts = (count) => {
    setCountHeart((count) => count + 1);
    setImageName('like1');
  };
  const openViewer = (nextactiveStreamers) => {
    // console.log("next stream data", nextactiveStreamers);
    // navigation.navigate('LiveShow', { data: nextactiveStreamers });
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <View style={styles.container}>
      <GestureRecognizer
        onSwipeLeft={() => {
          console.log('swiped');
          setISVisible(false);
        }}
        onSwipeRight={() => {
          console.log('swiped');
          setISVisible(true);
        }}
        // onSwipeUp={() => {
        //   console.log('swiped');
        //   updateleavestream();
        //   fetchactivestreamers();
        // }}
        // onSwipeDown={() => {
        //   console.log('swiped');
        //   updateleavestream();
        //   fetchactivestreamer();
        // }}
        style={{ background: 'red' }}
        config={config}
        onSwipeUp={() => {
          console.log('swiped up');
          fetchactivestreamers();
          // if(nextactiveStreamers.status == 'ACTIVE' && nextactiveStreamers.session_id){
          // openViewer({item:nextactiveStreamers})
          // }else
          // {
          //   console.log('unable to fetch user')
          // }
        }}
        onSwipeDown={() => {
          console.log('swiped down');
          fetchactivestreamers();
          // if(nextactiveStreamers.status == 'ACTIVE' && nextactiveStreamers.session_id){
          // openViewer({item:nextactiveStreamers})
          // }else
          // {
          //   console.log('unable to fetch user down')
          // }
        }}
      >
        {auth.user && (
          <SubStream
            user={auth.user}
            userId={uid}
            selected={activeusers}
            name={username}
            streamstatus={leavestream}
            navigation={navigation}
            id={token_id}
            userid={uid}
          />
        )}
        {/* for(i=0;i<multiData.length;i++){} */}
        <View
          style={{
            alignItems: 'flex-start',
            position: 'absolute',
            alignSelf: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            top: '20%',
            width: '100%'
          }}
        >
          {threelineviewcondition()}
          {/* {condition()} */}
        </View>
        {/* <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: "5%",
          alignItems: "center",
          position: 'absolute',
          width: '100%',
          left: 300,
          top: 17
        }}>
          <TouchableOpacity
            style={{
              height: 30,
              width: '18%',
              backgroundColor: '#EBB022',
              padding: (10, 4),
              marginRight: '5%',
              top: '0%',
              right: -5,
              borderRadius: 20,
            }}
            onPress={() =>setModalVisible(true)}
            onPress={() => setModalVisible(true)}
          />
          {threelineviewcondition()}
          {condition()}
        </View> */}
        {/* <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:"5%",
            alignItems:"center",
            position: 'absolute',
            width: '100%',
            left:300,
            top:17
          }}>
            <Text style={{
              marginBottom: 15,
              textAlign: "center",
              flexDirection: 'column',
              color: 'white'
            }}>Do You Want To Exit Live Session ?</Text>
            <View style={{
              margin: 20,
              flexDirection: 'row',
            }}>
              <TouchableHighlight
                activeOpacity={0.9}
                underlayColor="#ccc"
                style={[{
                  borderRadius: 5,
                  padding: 10,
                  elevation: 2,
                  width: 80,
                  margin: 5
                }, {
                  backgroundColor: "grey",
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={{
                  color: "#000",
                  fontWeight: "bold",
                  textAlign: "center"
                }}>No</Text>
              </TouchableHighlight>
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor="yellow"
                style={[{
                  borderRadius: 5,
                  padding: 10,
                  elevation: 2,
                  width: 80,
                  margin: 5
                }, {
                  backgroundColor: "gold",
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: '40%'
                }]}
                onPress={() => {
                  // console.log("vinoth");
                  setleavestream(true);
                  SocketManager.instance.emitLeaveRoom({
                    userName: username,
                    // roomId:Math.random().toString(36).substring(8),
                    tokenId: token_id,
                  });
                  setModalVisible(!modalVisible);
                  deleteviewer();
                  // updatesubscriber();
                  navigation.navigate('Ended');
                  // updatesubscriber();
                }}
              >
                <Text style={{
                   marginBottom: 15,
                   textAlign: "center",
                   flexDirection:'column',
                   color:'white'
                }}>Do You Want To Exit Live Session ?</Text>
                  <View style={{
                     margin: 20,
                     flexDirection: 'row',
                  }}>
                  <TouchableHighlight
                    activeOpacity={0.9}
                    underlayColor="#ccc"
                      style={[{borderRadius: 5,
                        padding: 10,
                        elevation: 2,
                        width: 80,
                        margin:5}, {backgroundColor: "grey",
                        justifyContent: 'flex-start',
                        flexDirection:'column',}]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={{
                        color: "#000",
                        fontWeight: "bold",
                        textAlign: "center"
                      }}>No</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                    activeOpacity={0.8}
                    underlayColor="yellow"
                      style={[{borderRadius: 5,
                        padding: 10,
                        elevation: 2,
                        width: 80,
                        margin:5}, {backgroundColor: "gold",
                        flexDirection:'column',
                        justifyContent: 'flex-start',
                        width:'40%'}]}
                      onPress={() => {
                        // console.log("vinoth");
                        setleavestream(true);
                        SocketManager.instance.emitLeaveRoom({
                        userName: username,
                        // roomId:Math.random().toString(36).substring(8),
                        tokenId: token_id,
                    });
                    setModalVisible(!modalVisible);
                    deleteviewer();
                    // updatesubscriber();
                    navigation.navigate('Ended');
                    // updatesubscriber();
                }}
                    >
                      <Text style={{
                        color: "#000",
                        fontWeight: "bold",
                        textAlign: "center"
                      }}>Yes</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal> */}
        <Header
          visible={isVisible}
          tokenid={token_id}
          streamstatus={updateleavestream}
          modalstatus={modalstatus}
        />
        <Info
          visible={isVisible}
          viewListVisible={makeViewerPopVisible}
          viewersPop={viewerslistPop}
          tokenid={token_id}
        />
        {/* <ListViewer viewListVisible={makeViewerPopVisible} viewersPop={viewerslistPop}/> */}
        <Sidebar
          visible={isVisible}
          giftPopVisibility={makeGiftPopVisible}
          trackHeartCount={countHearts}
          errorPopVisibility={makeErrorPopVisible}
          userId={auth?.uid}
          tokenid={token_id}
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
          tokenid={token_id}
        />
        <AddFriendFollowButton
          visible={errorPop}
          errorPopVisibility={makeErrorPopVisible}
        />
        {/* <Viewerslist visible={viewerslistPop}/> */}
      </GestureRecognizer>
    </View>
  );
}
const styles = StyleSheet.create({
  // videocontainer: {
  //   flex: 1,
  //   backgroundColor: 'black',
  //   width: windowWidth,
  //   height: windowHeight,
  // },
  // video: {
  //   position: 'absolute',
  //   width: windowWidth,
  //   height: windowHeight,
  //   opacity: 1,
  // },
});