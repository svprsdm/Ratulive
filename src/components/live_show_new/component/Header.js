import React, { useEffect, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  ActivityIndicator

} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../LiveShowStyle';
import { useAuth } from '../../../hooks/Auth';
import { updateWallet, selectUser, getStreamer, updatesubscriberstatus, deleteviewerlist } from '../../../utils/api';
import { BackHandler, ToastAndroid } from 'react-native';
import { Avatar, Badge } from 'react-native-paper';
import SocketManager from '../../socket/socketManager';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { setModalVisiblePause } from '../../../components/LiveStream/Stream';
import { Alert } from 'react-native';
import InCallManager from 'react-native-incall-manager';
// import Ended from '../../Ended/Ended'

export default function Header(props) {
  //const modalVisiblePause = setModalVisiblePause;
  const auth = useAuth();
  const { uid } = auth?.user;
  const navigation = useNavigation();
  const [heartCount, setHeartCount] = useState(0);
  const [giftCoinCount, setGiftCoinCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleExit, setModalVisibleExit] = useState(false);
  const [modalVisibleExitt, setModalVisibleExitt] = useState(false);
  const [streamerselection, setStreamerselection] = useState(false);
  const [balance, setBalance] = useState();
  const [pearlbalance, setPearlbalance] = useState();
  const [pearlbalancee, setPearlbalancee] = useState();
  const [heartcount, setHeartcount] = useState();
  const [username, setUsername] = useState('Random');
  const [streamerid, setStreamerid] = useState('');
  const [streamerpic, setStreamerpic] = useState('');
  const [kickedoutlist, setkickedoutlist] = useState();
  const [viewerlist, setViewerlist] = useState();
  const [streamerstatus, setStreamerstatus] = useState('ACTIVE');
  // const [viewerstatus, setviewerstatus] = useState(true);
  const [pausestatus, setPausestatus] = useState('');
  const [disclaimer, setDisclaimer] = React.useState(false);
  const usercrowns = Number(balance) - Number(giftCoinCount);
  const id = props.tokenid;
  const [giftTracker, setGiftTracker] = useState({

  });

  const [time, setTime] = useState(Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // React.useEffect(() => {
  //   fetchuserDetails();

  // });
  React.useEffect(() => {

    const timer = setTimeout(() => {
      setDisclaimer(true);
    }, 3000);

  })

  React.useEffect(() => {
    getstreamerpearls();
    if (streamerstatus === 'INACTIVE' && !streamerselection && viewerlist?.includes(uid)) {
      setModalVisibleExit(true);
    }
    if (kickedoutlist?.includes(uid)) {
      props.streamstatus(true);
      updateviewer();
      // SocketManager.instance.emitLeaveRoom({
      //   userName: username,
      //   tokenId: id,
      // });          
      setModalVisibleExitt(true);
      
    }
  },[time])

 

  // React.useEffect(() => {
  //   if (pausestatus == 'pause' && selection == false) {
  //     setModalVisiblePause(true);
  //   } else {
  //     setModalVisiblePause(false);
  //   }
  // })

  // React.useEffect(() => {
  //   if (pausestatus == 'unpause') {
  //     setModalVisiblepausepopup(false);
  //     setselection(false);
  //   }
  // })

  async function getstreamerpearls() {
    try {
      const streamerinfo = await getStreamer({ id });

      if (streamerinfo.error) {
        console.log('error');
      } else {
        setPearlbalance(streamerinfo[0].new_earned_crowns);
        setHeartcount(streamerinfo[0].heart_count);
        setStreamerid(streamerinfo[0].session_id);
        setStreamerstatus(streamerinfo[0].active_status);
        setPausestatus(streamerinfo[0].pause_status);
        setkickedoutlist(streamerinfo[0].kickedoutuser);
        setViewerlist(streamerinfo[0].viewerlist);
        await abbrNum(pearlbalance, 2);
        await getstreamerpic(streamerid);      
        
        }
     }catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

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

  async function updateviewer() {
    const viewerid = [uid];
    try {
      await deleteviewerlist({
        id,
        vieweruid: viewerid,
      })
      // props.streamerstatus(true);
     
      

  
    } catch (error) {
      console.log('error while deleting user from stream', error);
    }
  }

  

  async function updatesubstream() {
    // const mysession = await AsyncStorage.getItem('current_mysession');
    console.log('*************', props.streamstatus);
    props.streamerstatus(true);
    // if (mysession) {
    //   console.log('ended');
    //   mysession.disconnect();
    // }
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
  async function fetchuserDetails() {
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        // setBalance(userinfo[0].wallet);
        // setUsername(userinfo[0].name);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  async function getstreamerpic(streamerid) {
    /*for getting user info*/
    try {
      const userinfo = await selectUser({ uid: streamerid });
      if (userinfo.error) {
        console.log('error');
      }
      else {
        setStreamerpic(userinfo[0].profile_pic);

      }
    }
    catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

  function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10, decPlaces);
    var abbrev = ["K", "M", "B", "T"];
    for (var i = abbrev.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);
      if (size <= number) {
        number = Math.round(number * decPlaces / size) / decPlaces;
        if ((number == 1000) && (i < abbrev.length - 1)) {
          number = 1;
          i++;
        }
        number += abbrev[i];
        break;
      }
    }
    setPearlbalancee(number);
    return number;
  }

  const updateUserWallet = async () => {
    try {
      await updateWallet({
        uid: uid,
        wallet: balance
      });
      // console.log('balance',balance);
      // console.log('usercrowns',usercrowns);
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }

  return (

    <View style={styles.liveStreamContainer}>

      <Image
        style={{ left: 25, opacity: 1, width: 30, height: 46, }}
        source={require('../../../../assets/icons/logo_stream.png')}
      />

      <View style={styles.headerContainer}>

        <View style={styles.headerAvtarBadgeContainer}>
          <View style={styles.avtarContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Detailsprofile', {
              streameruid: streamerid,
            })}>
              <Avatar.Image size={49} source={{ uri: streamerpic }}></Avatar.Image>
            </TouchableOpacity>
          </View>
          <Badge size={9} style={styles.badgeIcon}></Badge>
        </View>

        <View style={styles.premiumLikeContainer}>
          <Image
            style={styles.pearlIcon}
            source={require('../../../../assets/ratu_icons/pearl1_icon.png')}
          />
          <Text style={styles.premiumCountText}>{pearlbalancee}</Text>
          {/* <Image
                    style={styles.likeIcon}
                    source={require('../../../../assets/icons/ico_heart.png')}
                    />
                    <Text style={styles.likeCountText}>{heartcount}</Text>      */}
        </View>
      </View>

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblePause}
      // onRequestClose={() => {
      //   setModalVisiblePause(!modalVisiblePause);
      // }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Streamer is on pause</Text>

        </View>
      </Modal> */}

      {/* Modal Popup  */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
       
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Do You Want To Exit Live Session ?</Text>

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
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                // updatesubstream();
                // SocketManager.instance.emitLeaveRoom({
                //   userName: username,
                //   // roomId:Math.random().toString(36).substring(8),
                //   tokenId: id,
                // });
                setModalVisible(!modalVisible);
                updateviewer();
                props.audioSetting();
                //InCallManager.setSpeakerphoneOn(false);							
                navigation.navigate('Live');
                // navigation.reset({
                //   index: 0,
                //   routes: [{name: 'Profile'}],
                // });
                // navigation.navigate('Ended',{
                //   streamerprofilepic:streamerpic,
                //   streamerid:streamerid
                // });
                // updatesubscriber();
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* streamer exit popup */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleExit}
      // onRequestClose={() => {
      //    setModalVisibleExit(!modalVisibleExit);
      // }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Streamer Ended the Live</Text>

          <View style={styles.modalView}>


            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisibleExit(!modalVisibleExit);
                //setStreamerselection(true);
                props.audioSetting();
                //InCallManager.setSpeakerphoneOn(false);								
                navigation.navigate('Live');

                // navigation.navigate('Ended',{
                //   streamerprofilepic:streamerpic,
                //   streamerid:streamerid
                // });


              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleExitt}
        style={{ marginTop: '20%', marginBottom: '20%', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      // onRequestClose={() => {
      //    setModalVisibleExit(!modalVisibleExit);
      // }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>You have been kickedout of the Live by the streamer</Text>

          <View style={styles.modalView}>


            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisibleExitt(!modalVisibleExitt);
                // setStreamerselection(true);                
                //props.audioSetting();
                //InCallManager.setSpeakerphoneOn(false);
                navigation.navigate('Live');
                //InCallManager.setSpeakerphoneOn(false);

              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* streamer pause popup */}
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblePause}
      // onRequestClose={() => {
      //    setModalVisibleExit(!modalVisibleExit);
      // }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Streamer Paused the Live,Do you want to continue</Text>

          <View style={styles.modalView}>

            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#ccc"
              style={[styles.button, styles.buttonNo]}
              onPress={() => {
                // setModalVisiblePause(!modalVisiblePause);
                setModalVisiblePause(false);
                setselection(true);
                setModalVisiblepausepopup(true);
              }}
            >
              <Text style={styles.textStyle}>Yes</Text>
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.navigate('Live');
                setModalVisiblePause(!modalVisiblePause);
                updatesubscriber();
                props.audioSetting();
                InCallManager.setSpeakerphoneOn(false);
              }}
            >
              <Text style={styles.textStyle}>No</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> */}

      {/* secondary popup for streamer pause */}

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisiblepausepopup}
      // onRequestClose={() => {
      //    setModalVisibleExit(!modalVisibleExit);
      // }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Streamer is on pause please hold on!</Text>
          <Text style={styles.modalText}>If you with to exit the stream, click the button below.</Text>

          <View style={styles.modalView}>


            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                navigation.navigate('Live');
                setModalVisiblepausepopup(!modalVisiblepausepopup);
              }}
            >
              <Text style={styles.textStyle}>Exit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> */}

      {/* <TouchableOpacity style={{right:15}}
              onPress={()=>setModalVisible(true)}>
                <Image style={styles.cancelIcon} source={require('../../../../assets/icons/cancel.png')} />
            </TouchableOpacity>  */}
      <TouchableOpacity
        style={styles.endLivebtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.endliveText}> Exit</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={{right:15}}
            onPress={()=>{
                PopupViewer()
            }}>
                <Image style={styles.cancelIcon} source={require('../../../../assets/icons/cancel.png')} />
            </TouchableOpacity> */}
      {/* <View style={{
              top:590,
              right:365
            }}>
              {disclaimer ? (
          <ActivityIndicator />
        ) : (
            <Text style={styles.disclaimerText}>Ratulive does not advocate streamers to perform content that includes Smoking,
        Alcohol consumption, Drug abuse, pornography, gambling, nudity and other non-moral activities.
        Please be alert on any scams that could lead to physical and financial lost.
        Streamers should at all time comply with Ratulive agreement.
        If the above is being carried out by the streamer, please report this to us.</Text>
         )}
            </View> */}
    </View>
  );
}
