import React, { useEffect, useState, useCallback, useLayoutEffect } from 'react';
import {
  Button,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ToastAndroid
} from 'react-native';
import {
  OpenVidu,
  OpenViduReactNativeAdapter,
  RTCView,
} from 'openvidu-react-native-adapter';
import {
  addSubscriber,
  createSessionToken,
  deleteActiveSubscriber,
} from '../../utils/api';
import { parse } from 'flatted';
import { useAuth } from '../../hooks/Auth';
import { selectUser, getStreamer } from '../../utils/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
var ses = {};
export default function SubStream(props) {
  const [mySessionId, setmySessionId] = useState(props?.user?._users?.displayName ?? '');
  const [myUserName, setmyUserName] = useState('Participant' + Math.floor(Math.random() * 100));
  const [session, setsession] = useState(undefined);
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
  useLayoutEffect(() => {
    const ovReact = new OpenViduReactNativeAdapter();
    ovReact.initialize();
    // console.log({props});
    // console.log('mount********', {props: props});
  }, [])
  useEffect(() => {
    joinSession();
    return () => {
      leaveSession();
    }
  }, [x])
  if (props.streamstatus == true) {
    // console.log('leavesession');
    leaveSession();
  }
  useEffect(() => {
    // console.log('props.streamstatus',props.streamstatus);
    if (props.streamstatus == true) {
      leaveSession();
    }
    // return () => {
    //   joinSession();
    // }
  }, [props.streamstatus])
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
        // console.log('You can use the camera');
      } else {
        // console.log('Camera permission denied');
      }
      if (audio === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the audio');
      } else {
        // console.log('audio permission denied');
      }
      if (storage === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the storage');
      } else {
        // console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  function joinSession() {
    // --- 1) Get an OpenVidu object ---
    const parsedSession = parse(props.selected.session_data);
    // console.log('pppaprppapappf =======', props.selected);
    // console.log('uname');
    console.log('pppaprppapappf =======', {
      parsedSession,
    });
    OV = new OpenVidu();
    OV.enableProdMode();
    setentering(true);
    // console.log("OV.initSession()",OV.initSession());
    // --- 2) Init a session ---
    ses = OV.initSession();
    setsession(ses);
    // console.log("OV.initSession()",ses);
    // console.log("OV.initSession() ses",ses);
    streamsession();
  }
  async function streamsession() {
    // console.log('streamsession');
    const mySession = session;
    setx(1);
    // console.log('streamsession',mySession);
    // --- 3) Specify the actions when events take place in the session ---
    // On every new Stream received...
    mySession.on('streamCreated', async (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      // console.log('inside streamer');
      const subscriber = await mySession.subscribeAsync(
        event.stream,
        undefined,
      );
      setsubscribers(Array.from(subscribers));
      subscribers.push(subscriber);
      // Update the state with the new subscribers
      setsubscribers(subscribers);
    });
    // On every Stream destroyed...
    mySession.on('streamDestroyed', (event) => {
      event.preventDefault();
      // Remove the stream from 'subscribers' array
      deleteSubscriber(event.stream);
    });
    // --- 4) Connect to the session with a valid user token ---
    // 'getToken' method is simulating what your server-side should do.
    // 'token' parameter should be retrieved and returned by your own backend
    const {
      data: { token },
    } = await createSessionToken({
      session_id: props.selected.session_id,
      role: 'SUBSCRIBER',
    });
    const token_url = props.selected.token_url;
    const urlParams = new URLSearchParams(token_url);
    const token_id = urlParams.get('token');
    // console.log({token_id});
    // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
    // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
    try {
      await mySession.connect(token, {
        clientData:
          props.user.displayName || props.user._user.displayName,
      });
      setentering(false);
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
      // console.log({publisher});
      // --- 6) Publish your stream ---
      // Set the main video in the page to display our webcam and store our Publisher
      setmainStreamManager(publisher);
      setvideoSource(!properties.videoSource ? '1' : properties.videoSource);
      sessionpublisher();
    }
    try {
      await addSubscriber({
        // id: this.props.user.userId || this.props.user._user.userId,
        id: props.userId,
        // user_name: this.props.user.displayName,
        user_name: props.name,
        stream_token_id: token_id,
      });
    } catch (error) {
      console.log(
        'There was an error adding user to db:',
        error.code,
        error.message,
      );
    }
  }
  function sessionpublisher() {
    mySession.publish(publisher);
  }
  function getNicknameTag(stream) {
    // Gets the nickName of the user
    // console.log({stream});
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
  async function getstreamerpearls() {
    try {
      const streamerinfo = await getStreamer({ id: props.id.token_id });
      // console.log('getstreamerpearls');
      // console.log('getstreamerpearls',props.id.token_id);
      // console.log('getstreamerpearls',props.userid);
      if (streamerinfo.error) {
        // console.log('error');
      } else {
        // console.log('getstreamerpearls',streamerinfo);
        // console.log('getstreamerpearls',streamerinfo[0].kickedoutuser);
        // this.setState({
        //   kickedoutlist: streamerinfo[0].kickedoutuser,
        // });
        if (streamerinfo[0].kickedoutuser != null) {
          for (let i = 0; i <= streamerinfo[0].kickedoutuser.length; i++) {
            if (streamerinfo[0].kickedoutuser[i] == props.userid) {
              // this.props.navigation.navigate('Profile');
              // ToastAndroid.show('You have been kickedout by streamer ', ToastAndroid.SHORT);
              leaveSession();
            }
          }
        }
      }
    } catch (error) {
      // console.log('Error while fetching user data', error);
    }
  }
  async function leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---
   // console.log("Leave Session is Called");
    // const mySession = session;
    // await AsyncStorage.setItem('current_mysession', mySession);
    // console.log('************my session',mySession);

    // const urlParams = new URLSearchParams(mySession.options.participantId);
    // const token_id = urlParams.get('token');
    // console.log('************my session',{token_id});
    // const token_id = props.id;
    // if (ses) {
    //   console.log('************ disconnect',mySession);
    //   ses.disconnect();
    //    props.navigation.navigate('Ended');
    // }
    // else{
    //    console.log("sesion from ses",ses);
    //   OV = new OpenVidu();
    //   OV.enableProdMode();

    //   setentering(true);
    //   mySession=OV.initSession();
    //   mySession.disconnect();
    //   --- 2) Init a session ---

    // }

    const mySession = session;
    // await AsyncStorage.setItem('current_mysession', mySession);

    console.log('************my session',mySession);

    const urlParams = new URLSearchParams(mySession.options.participantId);
    const token_id = urlParams.get('token');
    console.log('************my session',{token_id});
    // const token_id = props.id;
    if (mySession) {
      // console.log('************ disconnect',mySession);
      mySession.disconnect();
      // props.navigation.navigate('Ended');
    }
    // Empty all properties...
    setTimeout(() => {
      OV = null;
      setsession(undefined);
      setsubscribers([]);
      setmySessionId('SessionA');
      setmyUserName('Participant' + Math.floor(Math.random() * 100));
      setmainStreamManager(undefined);
      setpublisher(undefined)
    });
    // try {
    //   await updatesubscriberstatus({
    //     id: token_id,
    //     status: 'INACTIVE'
    //   })
    // } catch (error) {
    //   console.log('error while deleting user from stream', error);
    // }
    try {
      await deleteActiveSubscriber({
        id: token_id,
        earned_crowns: 2000,
      });
    } catch (error) {
      // console.log('error deleting user from stream', error);
    }
  }
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
      setmirror(!mirror)
    }
    /**
     * Traditional way:
     * Renegotiating stream and init new publisher to change the camera
     */
    /*
        this.OV.getDevices().then(devices => {
            console.log("DEVICES => ", devices);
            let device = devices.filter(device => device.kind === 'videoinput' && device.deviceId !== this.state.videoSource)[0]
            const properties = {
                audioSource: undefined,
                videoSource: device.deviceId,
                publishAudio: true,
                publishVideo: true,
                resolution: '640x480',
                frameRate: 30,
                insertMode: 'APPEND',
            }
            let publisher = this.OV.initPublisher(undefined, properties);
            this.state.session.unpublish(this.state.mainStreamManager);
            this.setState({
                videoSource : device.deviceId,
                mainStreamManager: publisher,
                mirror: !this.state.mirror
            });
            this.state.session.publish(publisher);
        });
        */
  }
  function muteUnmuteMic() {
    mainStreamManager.publishAudio(!audio);
    setaudio(!audio);
  }
  function muteUnmuteCamera() {
    // console.log('inside mute camera');
    mainStreamManager.publishVideo(!video);
    setvideo(!video);
  }
  return (
    <ScrollView style={{ top: 0, height: '100%', backgroundColor: '#000', display: 'flex' }}>
      {mainStreamManager ? (
        <View>
          <View style={styles.container}>
            <Text
              style={{
                color: '#000',
              }}>
              Session: {mySessionId}
            </Text>
            <Text
              style={{
                color: '#000',
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
        </View>
      ) : (
        <View style={{ display: 'none' }}>
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
                onChangeText={(mySessionId) => this.setState({mySessionId})}
                value={this.state.mySessionId}
              />
            </View>
            <View style={styles.button}>
              <Button
                onLongPress={() => this.joinSession()}
                onPress={() => this.joinSession()}
                title="Join"
                color="#841584"
              />
            </View> */}
          {error && (
            <View>
              <Text style={{ color: 'red' }}>
                Error Joining Stream. Try again
              </Text>
              <Button
                onPress={() => props.navigation.navigate('Live')}
                title="Go Back"
                color="#841584"
              />
            </View>
          )}
          {entering && (
            <Text style={{ color: '#fff' }}> Joining the stream...</Text>
          )}
        </View>
      )}
      <View
        style={[styles.container, { flexDirection: 'row', flexWrap: 'wrap' }]}>
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
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    width: '100%',
    height: '100%',
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
});