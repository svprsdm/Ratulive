import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { stringify } from 'flatted';
import { InCallManager } from 'react-native-incall-manager';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';
import {
  OpenVidu,
  OpenViduReactNativeAdapter,
  RTCView,
} from 'openvidu-react-native-adapter';
import {
  addPublisher,
  createSessionToken,
  deleteActivePublisher,
} from '../../utils/api';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Stream = ({ props }) => {
  const ovReact = new OpenViduReactNativeAdapter();
  ovReact.initialize();
  console.log({ props });
  const [mySessionId, setMySessionId] = useState(props?.userId ?? '');
  const [myUserName, setMyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [role, setRole] = useState('PUBLISHER');
  const [mirror, setMirror] = useState(true);
  const [videoSource, setVideoSource] = useState(undefined);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  useEffect(() => {
    console.log('mount', { props });
    joinSession();
    return () => { leaveSession() }
  }, [])
  const checkAndroidPermissions = async () => {
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
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
      if (audio === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the audio');
      } else {
        console.log('audio permission denied');
      }
      if (storage === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  const joinSession = () => {
    // --- 1) Get an OpenVidu object ---
    OV = new OpenVidu();
    OV.enableProdMode();
    InCallManager.setSpeakerphoneOn(true);
    // --- 2) Init a session ---
    setState(
      {
        session: OV.initSession(),
        entering: true,
      },
      async () => {
        const mySession = session;
        // --- 3) Specify the actions when events take place in the session ---
        const session_flatted = stringify(mySession);
        console.log({ session_flatted });
        // On every new Stream received...
        mySession.on('streamCreated', async (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          const subscriber = await mySession.subscribeAsync(
            event.stream,
            undefined,
          );
          var subscribers = Array.from(subscribers);
          subscribers.push(subscriber);
          props.setSubscribers(subscribers.length);
          // Update the state with the new subscribers
          setSubscribers(
            subscribers
          );
        });
        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          event.preventDefault();
          // Remove the stream from 'subscribers' array
          deleteSubscriber(event.stream);
        });
        const session_id =
          props.user.uid ||
          props.user._user.uid ||
          mySessionId;
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
        console.log({ token_id });
        // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
        // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
        try {
          await mySession.connect(token, { clientData: myUserName });
          InCallManager.setSpeakerphoneOn(true);
          setState({
            error: false,
          });
        } catch (error) {
          setState({
            error: true,
            entering: false,
          });
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
          const publisher = await OV.initPublisherAsync(
            undefined,
            properties,
          );
          console.log({ publisher });
          // --- 6) Publish your stream ---
          // Set the main video in the page to display our webcam and store our Publisher
          setState(
            {
              mainStreamManager: publisher,
              videoSource: !properties.videoSource
                ? '1'
                : properties.videoSource, // 0: back camera | 1: user camera |
              entering: false,
              error: false,
            },
            async () => {
              //
              mySession.publish(publisher);
              props.setToken(token_id);
              try {
                await addPublisher({
                  id: props.userId,
                  session_type: 'payPerSession',
                  title: props.user.displayName,
                  user_name: props.user.displayName,
                  token_id,
                  session_data: session_flatted,
                  session_id,
                  tokenUrl: token,
                });
              } catch (error) {
                console.log(
                  'There was an error adding user to db:',
                  error.code,
                  error.message,
                );
              }
              // await AsyncStorage.setItem('current_stream_token_id', token_id);
            },
          );
        }
      },
    );
  }
  const getNicknameTag = (stream) => {
    // Gets the nickName of the user
    console.log({ stream });
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
  const deleteSubscriber = (stream) => {
    var subscribers = Array.from(subscribers);
    const index = subscribers.indexOf(stream.streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      setSubscribers({
        subscribers: subscribers,
      });
    }
  }
  const leaveSession = async () => {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
    const mySession = session;
    console.log({ mySession });
    const urlParams = new URLSearchParams(mySession.options.participantId);
    const token_id = urlParams.get('token');
    console.log({ token_id });
    try {
      await deleteActivePublisher({
        id: token_id,
        earned_crowns: props.earnedCrowns,
        uid: props.userId,
      });
    } catch (error) {
      console.log('error while deleting user from stream', error);
    }
    if (mySession) {
      mySession.disconnect();
    }
    // Empty all properties...
    setTimeout(() => {
      OV = null;
      /*
      setSession(undefined);
      setSubscribers([]);
      setMySessionId('');
      setMyUserName('');
      setMainStreamManager(undefined);      
      */
      setState(
        {
          session: undefined,
          subscribers: [],
          mySessionId: '',
          myUserName: '',
          mainStreamManager: undefined,
          publisher: undefined,
        },
        () => {
          props.navigation.navigate('Earned');
        },
      );
    });
  }
  const toggleCamera = () => {
    /**
     * _switchCamera() Method provided by react-native-webrtc:
     * This function allows to switch the front / back cameras in a video track on the fly, without the need for adding / removing tracks or renegotiating
     */
    const camera = mainStreamManager.stream
      .getMediaStream()
      .getVideoTracks()[0];
    if (!!camera) {
      camera._switchCamera();
      setMirror({ mirror: !mirror });
    }
    /**
     * Traditional way:
     * Renegotiating stream and init new publisher to change the camera
     */
    /*
        OV.getDevices().then(devices => {
            console.log("DEVICES => ", devices);
            let device = devices.filter(device => device.kind === 'videoinput' && device.deviceId !== videoSource)[0]
            const properties = {
                audioSource: undefined,
                videoSource: device.deviceId,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
            }
            let publisher = OV.initPublisher(undefined, properties);
            session.unpublish(mainStreamManager);
            setVideoSource({
                videoSource : device.deviceId,
                mainStreamManager: publisher,
                mirror: !mirror
            });
            session.publish(publisher);
        });
        */
  }
  const muteUnmuteMic = () => {
    mainStreamManager.publishAudio(!audio);
    setAudio({ audio: !audio });
  }
  const muteUnmuteCamera = () => {
    console.log('inside mute camera');
    mainStreamManager.publishVideo(!video);
    setVideo({ video: !video });
  }
  {
    // console.log(state);
    if (entering) {
      <View style={styles.container}>
        <Text
          style={{
            color: '#fff',
            // display: 'none',
          }}>
          Creating a live session...
        </Text>
      </View>;
    }
    if (error) {
      <View style={styles.container}>
        <Text
          style={{
            color: 'red',
            display: 'none',
          }}>
          Error in creating a live session
        </Text>
        <Button
          onPress={() => props.navigation.navigate('Live')}
          title="Go Back"
          color="#ff0000"
        />
      </View>;
    }
    return (
      <ScrollView style={{}}>
        {mainStreamManager ? (
          <View style={{}}>
            <View style={styles.container}>
              <Text
                style={{
                  color: '#fff',
                  // display: 'none',
                }}>
                Session: {mySessionId}
              </Text>
              <Text
                style={{
                  color: '#fff',
                  // display: 'none',
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
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button
                  onLongPress={() => toggleCamera()}
                  onPress={() => toggleCamera()}
                  title="Toggle Cam"
                  color="#841584"
                />
              </View>
              <View style={styles.button}>
                <Button
                  onLongPress={() => muteUnmuteMic()}
                  onPress={() => muteUnmuteMic()}
                  title={audio ? 'Mute Audio' : 'Unmute Audio'}
                  color="#3383FF"
                />
              </View>
              <View style={styles.button}>
                <Button
                  onLongPress={() => leaveSession()}
                  onPress={() => leaveSession()}
                  title="End"
                  color="#ff0000"
                />
              </View>
              <View style={styles.button}>
                <Button
                  onLongPress={() => muteUnmuteCamera()}
                  onPress={() => muteUnmuteCamera()}
                  title={video ? 'Mute Cam' : 'Unmute Cam'}
                  color="#00cbff"
                />
              </View>
            </View>
            <View style={styles.liveStreamContainer}>
              <TouchableOpacity
                style={styles.videobtnContainer}
                onLongPress={() => toggleCamera()}
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
              <TouchableOpacity
                style={styles.endLivebtn}
                onLongPress={() => leaveSession()}
                onPress={() => leaveSession()}>
                <Text style={styles.endliveText}> End Live</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Text style={{}}>
              {' '}
              Creating streaming session ...
            </Text>
            {/* <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}>
              <Image
                style={{width: 100}}
                source={require('../../../assets/gold.png')}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TextInput
                style={{
                  width: '90%',
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  color: '#fff',
                }}
                onChangeText={(mySessionId) => ({mySessionId})}
                value={mySessionId}
              />
            </View>
            <View style={styles.button}>
              <Button
                onLongPress={() => joinSession()}
                onPress={() => joinSession()}
                title="Join"
                color="#841584"
              />
            </View> */}
          </View>
        )}
        <View
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
        </View>
      </ScrollView>
    );
  }
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
    padding: (10, 4),
    marginRight: '5%',
    top: '0%',
    borderRadius: 20,
  },
  endliveText: {
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
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    bottom: 60,
    right: '5%',
    position: 'absolute',
    justifyContent: 'flex-end',
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
  pauseIcon: {
    width: 50,
    height: 50,
  },
});
export default Stream;
