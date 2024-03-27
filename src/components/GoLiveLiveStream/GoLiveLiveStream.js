import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Share,
  ActivityIndicator,
} from 'react-native';
import SocketManager from '../socket/socketManager';
import { AutoScrollFlatList } from 'react-native-autoscroll-flatlist';
// import Video from 'react-native-video';
import GoLiveProfileView from '../Golive-Profile-View/Goliveprofileviews';
import LiveChat from '../live_show_new/LiveChat';
import Timer from '../Timer/timer';
import styles from './GolivestreamStyle';
import TouchFloatingEffect from '../live_show_new/TouchFloatingEffect';
// import Congrats from '../Congrats/Congrats';
import Createpwd from '../CreatePwd/Createpwd';
// import {useNavigation} from '@react-navigation/native';
import { gif } from '../live_show_new/Gif';
import Footertab from '../live_show_new/component/Footertab';
// import Dashboard from '../dashboard/Dashboard';
import Stream from '../LiveStream/Stream';
import { useAuth } from '../../hooks/Auth';
import KeepAwake from 'react-native-keep-awake';
import File from '../../components/refer/FileBase64';
import {
  getStreamerEarnedCrowns,
  updateWallet,
  selectUser,
  updateHeartCount,
  updatePearlCount,
  getActivesubscriber,
  getStreamer,
  updateViewergifts,
  getstreamergifts,
  updateRinggitEarned,
  updateRinggitEarnedPublisher
} from '../../utils/api';
// import Viewerslist from '../ViewersList/Viewerslist'
export default function GoLiveLiveStream({ route, navigation }, shouldBeAwake, props) {
  if (shouldBeAwake) { KeepAwake.activate(); }
  else { KeepAwake.deactivate(); }
  const [giftCoinCount, setGiftCoinCount] = useState(0);
  const { selectedItem } = route.params;
  const { password } = route.params;
  const { title } = route.params;
  const { chips } = route.params;
  const [sessiontype, setSessiontype] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [goLiveProfileVisibility, setGoLiveProfileVisibility] = useState(false);
  const [isVisible, setISVisible] = useState(true);
  const [messageBoxVisibile, setMessageBoxVisibility] = useState(true);
  const [isPwd, setIspwd] = useState(false);
  const [imageName, setImageName] = useState(null);
  const [giftName, setGiftName] = useState(null);
  const [giftedid, setgiftedid] = useState(null);
  const [giftedtokenid, setgiftedtokenid] = useState(null);
  const [giftedvalue, setgiftedvalue] = useState(null);
  const socketRef = useRef();
  const [viewerslistPop, setViewerslistPopVisibility] = useState(false);
  const [count, setCount] = React.useState(0);
  const [pearlviagift, setpearlviagift] = React.useState(0);
  const [ringgitearned, setRinggitearned] = React.useState(0);
  const [totalringgitearned, setTotalringgitearned] = React.useState(0);
  const [pearlviajoining, setpearlviajoining] = React.useState(0);
  const [heartCount, setHeartCount] = React.useState(0);
  const [subscribers, setSubscribers] = React.useState(0);
  const [subscriberslength, setSubscriberslength] = React.useState(0);
  const [tokenId, setTokenId] = React.useState('');
  const [uname, setUname] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [balance, setBalance] = React.useState(0);
  const [profilePic, setProfilepic] = React.useState('');
  const [userno, setUserno] = React.useState('');
  const [timescount, setTimescount] = React.useState(0);
  const [pearlbalance, setPearlbalance] = React.useState(0);
  const [pearlbalanceinstream, setPearlbalanceinstream] = React.useState(0);
  const [giftValue, setGiftValue] = React.useState(0);
  const [disclaimer, setDisclaimer] = React.useState(false);
  const [liveChats, setLiveChat] = useState([{ message: '', userName: '', id: '' }]);
  const [liveGifts, setLiveGifts] = useState([
    // { imageName: '', userName: '', times: '' },
  ]);
  const [lastGift, setLastGift] = useState({
    imageName: '', userName: '', times: ''
  });
  const [previousGift, setPreviousGift] = useState({
    imageName: '', userName: '', times: ''
  });
  const usercrowns = Number(balance) + Number(giftValue);
  const [pearlbalancee, setPearlbalancee] = useState();
  const [time, setTime] = useState(Date.now());
  const [viewercount, setViewercount] = React.useState(0);
  const earneduserpearl = giftValue * 5;
  const userpearl = giftCoinCount ;
  const userpearlcount = Number(pearlbalance) + Number(giftCoinCount);
  // const userpearl= Number(pearlbalanceinstream) + Number(earneduserpearl);
  // const userpearlcount = Number(pearlbalance) + Number(userpearl);
  //const userpearlcount = Number(pearlbalance) + Number(userpearl);
  const auth = useAuth();
  const { uid } = auth?.user;
  let makePassword = (data) => {
    
    if (data === true) {
      setIspwd(true);
    } else {
      setIspwd(false);
    }
  };
  //   let makeCongrats = (data) =>{
  //     if(data === true){
  //         setISVisible(true);
  //     }else{
  //         setISVisible(false);
  //     }
  // }
  // for refreshing 
  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
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

  const onShare = async () => {
    try {
      const message = userName + ' is now live on Ratulive which is an interactive live-streaming platform for instant communication with new friends. Come and support your friend today. You can download the app on https://play.google.com/store/apps/details?id=app.ratulive&hl=en&gl=US. Get more info on Ratulive via https://www.ratulive.com.';
      const result = await Share.share({
        message: message,          
        url: File.appLogo,
      });
      
    } catch (error) {
      console.log(error);
    }
  }
 

  //Hook for user details & streamer details
  useEffect(() => {
    fetchuserDetails();
    if (password != null) {
      setSessiontype('privatepassword');      
    } else if (chips != null) {
      setSessiontype('privatecrowns');             
    }
    else {
      setSessiontype('public');             
    }   
    getstreamerpearls();
  });
  
  //Hook for gift update 
  React.useEffect(() => {
    updatestreamergifts();
    updateUserringgit();
  }, [giftCoinCount])

  async function updatestreamergifts() {
    if(giftedvalue <= 1000){
      const pearl = giftedvalue * 5;
      try {
        await updateViewergifts({ token_id: giftedtokenid, userid: giftedid, pearl })
      } catch (error) {
        console.log('Error while updating viewergifts', error);
      }
      }else{
        const pearl = giftedvalue * 55;
        try {
          await updateViewergifts({ token_id: giftedtokenid, userid: giftedid, pearl })
        } catch (error) {
          console.log('Error while updating viewergifts', error);
        }
      }   
  }

  //Hook for socket manager
  useEffect(() => {
    // fetchuserDetails();
    SocketManager.instance.listenHeartCount((count) => {
      setHeartCount(count + 1);
    });
    SocketManager.instance.listenSendGift((data) => {
      fadeIn();
      const { userName, imgName, giftCoin, roomId, times, userid, tokenId } = data;
      setLastGift({
        imageName: imgName,
        userName: userName,
        times: times,
      });
      setImageName(imgName);
      setTimescount(times);
      setUname(userName);
      setgiftedid(userid);
      setgiftedtokenid(tokenId);
      setgiftedvalue(giftCoin);
      // updatestreamergifts(giftCoin,userid,tokenId);
     
    });
    SocketManager.instance.listenGiftCount((count) => {
      setGiftValue(count);
      if(count <= 1000){
      const temp = count*5;
      setGiftCoinCount(prevCount => prevCount + count*5);
     
      }else{
        const temp = count*55;
        setGiftCoinCount(prevCount => prevCount + count*55);      
      }
    });
    SocketManager.instance.listenSendMessage((data) => {      
      liveChatMessages(data);
    });
   
  }, []);
 

 // Hook for heart & Gift update. 
  useEffect(() => {
    updateheartcount();
  }, [heartCount, giftCoinCount]);

  const updateUserringgit = async () => {
    if(giftedvalue <= 1000){
      const ringgitearned = giftedvalue * 5;
      const ringgitearnedd = ringgitearned*0.000250227*0.1;
    try {
      await updateRinggitEarned({
        uid: uid,
        ringgitearned: ringgitearnedd
      });
      await updateRinggitEarnedPublisher({
        token_id: tokenId,
        ringgitearned: ringgitearnedd
      });
      await updatePearlCount({
        uid: uid,
        pearl_count: ringgitearned
      });
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }else{
    const ringgitearned = giftedvalue * 5;
    //const ringgitearnedd = ringgitearned*0.0000229112*0.1;
    const ringgitearnedd = ringgitearned*0.000250227*0.1;
    try {
      await updateRinggitEarned({
        uid: uid,
        ringgitearned: ringgitearnedd
      });
      await updateRinggitEarnedPublisher({
        token_id: tokenId,
        ringgitearned: ringgitearnedd
      });
      await updatePearlCount({
        uid: uid,
        pearl_count: ringgitearned
      });
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }
  }
 

  function liveGiftMessages() {
    // const { userName, imgName, roomId, giftCoin, times } = data;
   
    if (liveGifts.imageName == "" && liveGifts.userName == "") {
      console.log("object", emptyData);
    }
    else {
      setLiveGifts((liveGifts) => [
        ...liveGifts,
        {
          imageName: imageName,
          userName: uname,
          times: timescount,
        },
      ]);
    }
    setPreviousGift(lastGift);
  }
  React.useEffect(() => {
    if (imageName != null && uname != null && timescount != 0) {
      if (imageName == previousGift.imageName && uname == previousGift.userName) {
        let len = liveGifts.length;
        let liveGiftDatas = liveGifts.slice(0, len - 1);
        let lastData = liveGifts[len - 1];
        lastData.times = lastGift.times;
        liveGiftDatas.push(lastData);
        
        setLiveGifts(liveGiftDatas);
        setPreviousGift(lastGift);
      }
      else {
        liveGiftMessages();
      }
    }
  }, [giftCoinCount]);
  // React.useEffect(() => {
  //   if(imageName != null && uname != null && timescount != 0){
  //     liveGiftMessages();
  //   }
  // }, [giftCoinCount]);
  function liveChatMessages(data) {
    const { userName, message } = data;
    setLiveChat(liveChats => [...liveChats, {
      message: message,
      userName: userName,
      id: Math.random().toString(36).substring(7)
    }])
    
  }
  
  React.useEffect(() => {
    abbrNum(userpearl, 2);
  }, [userpearl])
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
  const updateheartcount = async () => {
    const earned_crowns = JSON.stringify(giftCoinCount);
    const earned_pearls = JSON.stringify(userpearl);
    
    try {
      await updateHeartCount({
        id: tokenId,
        heart_count: heartCount,
        earnedcrowns: earned_crowns,
        earnedpearls: earned_pearls
      });
    
    } catch (error) {
      console.log('Error while adding user heart count', error);
    }
  }
  async function getstreamerpearls() {
    try {
      const streamerinfo = await getStreamer({ id: tokenId });
      if (streamerinfo.error) {
        console.log('error');
      } else {
        setpearlviagift(streamerinfo[0].new_earned_crowns);
        setpearlviajoining(streamerinfo[0].pearls_via_private);
        setTotalringgitearned(streamerinfo[0].ringgits_earned);
        if (streamerinfo[0].viewerlist != null) {
          setViewercount(streamerinfo[0].viewerlist.length);
        } else {
          setViewercount(0);
        }
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

  // Function to render the 3D gifting view
  function threelineviewcondition() {
    if (imageName != null && uname != null && timescount != 0) {
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

  // Fetching User Details
  async function fetchuserDetails() {
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        // console.log('GoLiveLivestream Response',userinfo);
        setBalance(userinfo[0].wallet);
        setPearlbalance(userinfo[0].pearl_count);
        setProfilepic(userinfo[0].profile_pic);
        setUserName(userinfo[0].name);
        setUserno(userinfo[0].userno);        
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  
  //Hook for getting pearl & crown values when tokenID change
  useEffect(() => {
    async function getEarnedCrowns() {
      if (!tokenId) return;
      try {
        const value = await getStreamerEarnedCrowns({ id: tokenId });
       
        if (value.error) {
          setCount(0);
        } else {
          setCount(value);
        }
      } catch (error) {
        console.log('error fetching crowns getEarnedCrowns', error);
      }
    }


    if (tokenId) {
      getEarnedCrowns();
    }
    const interval = setInterval(() => getEarnedCrowns(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, [tokenId]);

  return (
    <View style={styles.container}>
     
      <Stream
        chips={chips}
        password={password}
        sessiontype={sessiontype}
        title={title}
        user={auth?.user}
        userId={uid}
        uname={userName}
        userno={userno}
        profilePic={profilePic}
        streamType="publish"
        navigation={navigation}
        //setSubscribers={(val) => setSubscribers(val)}
        setToken={(id) => {
          console.log('asdfasdf', { id });
          setTokenId(id);
        }}
        earnedCrowns={count}
        earnedcrowns={giftValue}
        giftpearl={pearlviagift}
        joiningpearl={pearlviajoining}
        totalringgitearned={totalringgitearned}
      />
     
      <View style={styles.liveStreamSubContainer}>       
        <View style={{ alignItems: 'center', left: 20 }}>
          <TouchableOpacity>
            <Image source={require('../../../assets/icons/eye.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              marginLeft: 10,
              color: 'gold',
              top: '55%',
              position: 'absolute',
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              width: 40,
              textAlign: 'center',
              borderRadius: 20,
              marginTop: 5
            }}>
            {viewercount}
          </Text>
        </View>
        {/* <Text style={styles.dot}>.</Text> */}
        <TouchableOpacity>
          <Text style={styles.timerText}>
            <Timer />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.graphContainer}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              setGoLiveProfileVisibility(!goLiveProfileVisibility);
            }}>
            <Image
              style={styles.graphIcon}
              source={require('../../../assets/icons/graphBar.png')}
            />
          </TouchableOpacity>
          <Text style={styles.graphText}>Top Gifts</Text>
        
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View
          style={{
            alignItems: 'center',
            height: 200,
            justifyContent: 'space-around',
          }}>
          <TouchFloatingEffect
            screen="golive"
            id={tokenId}
          />
        
          <View style={styles.shareContainer}>
            <TouchableOpacity style={styles.premiumContainer}>
              <Image
                style={styles.pearlIcon}
                source={require('../../../assets/ratu_icons/pearl1_icon.png')}
              />
              {/* <Text style={styles.textNumber}>{JSON.stringify(count)}</Text> */}
              <Text style={styles.textNumber}>{pearlbalancee}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.shareContainer}>
            <TouchableOpacity style={styles.premiumContainer}
              onPress={onShare}>
              <Image
                style={styles.pearlIcon}
                source={require('../../../assets/icons/share.png')}
              />
              <Text style={styles.textNumber}>Share</Text>
            </TouchableOpacity>
          </View>
        
        </View>
      </View>
     
      <View
        style={{
          alignItems: 'flex-start',
          position: 'absolute',
          alignSelf: 'flex-start',
          // justifyContent: 'center',
          alignContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'row',
          top: '20%',
          width: '100%'
        }}>
        {threelineviewcondition()}
      
      </View>
      {/* <Congrats  congrats={makeCongrats}  visible={isVisible}/> */}
      <LiveChat visible={isVisible} messageVisibility={false} userId={uid} tokenid={tokenId} />
      {/* <LiveChat visible={isVisible} messageVisibility={giftPop === true ? true : false}/>  */}
      <Footertab visible={isVisible} footerOnGiftPop={false} tokenid={tokenId} />
      <GoLiveProfileView tokenid={tokenId} visible={goLiveProfileVisibility} navigation={navigation} />
      <Createpwd pwd={isPwd} password={makePassword} />
    </View>
  );
}
