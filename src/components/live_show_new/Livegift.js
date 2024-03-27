import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ToastAndroid
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import styles from './LiveShowStyle';
import SocketManager from '../socket/socketManager';
import { gif } from './Gif';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/Auth';
import { selectUser, updateWallet,updategiftingbalance } from '../../utils/api';
import Carousel, { Pagination } from "react-native-snap-carousel";
import useFetchCrowns from '../../hooks/useFetchCrowns';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
export default function Livegift(props) {
  const auth = useAuth();
  const { uid } = auth?.user;
  const { allCrowns, fetchCrowns } = useFetchCrowns();
  const [crowns, setCrowns] = React.useState(allCrowns);
  // const [buttonpressed,setButtonpressed] = React.useState(true);
  const [balance, setBalance] = React.useState(0);
  const [giftValue, setGiftValue] = React.useState(0);
  const usercrowns = Number(balance) - Number(giftValue);
  const navigation = useNavigation();
  // const [username, setUsername] = React.useState('');
  const username = props.username;
  const [gifttimes, setGifttimes] = React.useState(1);
  const [giftname, setGiftname] = React.useState('');
  const id = props.tokenid;
  const [count, setCount] = useState(0);
  
  React.useLayoutEffect(() => {
    fetchuserDetails();
  });
  React.useEffect(() => {
    // if (giftValue > 0 && props.walletbal > 0) {
      if (balance >= giftValue) {
      updateUserWallet();
    }
  }, [count])
  
  async function fetchuserDetails() {
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        // console.log('Response from Livegift',userinfo);
        setBalance(userinfo[0].wallet);
        // setUsername(userinfo[0].name);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  const [gifttCounter, setGiftCounter] = useState(1);
  const editUser = () => {
    // console.log('Edit');
    props.navigation.navigate('EditProfile');
  };
  const updateUserWallet = async () => {
    try {
      // const usercrowns = await Number(balance) - Number(giftValue);
      const updatestatus = await updategiftingbalance({
        uid: uid,
        wallet: giftValue
      });
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }
  const topup = () => {
    // console.log('Top up Wallet');
    props.navigation.navigate('topup');
  }
  const [items, setItems] = React.useState([
    {
      count: 15,
      // img: require('../../../assets/Mango.png'),
      img: require('../../../assets/Mango.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Mango',
    },
    {
      count: 25,
      img: require('../../../assets/Cherry.webp'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Cherry',
    },
    {
      count: 35,
      img: require('../../../assets/Peach.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Peach',
    },
    {
      count: 150,
      img: require('../../../assets/Rose.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Rose',
    },
    {
      count: 350,
      img: require('../../../assets/Horse.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Horse',
    },
    {
      count: 500,
      img: require('../../../assets/Dolphin.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Dolphin',
    },
    {
      count: 750,
      img: require('../../../assets/Wine.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Wine',
    },
    {
      count: 1000,
      img: require('../../../assets/Champagne.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Champagne',
    },
    {
      count: 1250,
      img: require('../../../assets/Watch.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Watch',
    },
    {
      count: 2000,
      img: require('../../../assets/Key.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Key',
    },
    {
      count: 3500,
      img: require('../../../assets/Eyeliner.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Eyeliner',
    },
    {
      count: 5000,
      img: require('../../../assets/Lipstick.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Lipstick',
    },
    {
      count: 7000,
      img: require('../../../assets/Dress.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Dress',
    },
    {
      count: 8000,
      img: require('../../../assets/Perfume.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Perfume',
    },
    {
      count: 9000,
      img: require('../../../assets/handBag.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'handBag',
    },
    {
      count: 15000,
      img: require('../../../assets/Sportscar.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Sportscar',
    },
    {
      count: 15000,
      img: require('../../../assets/GoldEarrings.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'GoldEarrings',
    },
    {
      count: 20000,
      img: require('../../../assets/GoldNeckless.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'GoldNeckless',
    },
    {
      count: 25000,
      img: require('../../../assets/SpeedBoat.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'SpeedBoat',
    },
    {
      count: 30000,
      img: require('../../../assets/PearlRing.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'PearlRing',
    },
    {
      count: 35000,
      img: require('../../../assets/PearlEarrings.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'PearlEarrings',
    },
    {
      count: 50000,
      img: require('../../../assets/DiamondRing.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'DiamondRing',
    },
    {
      count: 75000,
      img: require('../../../assets/DiamondEarrings.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'DiamondEarrings',
    },
    {
      count: 100000,
      img: require('../../../assets/DiamondNeckless.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'DiamondNeckless',
    },
    {
      count: 100000,
      img: require('../../../assets/RoyalChariot.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'RoyalChariot',
    },
    {
      count: 150000,
      img: require('../../../assets/Royalcar.png'),
      img2: require('../../../assets/icons/premium.png'),
      name: 'Royalcar',
    },
  ]);
  if (props.visible == true) {
    return (
      <View style={styles.giftContainer}>
        <View>
          <View style={styles.giftRowContainer}>
            <Text style={styles.giftText}>GIFTING</Text>
            <TouchableOpacity
              style={styles.cancelIconTouch}
              hitSlop={{top: 20, bottom: 20, left: 30, right: 20}}
              onPress={() =>
              // {props.giftPopUpVisibility(true);}
              { props.giftPopUpVisibility(false); }
              }
            >
              <Image
                source={require('../../../assets/icons/cancel.png')}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </View>
          <FlatGrid
            // horizontal={true}
            itemDimension={60}
            data={items}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <ScrollView horizontal={true} style={{}}>
                <TouchableOpacity
                  onPress={async () => {
                    // props.giftPopUpVisibility(false);
                    // if (item.count <= props.walletbal) {
                      if (item.count <= balance) {
                        setGiftname(item.name);
                      setGiftValue(item.count);
                      setCount(count + 1);
                      if (item.name == giftname) {
                        setGifttimes(gifttimes + 1);
                        SocketManager.instance.emitSendGifts({
                          roomId: Math.random().toString(36).substring(7),
                          tokenId: id,
                          userName: username,
                          imgName: item.name,
                          giftCoin: item.count,
                          times: gifttimes,
                          userid: uid,
                          // delay: 10000
                        });
                      } else if (item.name != giftname) {
                        const times = 1;
                        SocketManager.instance.emitSendGifts({
                          roomId: Math.random().toString(36).substring(7),
                          tokenId: id,
                          userName: username,
                          imgName: item.name,
                          giftCoin: item.count,
                          times: times,
                          userid: uid,
                          // delay: 10000
                        });
                        setGifttimes(2);
                      }
                      // setGiftname(item.name);
                      // setGiftValue(item.count);
                      // setCount(count + 1);
                    } else {
                      ToastAndroid.show('Please select a gift with lesser value', ToastAndroid.SHORT);
                    }
                  }}>
                  <Image style={styles.giftsIcon} source={item.img} />
                  <View style={styles.giftIconContainer}>
                    <Image source={item.img2} style={styles.premiumIcon} />
                    <Text style={styles.giftIconnumber}>{item.count}</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            )}
          />
          <View style={{
            width: '100%',
            zIndex: 99999,
            height: 40,
            backgroundColor: '#000',
            flexDirection: 'row',
            bottom: 10,
            padding: 10
          }}
          >
            <View style={{
              justifyContent: 'flex-start',
              color: "#fff"
            }}>
              <TouchableOpacity>
                <Text style={{
                  color: '#fff',
                  padding: 5,
                  top: 0,
                  flexDirection: 'row',
                }}>
                  {/* <Text>Wallet Balance: {props.walletbal}</Text> */}
                  <Text>Wallet Balance: {balance}</Text>
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{
              justifyContent: 'flex-end',
              position: 'absolute',
              right: 20,
              top: 5
            }}
            >
              <TouchableOpacity onPress={() => navigation.navigate('topup')}>
                <Text style={{
                  color: '#000',
                  backgroundColor: 'gold',
                  padding: 5,
                  borderRadius: 20,
                  flexDirection: 'row',
                }}>
                  Topup
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <View />;
  }
}
