import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/Auth';
import { getStreamerEarnedCrowns, getStreamer, selectUser } from '../../utils/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import SocketManager from '../socket/socketManager';
export default function Earned({ route }) {
  const navigation = useNavigation();
  const auth = useAuth();
  const { uid } = auth?.user;
  const [count, setCount] = React.useState(0);
  const [giftCoinCount, setGiftCoinCount] = useState(0);
  const [pearlbalance, setPearlbalance] = useState(0);
  const [heartcount, setHeartcount] = useState();
  const [pearlbalancee, setPearlbalancee] = useState(0);
  const [pearlbalanccee, setPearlbalanccee] = useState(0);
  const [sessiontype, setSessiontype] = useState('');
  const [userpic, setUserpic] = React.useState('');
  const [privateview, setPrivateview] = useState(false);
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [privateearnedpearl, setPrivateearnedpearl] = useState(0);
  const { pearlviagifts,pearlviajoining,token_id,profPic } = route.params;
  
  
  React.useEffect(() => {  
    abbrNum(pearlviagifts, 2);
    abbrNumm(pearlviajoining, 2);   
    getstreamerpearls();   
    SocketManager.instance.listenGiftCount((count) => {
      setGiftCoinCount(prevCount => prevCount + count);
    });
    
  }, []);
 
  function durationcalc(startDate, endDate) {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
  
    const diffInSeconds = Math.floor((date2 - date1) / 1000);
  
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
  
    const formattedDifference = `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
  
    return formattedDifference;
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
  function abbrNumm(number, decPlaces) {
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
    setPearlbalanccee(number);
    return number;
  }
  // React.useLayoutEffect(() => {
       
  // });
  async function getstreamerpearls() {
    // const token_id = await AsyncStorage.getItem('current_stream_token_id');
    try {
      const streamerinfo = await getStreamer({ id: token_id });
      if (streamerinfo.error) {
        console.log('error');
      } else {       
        durationcalc(streamerinfo[0].started_at, streamerinfo[0].ended_at);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flexDirection: 'row', margin: '5%' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Image
            // source={require('../../../assets/icons/avt.jpg')}
            source={{ uri: profPic }}
            style={{ width: 50, height: 50, borderRadius: 50, margin: '5%' }}
          />
         
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>
            Live stream has ended
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../../assets/icons/clockicon.png')}
              style={{ width: 20, height: 20, borderRadius: 50 }}
            />
            <Text style={{ color: 'white', marginLeft: '3%' }}>{duration}</Text>
           
          </View>
        </View>
      </View>
      {/* <Text style={{backgroundColor:'yellow'}}> Back to home</Text> */}
      <View
        style={{
          height: '40%',
          textAlign: 'center',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: 'yellow', fontSize: 24, paddingBottom: 20 }}>
          Congratulations!
        </Text>
        <Text style={{ color: '#fff', fontSize: 18 }}>
          {/* You have Earned {count} Pearls */}
          You have Earned {pearlbalancee} Pearls from Viewer Gifts.
        </Text>
        <View>
          {privateview ? (
            <ActivityIndicator />
          ) : (
            <Text style={{ color: '#fff', fontSize: 18 }}>
              You have Earned {pearlbalanccee} Pearls from Viewer Joinings.
            </Text>
          )}
        </View>
      </View>
      <View style={styles.container_new}>
        <View style={styles.countContainer}>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="yellow"
            onPress={() => 
              navigation.navigate('Live')}
            style={styles.button}>
            <Text> Back to home</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
  container_new: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'gold',
    padding: 10,
    borderRadius: 50,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
});
