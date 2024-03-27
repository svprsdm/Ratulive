import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Timer from '../../Timer/timer';
import styles from '../LiveShowStyle';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {getActivesubscriber,getStreamer} from '../../../utils/api';

export default function Info(props) {
  const navigation = useNavigation();
  const [subscriberslength, setSubscriberslength] = React.useState(0);
  const [viewercount,setViewercount]= React.useState(0);
  const [time, setTime] = useState(Date.now());
  const id = props.tokenid;
  // const [goLiveProfileVisibility,setGoLiveProfileVisibility] = useState(false);
  const [topGifters, setTopGifters] = useState([
    {
      ImgSrc: "require('../../../../assets/icons/avt.jpg')",
      id: '1',
      zIndex: 3,
      marginLeft: 0,
      borderColor: 'blue',
    },
    {
      ImgSrc: "require('../../../../assets/icons/avt.jpg')",
      id: '2',
      zIndex: 2,
      marginLeft: -15,
      borderColor: 'green',
    },
    {
      ImgSrc: "require('../../../../assets/icons/avt.jpg')",
      id: '3',
      zIndex: 1,
      marginLeft: -15,
      borderColor: 'red',
    },
  ]);
  React.useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(()=>{
    // fetchactivesubscriber();
    getstreamerpearls();
 });
 
 async function getstreamerpearls(){
  try{
    const streamerinfo = await getStreamer({id});
    
    if(streamerinfo.error){
      console.log('error');
    }else{
      if(streamerinfo[0].viewerlist != null){
      setViewercount(streamerinfo[0].viewerlist.length);
      }else{
        setViewercount(0);
      }
    }
    } catch(error){
    console.log('Error while fetching user data', error);
    }
}
 async function fetchactivesubscriber(){
   try{
     const subinfo = await getActivesubscriber({id});
     if(subinfo.error){
       console.log('error');
     }else{
      //  console.log('info subcriber Response',subinfo);
       setSubscriberslength(subinfo.length);
     }
     } catch(error){
     console.log('Error while fetching active subscriber data', error);
     }
 }

  let itemBorder = function (options) {
    // console.log(options);
    return {
      borderColor: options,
    };
  };
  return (
    <View
      style={
        (styles.infoContainer,
        {
          position: 'absolute',
          width: '100%',
          display: 'flex',
          flex: 2,
          top: 50,
        })
      }>
      <View style={styles.subscriberCount}>
        <View style={{alignItems:'center'}}>
          <TouchableOpacity>
            <Image source={require('../../../../assets/icons/eye.png')} style={{width:20, height: 20}}/>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              marginLeft: 10,
              color: 'gold',
              top: '55%',
              position: 'absolute',
              flex: 1,
              backgroundColor:'rgba(0,0,0,0.8)',
              width: 40,
              textAlign:'center',
              borderRadius: 20,
              marginTop:5

            }}>
            {viewercount}
          </Text>
        </View>
      </View>

      <View style={styles.counterTimerContainer}>
        <Text style={styles.timerText}>
          <Timer />
        </Text>
      </View>
      {/* <View style={styles.gameMicroContainer}>
            <TouchableOpacity style={styles.gameContainer}>
            <Image resizeMode='contain' source={require('../../../../assets/icons/avt.jpg')} style={styles.gameIcon}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.microsdContainer}>
            <Image resizeMode='contain' source={require('../../../../assets/icons/micro-sd.png')} style={styles.microsdIcon}/>
            </TouchableOpacity>
            </View> */}
    </View>

    // <View style={styles.liveStreamSubContainer}>
    //     <View style={styles.eyesContainer}>

    //         <TouchableOpacity>
    //             <Image style={styles.eyeIcon} source={require('../../../assets/icons/eye.png')} />
    //         </TouchableOpacity>

    //         <Text style={styles.eyeNumber}>128</Text>
    //     </View>

    //     {/* <Text style={styles.dot}>.</Text> */}

    //     <TouchableOpacity>
    //         <Text style={styles.timerText}><Timer/></Text>
    //     </TouchableOpacity>
    // </View>
  );
}
