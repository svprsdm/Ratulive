import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, BackHandler, Dimensions, FlatList, ImageBackground } from 'react-native';
import StreamerList from './StreamerList';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/Auth';
import { getActiveStreams, getActiveStreamsEndedpage, updatefollower, updatefollowing, getfollowing, deletefollowing, deletefollower  } from '../../utils/api';
export default function Ended(props) {
  const navigation = useNavigation();
  const { streamerprofilepic } = props.route.params;
  const {streamerid}= props.route.params;
  const [activeStreamers, setActiveStreamers] = React.useState([]);
  const [followbutton, setFollowbutton] = React.useState('Follow');
  const auth = useAuth();
  const { uid } = auth?.user;
  const deviceWidth = Dimensions.get('window').width;
  useFocusEffect(
    React.useCallback(() => {
      const handleBackButton = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }, [])
  );
  
  useEffect(() => {
    fetchuserfollowing();
  }, [])

  const fetchuserfollowing = async () => {
    try {
      const userfollowinginfo = await getfollowing({ uid });
      if (userfollowinginfo.error) {
        console.log('error');
      } else {
        console.log('following Data from db', userfollowinginfo);
        console.log('following', userfollowinginfo.length);
        console.log('following', userfollowinginfo[0].follow[0]);
        for (let i = 0; i <= userfollowinginfo.length; i++) {
          if (streamerid == userfollowinginfo[0].follow[i]) {
            setFollowbutton('Unfollow');
          }
        }
      }
    } catch (error) {
      console.log('Error while fetching user following data', error);
    }
  }

  async function updatingfollowerandfollowing () {
    console.log('streamerid', streamerid);
    const streameridd = [streamerid];
    console.log('viewerid', uid);
    const uidd = [uid];
    console.log('viewerid', uidd);
    console.log('streamerid', streameridd);
    if (followbutton == 'Follow') {
      try {
        await updatefollower({ uid: streamerid, vieweruid: uidd });
        await updatefollowing({ uid, streameridd });
        setFollowbutton('Unfollow');
      } catch (error) {
        console.log('Error while adding follower and following', error);
      }
    } else {
      try {
        await deletefollower({ uid: streamerid, vieweruid: uidd });
        await deletefollowing({ uid, streameridd });
        setFollowbutton('Follow');
      } catch (error) {
        console.log('Error while adding follower and following', error);
      }
    }
  }

  React.useEffect(() => {
    let done = false;
    const unsubscribe = props.navigation.addListener('focus', async () => {
      try {
        const users = await getActiveStreamsEndedpage();
        // console.log({
        //   users,
        // });
        if (!done) {
          setActiveStreamers(users);
        }
      } catch (error) {
        // console.log('error in fetching active streamers', error);
      }
    });
    return () => {
      done = true;
      unsubscribe();
    };
  }, [props.navigation]);
  const openViewer = (items) => {
    props.navigation.navigate('LiveShow', { data: items });
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center', flexDirection: 'row', margin: '5%' }}>
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Image
            // source={require('../../../assets/icons/avt.jpg')}
            source={{uri:streamerprofilepic}}
            style={{ width: 50, height: 50, borderRadius: 50, margin: '5%' }}
          />
          <View
            style={{
              backgroundColor: 'yellow',
              borderRadius: 50,
              alignItems: 'center',
              marginTop: '2%',
              width: '80%',
            }}>
              <TouchableOpacity
              onPress={()=>{updatingfollowerandfollowing()}}
              >
            <Text>{followbutton}</Text>
            </TouchableOpacity>
          </View>
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
            <Text style={{ color: 'white', marginLeft: '3%' }}>1.19.10</Text>
          </View>
        </View>
      </View>
      {/* <View style={{height: '60%'}}>
        <View style={{marginTop: '10%', alignItems: 'center'}}>
          <StreamerList />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <StreamerList />
            </View>
            <Image
              source={require('../../../assets/ratu_icons/ended_logo.png')}
              style={{width: 54, height: 84}}
            />
            <View style={{alignItems: 'center'}}>
              <StreamerList />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <StreamerList />
          </View>
        </View>
      </View> */}
      <View style={{ height: '60%' }}>
        <View style={{ marginTop: '10%', marginBottom: '10%', alignItems: 'center' }}>
          <FlatList
            style={styles.flatListStyle}
            data={activeStreamers}
            removeClippedSubviews={true}
            renderItem={
              ({ item }) =>
                item.status === 'ACTIVE' &&
                item.session_id && (
                  <TouchableOpacity onPress={() => openViewer({ item })}>
                    <View style={styles.flatListImageView}>
                      <ImageBackground
                        style={styles.flatlistImage}
                        source={{ uri: item.profile_pic }}
                      >
                        {/* <Text style={{fontSize: 11, padding: 2, fontWeight: 'bold', backgroundColor:'red', color:'#fff', borderRadius:20,flexWrap:'wrap', width: 50, textAlign: 'center', margin: 5}}>{item.title}</Text> */}
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
          {/* <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/ratu_icons/ended_logo.png')}
              style={{width: 54, height: 84}}
            />
          </View> */}
        </View>
      </View>
      {/* <Text style={{backgroundColor:'yellow'}}> Back to home</Text> */}
      <Image
        source={require('../../../assets/ratu_icons/ended_logo.png')}
        style={{ width: 50, height: 84, left: deviceWidth / 2 - 25, bottom: 300 }}
      />
      <View style={styles.container_new}>
        <View style={styles.countContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Live')}
            style={styles.button}>
            <Text> Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const deviceWidth = Dimensions.get('window').width;
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
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 50,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  flatListView: {
    // marginTop: 20,
    backgroundColor: 'transparent',
    // flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
  flatListStyle: {
    top: 10,
    marginBottom: 30,
  },
  flatListImageView: {
    backgroundColor: '#000',
    width: deviceWidth / 2 - 15,
    margin: 5,
    borderRadius: 900,
  },
  flatlistImage: {
    alignSelf: 'center',
    // position:'absolute',
    backgroundColor: 'red',
    padding: 2,
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 5,
    width: '100%',
    top: 60,
    // borderRadius: 10,
    // bottom: 5
  }
});
