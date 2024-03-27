import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Alert,
  ToastAndroid
} from 'react-native';
import styles from './UserProfile.style';
import { useAuth } from '../../hooks/Auth';
import users from '../../storage/storage';
import { selectUser, updateUserPic } from '../../utils/api';
import useFetchCrowns from '../../hooks/useFetchCrowns';
import File from '../refer/FileBase64';
import { Capacitor, Plugins, CameraResultType, FilesystemDirectory } from '@capacitor/core';
const { Camera, Filesystem } = Plugins;
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import PhotoUpload from 'react-native-photo-upload';
var ImagePicker = require('react-native-image-picker');
// =====Upload End=========
const onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'Checkout This Ratulive https://www.ratulive.com/ is an interactive live-streaming platform for instant communication and new friends.',
      url: File.appLogo,
    });
    // console.log(JSON.stringify(result));
  } catch (error) {
    // console.log(error);
  }
};
// const connection = [
//   // {key: '1', title: 'Friends', count: 31},
//   {key: '2', title: 'Followers', count: followercount},
//   {key: '3', title: 'Following', count: followingcount},
//    {key: '4', title: 'Pearls', count: 0},
// ];
function UserProfile(props) {
  const auth = useAuth();
  const { email, displayName, photoURL, uid } = auth?.user;
  const { allCrowns, fetchCrowns } = useFetchCrowns();
  const [crowns, setCrowns] = React.useState(allCrowns);
  const [followercount, setFollowercount] = useState(0);
  const [followingcount, setFollowingcount] = useState(0);
  const [pearlbalancee, setPearlbalancee] = useState();
  const [pearlcount, setPearlcount] = useState(0);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageSource, setImageSource] = useState(null);
  const [displayimage, setDisplayimage] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const connection = [
    // {key: '1', title: 'Friends', count: 31},
    { key: '2', title: 'Followers', count: followercount },
    { key: '3', title: 'Following', count: followingcount },
    { key: '4', title: 'Pearls', count: pearlbalancee },
  ];
  function selectImage() {
    let options = {
      title: 'You can choose one image',
      maxWidth: 256,
      maxHeight: 256,
      // mediaType:'mixed',
      mediaType: 'photo',
      // mediaType: 'video',
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log({ response });
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].uri;
        // console.log('assests',response.assets[0].uri);
        // console.log({ "Image Path": source });
        setImage(source);
        uploadImage(source);
      }
    });
  }
  const uploadImage = async (uri) => {
    // console.log({"UrlFromUpload":uri});
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    try {
      await task;
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      const downloadUrl = await storage().ref(filename).getDownloadURL();
      // console.log({"downloadUrl":downloadUrl});
      setDisplayimage(downloadUrl);
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded Successfully!'
    );
    setImage(null);
  };

  React.useEffect(() => {
    
    onRefresh();
   
  }, []);

  const onRefresh = React.useCallback(async () => {
    // console.log(" On refresh")
    let done = false;
    setRefreshing(true);
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        // console.log('error');
      } else {
        // console.log('Response',userinfo);
        if (userinfo[0].follower == null) {
          setFollowercount(0);
        } else {
          setFollowercount(userinfo[0].follower.length);
        }
        if (userinfo[0].follow == null) {
          setFollowingcount(0);
        } else {
          setFollowingcount(userinfo[0].follow.length);
        }
        setPearlcount(userinfo[0].pearl_count);
        abbrNum(pearlcount, 2);
      }
      setRefreshing(false);
      done = setTimeout(onRefresh, 5000);
    } catch (error) {
      console.error(error);
    }
  }, [refreshing]);

  React.useEffect(() => {
    if (displayimage != null) {
      updateprofilepic();
    }
  }, [displayimage])
  const updateprofilepic = async () => {
    try {
      const { email, displayName, photoURL, uid } = auth?.user;
      await updateUserPic({ uid, displayimage });
      ToastAndroid.show('Saved Successfully!!!', ToastAndroid.SHORT);
    } catch (error) {
      // console.log('Error while adding details', error);
    }
  }
  useEffect(() => {
    fetchuser();
  });
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
  async function fetchuser() {
    // /for getting user info/
    // console.log('select user');
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        // console.log('error');
      } else {
        // console.log('Response',userinfo);
        if (userinfo[0].follower == null) {
          setFollowercount(0);
        } else {
          setFollowercount(userinfo[0].follower.length);
        }
        if (userinfo[0].follow == null) {
          setFollowingcount(0);
        } else {
          setFollowingcount(userinfo[0].follow.length);
        }
        setPearlcount(userinfo[0].pearl_count);
        abbrNum(pearlcount, 2);
        // console.log('followercount',pearlcount);
        // console.log('followercount',followercount);
        // console.log('followercount',followingcount);
      }
    } catch (error) {
      // console.log('Error while fetching user data', error);
    }
  }
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action'
      const crwns = await fetchCrowns();
      setCrowns(crwns);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [allCrowns, fetchCrowns, props.navigation]);
  const DATA = [
    // {
    //   id: 1,
    //   title: 'Home',
    //   image: require('./../../../assets/ico_homepro.png'),
    //   onPress: 'home',
    // },
    {
      id: 2,
      title: 'Moments',
      image: require('./../../../assets/ico_momentspro.png'),
      onPress: 'moments',
    },
    {
      id: 3,
      title: 'Wallet',
      image: require('./../../../assets/ico_walletpro.png'),
      //count: crowns,
      onPress: 'wallet',
    },
    {
      id: 4,
      title: 'Messages',
      image: require('./../../../assets/ico_msgpro.png'),
      onPress: 'messages',
    },
    {
      id: 5,
      title: 'Topup Crowns',
      image: require('./../../../assets/ratu_icons/crown_icons.png'),
      onPress: 'topup',
    },
    {
      id: 6,
      title: 'Refer Friend',
      image: require('./../../../assets/ico_referpro.png'),
      // onPress: 'onShare',
      onPress: 'share',
    },
    {
      id: 7,
      title: 'Support',
      image: require('./../../../assets/ico_supportpro.png'),
      onPress: 'support',
    },
    {
      id: 7,
      title: 'Settings',
      image: require('./../../../assets/ico_referpro.png'),
      onPress: 'Setting',
    },
    {
      id: 8,
      title: 'Signout',
      image: require('./../../../assets/ratu_icons/logout.png'),
      onPress: 'signout',
    },
  ];
  // console.log('profileauth', auth);
  //Edit User
  const editUser = () => {
    // console.log('Edit');
    props.navigation.navigate('EditProfile');
  };
  const renderContactHeader = () => {
    // const {avatar, name, Id} =props;
    const { email, displayName, photoURL, uid } = auth?.user;
    const [userno, setUserno] = React.useState(0);
    const avatar = require('./../../../assets/Avatar.png')
    const avatarr = { avatar }
    const defaultpicture = avatarr.avatar;
    const [profilepic, setProfilepic] = React.useState();
    // console.log(profilepic);
    const [username, setUsername] = React.useState('');
    const [userpic, setUserpic] = React.useState('');
    const [usercrowns, setUsercrowns] = React.useState('');
    // const handleChoosePhoto = async () => {
    // }
    useEffect(() => {
      fetchuserDetails();
    });
    async function fetchuserDetails() {
      // /for getting user info/
      // console.log('select user');
      try {
        const userinfo = await selectUser({ uid });
        if (userinfo.error) {
          // console.log('error');
        } else {
          // console.log('Response',userinfo);
          setUserno(userinfo[0].userno);
          setProfilepic(userinfo[0].profile_pic);
          setUsername(userinfo[0].name);
          setUsercrowns(userinfo[0].wallet);
          //setUserpearl(userinfo[0].pearl_count);
          // console.log(userno);
          // console.log(profilepic);
          // console.log(username);
        }
      } catch (error) {
        // console.log('Error while fetching user data', error);
      }
    }
    return (
      <View style={styles.headerContainer}>
        <View style={styles.userProfile}>
          <View style={styles.leftContainer}>
            <Image
              style={styles.userCrown}
              source={require('./../../../assets/crown.png')}
              style={{ width: 35, height: 25, tintColor: 'gold' }}
            />
            <View>
              <TouchableOpacity
                //  onPress={handleChoosePhoto}
                // onPress={choosePhoto}
                onPress={selectImage}
              >
                {profilepic == null ? (
                  <Image
                    source={defaultpicture}
                    style={styles.userImage} />
                ) : <Image
                  style={styles.userImage}
                  source={{ uri: profilepic }}
                />}
              </TouchableOpacity>
            </View>
            <View style={styles.userNameRow}>
              <Text style={styles.userNameText}>{username}</Text>
            </View>
            <View style={styles.userBioRow}>
              <Text style={styles.userBioText}>ID: {userno}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => editUser()}>
              <Image
                style={styles.editIcon}
                source={require('./../../../assets/edit.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const callMethod = (option) => {
    const { googleSignOut } = auth;
    switch (option) {
      case 'moments':
        // console.log('moments');
        props.navigation.navigate('Moments');
        break;
      case 'wallet':
        // console.log('wallet');
        props.navigation.navigate('Wallet');
        break;
      case 'messages':
        props.navigation.navigate('message');
        // console.log('messages');
        break;
      case 'topup':
        // console.log('topup');
        props.navigation.navigate('topup');
        break;
      case 'share':
        // console.log('Refer');
        props.navigation.navigate('Refer');
        break;
      case 'support':
        // console.log('support');
        props.navigation.navigate('Support');
        break;
      case 'Setting':
        // console.log('setting');
        props.navigation.navigate('Setting');
        break;
      case 'signout':
        googleSignOut();
        break;
    }
  };
  const countData = (item) => {
    const count = { friend: 45, followers: followercount, following: followingcount };
    props.navigation.navigate('Info', {
      item: item.title,
      count: count,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>{renderContactHeader()}</View>
      {/* <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
          <Text style={styles.buttonText}>Pick an image</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {image !== null ? (
            <Image source={{ uri: image.uri }} style={styles.imageBox} />
          ) : null}
          {uploading ? (
            <View style={styles.progressBarContainer}>
              <Progress.Bar progress={transferred} width={300} />
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.buttonText}>Upload image</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView> */}
      <SafeAreaView style={styles.popular}>
        <FlatList
          data={connection}
          horizontal={true}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => countData(item)}
              style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: Dimensions.get('screen').width / 3,
              }}>
              <Animated.Text style={styles.tabLabel}>
                {item.title}
              </Animated.Text>
              <Animated.Text style={styles.tabLabelNumber}>
                {item.count}
              </Animated.Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
      <SafeAreaView style={styles.menuList}>
        <FlatList
          data={DATA}
          
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => callMethod(item.onPress)}>
              <Image style={styles.icon} source={item.image} />
              <Text style={[styles.menuText, { color: '#ffffff' }]}>
                {item.title}
              </Text>
              {item.count ? (
                <Text style={styles.menuLink}>{item.count}</Text>
              ) : (
                <Text style={{ flex: 1 }}></Text>
              )}
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}
export default UserProfile;