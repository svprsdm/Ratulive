import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import Sidebar from '../../components/common/Sidebar';
import Header from '../../components/common/Header';
import Info from '../../components/common/Info';
import Livegift from './Livegift';
import styles from './LiveShowStyle';
import LiveChat from '../../components/common/LiveChat';
import Footer from '../../components/common/Footer';
import SocketManager from '../../components/socket/socketManager';
import FloatingHearts from '../../components/common/FloatingHearts';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import TouchFloatingEffect from '../../components/common/TouchFloatingEffect';
export default function Liveshow() {
  const [isVisible, setISVisible] = useState(true);
  const [giftPop, setGiftPopVisible] = useState(false);
  const [messageBoxVisibile, setMessageBoxVisibility] = useState(true);
  const [heartCount, setHeartCount] = useState(0);
  const [countHeart, setCountHeart] = useState(0);
  const socketRef = useRef();
  const [imageName, setImageName] = useState("");
  let makeGiftPopVisible = () => {
    setGiftPopVisible(true);
  }
  let makeGiftPopInVisible = () => {
    setGiftPopVisible(false);
  }
  let setMessageVisible = () => {
    setMessageBoxVisibility(false);
  }
  useEffect(() => {
    // SocketManager.instance.listenSendMessage((data) => {
    //     liveChatMessages(data);
    //   });
    // console.log("rendered");
    console.log("useEffect of shoe room")
    SocketManager.instance.emitJoinRoom({
      userName: 'userName',
      roomId: Math.random().toString(36).substring(8)
    });
    SocketManager.instance.listenSendHeart(() => {
      setHeartCount(prevState => prevState + 1);
      setImageName("like1");
    });
    SocketManager.instance.listenSendGift((data) => {
      setHeartCount(prevState => prevState + 1);
      const { userName, imgName, roomId } = data;
      setImageName(imgName);
      console.log(userName, imgName, roomId + "Liveshow from use effectt");
    });
  }, [])
  console.log(heartCount);
  let countHearts = (count) => {
    setCountHeart(count => count + 1);
    setImageName("like1");
  }
  return (
    <GestureRecognizer
      onSwipeLeft={() => {
        console.log("swiped");
        setISVisible(!isVisible)
      }}
      style={styles.videoContainer}
      onSwipeRight={() => {
        console.log("swiped");
        setISVisible(!isVisible)
      }}
      style={styles.videoContainer}
    >
      <SafeAreaView style={styles.videoContainer}>
        <Video
          source={require('../../../assets/videos/LiveVideo.webm')}
          style={styles.video}
          repeat={true}
          muted={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <Header visible={isVisible} />
        <Info visible={isVisible} />
        <Sidebar
          visible={isVisible}
          giftPopVisibility={makeGiftPopVisible}
          trackHeartCount={countHearts}
        />
        <FloatingHearts count={heartCount} ImageName={imageName} />
        <FloatingHearts count={countHeart} ImageName={imageName} />
        <LiveChat
          visible={isVisible}
          messageVisibility={giftPop === true ? true : false}
        />
        <Footer
          visible={isVisible}
          footerOnGiftPop={giftPop === true ? true : false}
        />
        <View style={giftPop === true ? styles.giftContainer : {}}>
          <View style={giftPop === true ? styles.giftRowContainer : {}}>
            <Text style={giftPop === true ? styles.giftText : { fontSize: 0 }}>
              GIFTINGS
            </Text>
            <TouchableOpacity
              onPress={makeGiftPopInVisible}
              style={
                giftPop === true
                  ? styles.cancelIconTouch
                  : { height: 0, width: 0 }
              }>
              <Image
                source={require('../../../assets/icons/cancel.png')}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <<<<<<< HEAD */}
        <Livegift visible={giftPop} giftPopUpVisibility={makeGiftPopInVisible} />
      </SafeAreaView>
    </GestureRecognizer>
  );
};
// =======
<Livegift
  visible={giftPop}
  giftPopUpVisibility={makeGiftPopInVisible}
/>
      // </SafeAreaView>
    // </GestureRecognizer>
  // );
// }
// >>>>>>> feat: WIP video stream
