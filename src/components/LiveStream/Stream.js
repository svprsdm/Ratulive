import React, { useEffect, useState, useRef, useCallback, useLayoutEffect  } from 'react';
import {
  Button,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  TouchableHighlight,
  AppState,
} from 'react-native';
import {
  OpenVidu,
  OpenViduReactNativeAdapter,
  RTCView,
} from 'openvidu-react-native-adapter';
import {
  addPublisher,
  addPublishers,
  createSessionToken,
  deleteActivePublisher,
  deletePublisher,
  selectUser,
  updateHeartCount,
  updateUserReceivedcrowns,
  updateRinggitEarned,
  updateRinggitEarnedPublisher,
  updatePearlCount,
  updateCrownsAndRinggitEarned,deletePublisherAndActivePublisher
} from '../../utils/api';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { stringify } from 'flatted';
import InCallManager from 'react-native-incall-manager';
import { Alert } from 'react-native';
import { BackHandler, ToastAndroid } from 'react-native';
//import { selectUser } from '../../utils/api';
import { useAuth } from '../../hooks/Auth';
import SocketManager from '../socket/socketManager';
// import AsyncStorage from '@react-native-async-storage/async-storage';
//import { AsyncStorage } from '@react-native-community/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var publisher;
var OV;
var ses = {};
// const [modalVisible, setModalVisible] = useState(false);
var tokenIdval;
   var paswd;
   var chips;
   var sesType;
   var userDispName;
   var profPic;
   var ratuid;
