import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
  Pressable,
  ScreenWidth,
  window,
  location,
  isScreenFocused,
  ToastAndroid,
  RefreshControl,
  PermissionsAndroid,
  Platform
} from 'react-native';

import Modal from 'react-native-modal';
import styles from './DashboardStyle';
import CustomFields from './CustomField';
import CardView from 'react-native-cardview';
import { SliderBox } from 'react-native-image-slider-box';
import { getActiveStreams, getFollowActiveStreams, getLocationActiveStreams,updateCurrentLocation,deleteInactiveActivestreamer,getExistingstream,deletePublisher,deleteActivePublisher,updateUserReceivedcrowns,getStreamer,getPopularActiveStreams} from '../../utils/api';
import KeepAwake from 'react-native-keep-awake';
// import Geolocation from '@react-native-community/geolocation';
import { useAuth } from '../../hooks/Auth';
import { selectUser, updateUser } from '../../utils/api';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import RNSettings from 'react-native-settings';

Geocoder.init("AIzaSyDn9BnRvDJSlM7yAjJWMJAfIA-xIBxR-FM"); // use a valid API key
import users from '../../storage/storage';
// import GetLocation from 'react-native-get-location'
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
// GetLocation.getCurrentPosition({
//   enableHighAccuracy: true,
//   timeout: 15000,
// })
// .then(location => {
//   console.log(location);
// })
// .catch(error => {
//   const { code, message } = error;
//   console.warn(code, message);
// })
export default function Dashboard(
  props,
  // shouldBeAwake
) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [StreamcloseModal, setStreamcloseModal] = useState(false);
  const toggleModal = () => { setModalVisible(!isModalVisible); };
  const auth = useAuth();
  const { photoURL, uid } = auth?.user;
  // if (shouldBeAwake) {KeepAwake.activate();}
  // else {KeepAwake.deactivate();}
  const [nameVal, setNameVal] = useState('Popular');
  const [selectedTab, setSelectedTab] = useState('');
  const [tabBarList, setTabBarList] = useState(
    CustomFields.variables.tabbatList,
  );
  const [displayAdImages, setDisplayAdImages] = useState(
    CustomFields.variables.displayAdArray,
  );
  const listRef = useRef(null);
  const [time, setTime] = useState(Date.now());
  const [refreshing, setRefreshing] = React.useState(false);
  const [Address, setAddress] = React.useState(null);
  const [location, setLocation] = React.useState('');
  const [existingstreamid, setExistingstreamid] = React.useState('');
  const [privatepearls, setPrivatepearls] = React.useState(0);
  const [giftedpearls, setGiftedpearls] = React.useState(0);
  const [giftringgits,setGiftringgits] = React.useState(0);
  const [city, setCity] = useState('');


  React.useLayoutEffect(()=>{
    const getResult = async () => {
    const existingstream = await getExistingstream(uid);
    if (existingstream.error) {
      console.log('error');
    } else {
      if(existingstream[0] != undefined){
      //console.log('user exist');
      //console.log('user exist',existingstream[0]);
      setExistingstreamid(existingstream[0].token_id);
      setStreamcloseModal(true);
      }else{
        console.log('user does not exist');
      }
    }}
    getResult();
    // deleteinactivestreamer();
  },[])

  React.useEffect(() => {
    //setModalVisible(true);
    locationEnable();
    onRefresh();
  }, []);

  
  async function UpdateUserDetails(cityName) {
    //console.log('update same user');
    try {
      await updateCurrentLocation({ uid, city: cityName });
      ToastAndroid.show('Location fetched successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }

  async function deleteinactivestreamer(){
    try {
     // console.log('deleting inactive streamers');
      await deleteInactiveActivestreamer({
        id: uid,
      });
    } catch (error) {
      console.log('error while deleting user from stream', error);
    }
  }
  
  async function streamprogressupdation(){
    try {
      await deletePublisher({
        id: existingstreamid,
      });
      await deleteActivePublisher({
        id: existingstreamid,
        uid: uid,
      });
      
      // console.log('earned crowns from stream page',this.state.giftCoinCount);
    } catch (error) {
      console.log('error while deleting user from stream or updating received pearls', error);
    }

  }

  async function getstreamerpearls() {
    try {
      const streamerinfo = await getStreamer({ id: existingstreamid });
      if (streamerinfo.error) {
        console.log('error');
      } else {
        setPrivatepearls(streamerinfo[0].pearls_via_private);
      setGiftedpearls(streamerinfo[0].new_earned_crowns);
      setGiftringgits(streamerinfo[0].ringgits_earned);
      
      if(giftedpearls != null){
        if(streamerinfo[0].new_earned_crowns != null || streamerinfo[0].pearls_via_private != null){
          const totalpearl = streamerinfo[0].pearls_via_private + streamerinfo[0].new_earned_crowns;
          const totalringgit = streamerinfo[0].ringgits_earned + streamerinfo[0].pearls_via_private*0.000250227*0.1;
        await updateUserReceivedcrowns({
          uid: uid,
          pearls: JSON.stringify(totalpearl) + " Pearls" + "/ RM " + JSON.stringify(totalringgit)
        });
        }
    }
      }
     
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

  function locationEnable (){
    // console.log(" Location Line 1")
    RNSettings.getSetting(RNSettings.LOCATION_SETTING).then((result) => {
      if (result == RNSettings.ENABLED) {
          // props.navigation.navigate('Profile');
        Geolocation.getCurrentPosition(
          (position) => {
            // alert('123' + JSON.stringify(position));
            //console.log("Position", position);
            Geocoder.from(position.coords.latitude, position.coords.longitude)
              // Geocoder.from({
              //   latitude : 41.89,
              //   longitude : 12.49
              // })
              .then(json => {
                //console.log("json", json);
                var addressComponent = json.results[0].address_components[0];
                // var location = json.results[0];
                var location = json.results[0].geometry.location;
                const userLocation = json.results[0].formatted_address;
                var cityName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'locality').length > 0)[0].long_name;
                //console.log("Adress Component", userLocation);
                //console.log("city", cityName);
                //console.log("location", location);
                UpdateUserDetails(cityName);
                // console.log(addressComponent);
              })
              .catch(error => console.warn(error));
          },
        );
      }
      else {
        console.log('location is disenabled');
      }
    });
  };

  React.useEffect(() => {
    fetchuserDetails();
  },[]);
  const [activeStreamers, setActiveStreamers] = useState([]);
  const [followactiveStreamers, setFollowactiveStreamers] = useState([]);
  const [locationactiveStreamers, setLocationactiveStreamers] = useState([]);
  const [popularactiveStreamers, setPopularactiveStreamers] = useState([]);
  // const [render, setRender] = useState(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //       setRender(!render);
  //   }, 20000);
  // }, [isScreenFocused, render])
  const onRefresh = React.useCallback(async () => {
    // console.log(" On refresh")
    let done = false;
    setRefreshing(true);
    try {
      const users = await getActiveStreams();
      const userss = await getFollowActiveStreams(uid);
      const usersss = await getLocationActiveStreams(uid);
      // const uuser = await getPopularActiveStreams(uid);
      
      setLocationactiveStreamers(usersss);
      setFollowactiveStreamers(userss);
      setActiveStreamers(users);
      // setPopularactiveStreamers(uuser);
      setRefreshing(false);
      done = setTimeout(onRefresh, 3000);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);
  async function fetchuserDetails() {
    /*for getting user info*/
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        setCity(userinfo[0].current_location);
        
      }
    } catch (error) {
    }
  }
  React.useEffect(() => {
    let done = false;
    const unsubscribe = props.navigation.addListener('focus', async () => {
      try {
        const activeStreamers = await getActiveStreams();
        
        if (!done) {
          setActiveStreamers(activeStreamers);
          
        }
      } catch (error) {
      }
    });
    return () => {
      done = true;
      unsubscribe();
    };
  }, [props.navigation]);


  React.useEffect(() => {
    let done = false;
    const unsubscribe = props.navigation.addListener('focus', async () => {
      try {
        const followActiveStreamers = await getFollowActiveStreams(uid);
        
        if (!done) {
          // const x = [];
          
          // for (var i = 0; i < users.data.length; i++) {
          //   x.push(users.data[i][0])
          // }
          setFollowactiveStreamers(followActiveStreamers);
        }
      } catch (error) {
        console.log('error in fetching follow active streamers - dashboard screen', error);
      }
    });
    return () => {
      done = true;
      unsubscribe();
    };
  }, [props.navigation]);


  React.useEffect(() => {

    let done = false;
    const unsubscribe = props.navigation.addListener('focus', async () => {
      try {
        const locActiveStreamers = await getLocationActiveStreams(uid);
        
        if (!done) {
          
          // const x = [];
          // for (var i = 0; i < users.data.length; i++) {
          //   x.push(users.data[i][0])
          // }

          setLocationactiveStreamers(locActiveStreamers);
          
        }
      } catch (error) {
        console.log('error in fetching Location based active streamers  - dashboard screen', error);
      }
    });
    return () => {
      done = true;
      unsubscribe();
    };
  }, [props.navigation]);

  // React.useEffect(() => {
  //   let done = false;
  //   const unsubscribe = props.navigation.addListener('focus', async () => {
  //     try {
  //       const users = await getPopularActiveStreams(uid);
  //       if (!done) {
  //         const x = [];
  //         for (var i = 0; i < users.data.length; i++) {
  //           x.push(users.data[i][0])
  //         }
  //         setPopularactiveStreamers(x);
  //       }
  //     } catch (error) {
  //       console.log('error in fetching popular based active streamers', error);
  //     }
  //   });
  //   return () => {
  //     done = true;
  //     unsubscribe();
  //   };
  // }, [props.navigation]);


  const randomHex = (index, name) => {
    setSelectedTab(index);
    setNameVal(name);
    // console.log('screen',nameVal);
  };
  function condition() {
    if (nameVal == '' || nameVal == 'Popular') {
      return <FlatList
        style={styles.flatListStyle}
        data={activeStreamers}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={
          ({ item,index }) =>
            item.active_status === 'ACTIVE' &&
            item.session_id && (
              <TouchableOpacity onPress={() => openViewer({ item,index })}>
                <View style={styles.flatListImageView}>
                  <ImageBackground
                    style={styles.flatlistImage}
                    source={{ uri: item.profile_pic }}
                  >
                    <Text style={styles.flatlistImageTitle} numberOfLines={1}>
                      {item.title}
                      {/* yuiytfgyugiggugiuighbxgyugs uhytudsiwhsyx8gsiushwyxs iuhxys8wg */}
                      </Text>
                    <View style={styles.imageTextView}>
                      <Text
                        style={styles.statusText}>
                        {item.user_name}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    } else if (nameVal == 'Follow') {
      return <FlatList
        style={styles.flatListStyle}
        data={followactiveStreamers}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={
          ({ item, index }) =>
            item.active_status === 'ACTIVE' &&
            item.session_id && (
              <TouchableOpacity onPress={() => openViewer({ item, index })}>
                <View style={styles.flatListImageView}>
                  <ImageBackground
                    style={styles.flatlistImage}
                    source={{ uri: item.profile_pic }}
                  >
                    <Text style={styles.flatlistImageTitle} numberOfLines={1}>
                      {item.title}</Text>
                    <View style={styles.imageTextView}>
                      <Text
                        style={styles.statusText}>
                        {item.user_name}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    } else if (nameVal == 'Nearby') {
      return <FlatList
        style={styles.flatListStyle}
        data={locationactiveStreamers}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={
          ({ item, index }) =>
            item.active_status === 'ACTIVE' &&
            item.session_id && (
              <TouchableOpacity onPress={() => openViewer({ item, index })}>
                <View style={styles.flatListImageView}>
                  <ImageBackground
                    style={styles.flatlistImage}
                    source={{ uri: item.profile_pic }}
                  >
                    <Text style={styles.flatlistImageTitle} numberOfLines={1}>
                      {item.title}</Text>
                    <View style={styles.imageTextView}>
                      <Text
                        style={styles.statusText}>
                        {item.user_name}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )
        }
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
      />
    } 
    // else if (nameVal == 'Popular') {
    //   return <FlatList
    //     style={styles.flatListStyle}
    //     data={popularactiveStreamers}
    //     removeClippedSubviews={true}
    //     refreshControl={
    //       <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //     }
    //     renderItem={
    //       ({ item }) =>
    //         item.active_status === 'ACTIVE' &&
    //         item.session_id && (
    //           <TouchableOpacity onPress={() => openViewer({ item })}>
    //             <View style={styles.flatListImageView}>
    //               <ImageBackground
    //                 style={styles.flatlistImage}
    //                 source={{ uri: item.profile_pic }}
    //               >
    //                 <Text style={styles.flatlistImageTitle} numberOfLines={1}>
    //                   {item.title}</Text>
    //                 <View style={styles.imageTextView}>
    //                   <Text
    //                     style={styles.statusText}>
    //                     {item.user_name}
    //                   </Text>
    //                 </View>
    //               </ImageBackground>
    //             </View>
    //           </TouchableOpacity>
    //         )
    //     }
    //     numColumns={2}
    //     keyExtractor={(item, index) => index.toString()}
    //   />
    // }
  }

  // console.log(photoURL)
  const renderingList = () => {
    if (tabBarList.length > 0) {
      return tabBarList.map((item, index) => {
        return (
          <View style={styles.tabViewstyle}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => randomHex(index, item.name)}
              style={[
                styles.background,
                selectedTab === index
                  ? { backgroundColor: '#E0B037' }
                  : { backgroundColor: '#000' },
              ]}>
              <Text
                style={[
                  styles.textbackground,
                  selectedTab === index ? { color: '#000' } : { color: '#fff' },
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  const openViewer = (items,index) => {
    const activeuser = items.item;
    console.log('Index Value from Dashboard', index);
          activeuser['position'] = 0;
    console.log('Position Object from Dashboard', activeuser.position);
    const kickedoutlist = items.item.kickedoutuser;
    if (kickedoutlist != null) {
      var condition = kickedoutlist.indexOf(uid);
      if (condition >= 0) {
        ToastAndroid.show('You cannot enter into a kickout stream', ToastAndroid.SHORT);
      }
      else {
        props.navigation.navigate('swipeLive', { activeusers: activeuser });
      };
    } else {
        props.navigation.navigate('swipeLive', { activeusers: activeuser });
    }
  };
  function Item({ title, image }) {
    return (
      <View style={styles.item}>
        <Image source={IMAGES['image' + image]} style={styles.thumbnail} />
        <Text style={styles.itemText}>{title}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <View style={styles.leftContainer}>
          <Image source={CustomFields.variables.Logo} style={styles.logo} />
          <Image
            source={CustomFields.variables.location}
            style={styles.marker}
          />
          {/* <Text style={styles.skip}>{CustomFields.variables.title}</Text> */}
          <Text style={styles.skip}>{city}</Text>
        </View>
        <View style={styles.rightContainer}>
          {/* <Image
            source={CustomFields.variables.notification}
            style={styles.notification}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Location')}>
            <Image
              source={CustomFields.variables.search}
              style={styles.notification}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{ height: 35 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ref={listRef}
          style={styles.scrollViewStyle}>
          <View style={styles.scrollViewView}>
            <CardView cardElevation={4} style={styles.cardviewStyle}>
              {renderingList()}
            </CardView>
          </View>
        </ScrollView>
      </View>
      <View style={styles.sliderBoxView}>
        <SliderBox
          images={displayAdImages}
          sliderBoxHeight={94}
          dotColor={'black'}
          inactiveDotColor={'white'}
          paginationBoxVerticalPadding={5}
          autoplay
          circleLoop
          dotStyle={{ height: 8, width: 8, borderRadius: 10 }}
          parentWidth={deviceWidth - 20}
          ImageComponentStyle={{ borderRadius: 10 }}
        />
      </View>
      {/* <View style={{display:'none'}}>
        <Modal isVisible={isModalVisible} backdropOpacity={0.80} coverScreen={true}>
          <View style={{flex: 1, flexDirection:'row', height: '100%'}}>
            <View style={{backgroundColor: 'red'}}>
              <View style={{}}>
                <RNCheckboxCard
                  text="Day 1"
                  quantity="x2"
                  enableQuantityText
                  onPress={(checked) => console.log("Checked: ", checked)}
                  width={120}
                  style={{backgroundColor: "#000",  borderRadius:"100"}}
                />
              </View>
              <View>
                <RNCheckboxCard
                  text="Day 2"
                  quantity="x2"
                  enableQuantityText
                  onPress={(checked) => console.log("Checked: ", checked)}
                  width={120}
                />
              </View>
            </View>
            <View style={{}}>
              <TouchableOpacity
                style={{bottom: 0, alignItems:'center', alignSelf:'center', position:'absolute'}}
                onPress={toggleModal}
              >
                <Text style={{color: "#000", textAlign: "center", backgroundColor: "gold", padding:10, borderRadius: 100, fontWeight: 'bold'}}>x</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View> */}
      <View style={styles.flatListView}>
        {condition()}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Fetch Current Location</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!isModalVisible);
                locationEnable();
              }}
            >
              <Text style={styles.textStyle}>Ok, Proceed</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={StreamcloseModal}
        // onRequestClose={() => {
        //   setStreamcloseModal(!StreamcloseModal);
        // }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Your previous session was interrupted, Please click ok to save the process</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setStreamcloseModal(!StreamcloseModal);
                streamprogressupdation();
                getstreamerpearls();             
                
              }}
            >
              <Text style={styles.textStyle}>Ok, Proceed</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}