export default function Stream(props) {     

    //const token_id = props.tokenId;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisiblePause, setModalVisiblePause] = useState(false);

    const [mySessionId, setmySessionId] = useState(props?.userId ?? '' );
    const [myUserName, setmyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
    const [session, setsession] = useState(undefined);
    const [mainStreamManager, setMainStreamManager] = useState(undefined);
    const [subscribers, setsubscribers] = useState([]);
    const [role, setrole] = useState('PUBLISHER');
    const [mirror, setmirror] = useState(true);
    const [videoSource, setVideoSource] = useState(undefined);
    const [video, setvideo] = useState();
    const [audio, setaudio] = useState();
    const [error, setError] = useState();
    const [status, setStatus] = useState(true);
    const [uname, setUname] = useState('default');
    const [profilepic, setProfilepic] = useState('default');
    const [giftCoinCount, setGiftCoinCount] = useState('default');
    const [heartcount, setHeartcount] = useState(0);
    const [sessiontype, setSessiontype] = useState();
    const [userpassword, setUserPassword] = useState();
    const [userchips, setUserChips] = useState(); 
    const [userno, setUserno] = useState();

    
   // const [tokenId, setTokenId] = useState();
  if(props.password != null)
  {
    paswd = props.password;
    chips = '';
  }else if (props.chips != null){
    paswd = '';
    chips = props.chips;
  }else{
    paswd = '';
    chips = '';
  }   
   
   sesType = props.sessiontype;
   userDispName = props.uname;
   profPic = props.profilePic;
   ratuid = props.userno;

   
    const auth = useAuth();
    const { uid } = auth?.user;
    
    // useEffect(() => {
    //   fetchuserDetails();
    // },[]);

    // useEffect(() => {
      
    // });

    useEffect(() => {    
      //fetchuserDetails();         
      const ovReact = new OpenViduReactNativeAdapter();
      ovReact.initialize();
      joinSession();
    },[]);

   

    useFocusEffect(
      React.useCallback(() => {
        const handleBackButton = () => {
          setModalVisible(true);
          return true;
        };
  
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
      }, [])
    );
  
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
      } else {
      }
      if (audio === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
      if (storage === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
      }
    } catch (err) {
      console.warn(err);
    }
  }

 

  async function joinSession() {
    // --- 1) Get an OpenVidu object ---
    OV = new OpenVidu();
    OV.enableProdMode();
    // InCallManager.setSpeakerphoneOn(true);
    // this.setState({
    //   entering: true,
    // });
    // --- 2) Init a session ---
    ses = OV.initSession();
    setsession(ses);
    console.log('Mirror state test on join session', mirror);
    await streamsession();
    
  }
  async function streamsession() {   
     
        const mySession  = ses;
        // --- 3) Specify the actions when events take place in the session ---
        const session_flatted = stringify(mySession);
       // On every new Stream received...
      
        const session_id = 
          props.user.uid ||
          props.user._user.uid ||
          state.mySessionId;
        // --- 4) Connect to the session with a valid user token ---
        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        const {
          data: { token },
        } = await createSessionToken({
          session_id,
          role: 'PUBLISHER',
        });
        const urlParams = new URLSearchParams(token);
        const token_id = urlParams.get('token');
        if (token_id != null) {
          await SocketManager.instance.emitJoinRoom({
            userName: userDispName,
            userId: uid,
            tokenId: token_id,
          });
        }

       
        try {
          await mySession.connect(token, { clientData: userDispName });
          //InCallManager.setSpeakerphoneOn(true);
          //setError(false);
          
        } catch (error) {
          //setError(true);
          
          console.log('error message from session connect',error );
        }
        if (Platform.OS === 'android') {
          await checkAndroidPermissions();
        }
        // --- 5) Get your own camera stream ---
        if (role !== 'SUBSCRIBER') {
          const properties = {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: undefined, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
          };
          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
          // element: we will manage it on our own) and with the desired propertiesç
            publisher = await OV.initPublisherAsync(
            undefined,
            properties,
          );
          // --- 6) Publish your stream ---
          // Set the main video in the page to display our webcam and store our Publisher

          setMainStreamManager(publisher);
          setVideoSource(!properties.videoSource ? '1' : properties.videoSource);

          mySession.publish(publisher);
          
              publisher.publishAudio(true);
              //this.setState({ connected: true });
              props.setToken(token_id);
              tokenIdval = token_id;
              //setTokenId(token_id);
             
              try {
                await addPublisher({
                  //id: props.userId,
                  session_type: sesType,
                  title: props.title,
                  user_name: userDispName,
                  profile_pic: profPic,
                  token_id,
                  session_data: session_flatted,
                  session_id,
                  tokenUrl: token,
                  password: paswd,
                  crowns: chips,
                  userid: ratuid
                });
                await addPublishers({
                  // id: this.props.userid,                 
                  session_type: sesType,
                  title: props.title,
                  user_name: userDispName,
                  profile_pic: profPic,
                  token_id,
                  session_data: session_flatted,
                  session_id,
                  tokenUrl: token,
                  password: paswd,
                  crowns: chips,
                });
              } catch (error) {
                
              }
              // await AsyncStorage.setItem('current_stream_token_id', token_id);
       
        }
      
   
  }
  
  function getNicknameTag(stream) {
    // Gets the nickName of the user
    try {
      if (
        stream.connection &&
        JSON.parse(stream.connection.data) &&
        JSON.parse(stream.connection.data).clientData
      ) {
        return JSON.parse(stream.connection.data).clientData;
      }
    } catch (error) { }
    return '';
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

  
 
  async function leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    
    publisher.publishAudio(false);
    
    if (tokenIdval != null) {
      SocketManager.instance.emitFinishLiveStream({
        userName: userDispName,
        tokenId: tokenIdval,
      });

    }

    if (ses) {           
     
      ses.unpublish(publisher);
      ses.disconnect();  
    
      InCallManager.setSpeakerphoneOn(false); 
           
    }
    
      OV = null;
      InCallManager.setSpeakerphoneOn(false);
      setsession(undefined);
      setsubscribers([]);
      setmySessionId('');
      setmyUserName('');
      setMainStreamManager(undefined);
      
  

      try {
      
      const { giftpearl, joiningpearl, totalringgitearned, navigation, earnedcrowns } = props;
      // deletePublisherAndActivePublisher({
      //   id: tokenIdval,
      //   earned_crowns: giftCoinCount,
      //   uid: uid
      // });
     
      if (giftpearl != null || giftpearl != undefined || giftpearl != 0 ||
        joiningpearl != null || joiningpearl !== undefined || joiningpearl != 0) {
       // console.log('enter into if condition leave session');
        const totalpearl = giftpearl + joiningpearl;
        const totalringgit = totalringgitearned + joiningpearl*0.000250227*0.1;         
        
        const updateResult =  updateCrownsAndRinggitEarned({
            uid: uid,
            pearls: JSON.stringify(totalpearl) + " Pearls" + "/ RM " + JSON.stringify(totalringgit),
            token_id: tokenIdval,
            earned_crowns: earnedcrowns,
            ringgitearned: joiningpearl*0.000250227*0.1
          });
         
          if (updateResult) {
            navigation.navigate('Earned', {
              pearlviagifts: giftpearl,
              pearlviajoining: joiningpearl,
              token_id: tokenIdval,
              profPic: profPic           
            });  
          }
        
      }else{        

        const deletePublisherResult = await deleteActivePublisher({
          id: tokenIdval,
          uid: uid,
        });
       
        if (deletePublisherResult) {
          navigation.navigate('Earned', {
            pearlviagifts: giftpearl,
            pearlviajoining: joiningpearl,
            token_id: tokenIdval,
            profPic: profPic           
          });  
        }
      }

      const deleteResult =  await deletePublisher({
        id: tokenIdval,
      });

    } catch (error) {
      console.log('error message from end live update pearls and crowns:',error);
    }
   

    tokenIdval = '';
  }
    //Leave Session end


  function toggleCamera() {
    /**
     * _switchCamera() Method provided by react-native-webrtc:
     * This function allows to switch the front / back cameras in a video track on the fly, without the need for adding / removing tracks or renegotiating
     */
    const camera = mainStreamManager.stream
      .getMediaStream()
      .getVideoTracks()[0];
    if (!!camera) {
      camera._switchCamera();
      setmirror(!mirror )
      console.log('Mirror state test on toggle session', mirror);
    }
    
  }

    return (
      <View style={styles.container}>
        {mainStreamManager ? (
          <View style={{}}>
            <View>
              <Text
                style={{
                  color: '#fff',
                  display: 'none',
                }}>
                Session: {mySessionId}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  display: 'none',
                }}>
                {getNicknameTag(mainStreamManager.stream)}
              </Text>
              <RTCView
                zOrder={0}
                objectFit="cover"
                mirror={mirror}
                streamURL={mainStreamManager.stream
                  .getMediaStream()
                  .toURL()}
                style={styles.selfView}
              />
            </View>
          
            <View style={styles.liveStreamContainer}>
              <TouchableOpacity
                style={styles.videobtnContainer}
                //onLongPress={() => toggleCamera()}
                onPress={() => toggleCamera()}>
                <Image
                  style={styles.videoIcon}
                  source={require('../../../assets/icons/Videoreverse.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ratubtnContainer}>
                <Image
                  style={styles.ratuIcon}
                  source={require('../../../assets/icons/RatuIcon.png')}
                />
              </TouchableOpacity>
          
              {/* Modal Popup */}
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  //Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <Text style={styles.modalText}>Do You Want To End Live Session ?</Text>
                  <View style={styles.modalView}>
                    <TouchableHighlight
                      activeOpacity={0.9}
                      underlayColor="#ccc"
                      style={[styles.button, styles.buttonNo]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>No</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      activeOpacity={0.9}
                      underlayColor="yellow"
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => {
                        leaveSession();
                        // this.deleteactivesubscriber();                        
                      }}
                    >
                      <Text style={styles.textStyle}>Yes</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>
              <TouchableOpacity
                style={styles.endLivebtn}
                //onLongPress={() => this.leaveSession()}
                // onPress={this.Popup}
                onPress={() => setModalVisible(true)}
              // onPress={() => {
              //   setModalVisible(true);
              // }}
              >
                <Text style={styles.endliveText}>End Live</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text style={{}}>
              {' '}
              Creating streaming session ...
            </Text>
           
          </View>
        )}
        {/* <View
          style={[styles.container, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {subscribers.map((item, index) => {
            return (
              <View key={index}>
                <Text style={{ color: '#fff' }}>
                  {getNicknameTag(item.stream)}
                </Text>
                <RTCView
                  zOrder={0}
                  objectFit="cover"
                  style={styles.remoteView}
                  streamURL={item.stream.getMediaStream().toURL()}
                />
              </View>
            );
          })}
        </View> */}
      </View>
    );
  
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#000',
    width: windowWidth,
    height: windowHeight,
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
  goLiveContainer: {
    width: 0,
    height: 0,
  },
  video: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    marginRight: 0,
  },
  liveStreamContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: (10, 14),
    paddingTop: 0,
    position: 'absolute',
    top: 0,
  },
  videoIcon: {
    height: 25,
    width: 40,
    marginLeft: '1%',
  },
  ratubtnContainer: {
    marginLeft: '9%',
    textAlign: 'center',
  },
  ratuIcon: {
    height: 40,
    width: 25,
  },
  endLivebtn: {
    height: 30,
    width: '23%',
    backgroundColor: '#EBB022',    
    marginRight: '5%',
    top: '0%',
    borderRadius: 20,
  },
  endliveText: {
    right: 2,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  liveStreamSubContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: (10, 3, 3),
    textAlign: 'center',
    position: 'absolute',
    top: '7%',
  },
  eyeIcon: {
    width: 25,
    height: 17,
    marginLeft: '15%',
  },
  eyeNumber: {
    fontSize: 17,
    color: '#fff',
    marginLeft: '15%',
  },
  timerText: {
    fontSize: 19,
    marginRight: '4%',
    color: '#fff',
    marginTop: '5%',
  },
  dot: {
    color: 'transparent',
  },
  graphContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    top: '12%',
    right: 0,
    margin: (0, 7),
  },
  graphIcon: {
    padding: (10, 10),
  },
  graphText: {
    color: '#fff',
    padding: (10, 10),
    fontSize: 18.5,
  },
  spotifyIcon: {
    padding: (10, 10),
  }, 
  messageIcon: {
    width: 50,
    height: 50,
  },
  premiumIcon: {
    width: 30,
    height: 30,
  },
  pearlIcon: {
    width: 50,
    height: 50,
  },
  textNumber: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pauseBtn: {
    // flexDirection: 'column',
    // alignItems: 'flex-end',
    // top: '15%',
    left: '3%',
    // position: 'absolute',
    // justifyContent: 'center',
    // backgroundColor:'red',
    // height: 30,

    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: (10, 3, 3),
    textAlign: 'center',
    position: 'absolute',
    // bottom: 0,
    top: 100,
    // width: windowWidth,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue'

  },
  pauseIcon: {
    //top: -30,
    width: 50,
    height: 50,
  },
  modal: {
    backgroundColor: "#00000099",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: "#f9fafb",
    width: "80%",
    borderRadius: 5
  },
  modalHeader: {
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
    color: "#000"
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray"
  },
  modalBody: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  modalFooter: {
  },
  actions: {
    borderRadius: 5,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  actionText: {
    color: "#fff"
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: '45%',
    backgroundColor: "rgba(0,0,0,0.95)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 30,
    marginRight: 30
  },
  modalView: {
    margin: 20,
    flexDirection: 'row',
    // justifyContent:'flex-end', 
    // alignItems: 'flex-end'
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 80,
    margin: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "gold",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '40%'
  },
  buttonNo: {
    backgroundColor: "grey",
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    flexDirection: 'column',
    color: 'white'
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    margin: 10
  }
});
