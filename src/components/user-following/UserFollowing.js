import React, { Component } from 'react';
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimension,
  TouchableOpacity,
} from 'react-native';
import styles from './UserFollowing.style';
import { useAuth } from '../../hooks/Auth';
import { getfollowing, getfollowingdetails } from '../../utils/api';
import DATA from './../../../resource/UserData';
function UserFollowing(props) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [followinginfo, setFollowinginfo] = React.useState();
  const auth = useAuth();
  const { uid } = auth?.user;
  React.useEffect(() => {
    fetch('https://picsum.photos/v2/list')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
    fetchuserfollowing();
  }, []);
  const fetchuserfollowing = async () => {
    try {
      const userfollowinginfo = await getfollowing({ uid });
      if (userfollowinginfo.error) {
        console.log('error');
      } else {
        console.log('following Data from db', userfollowinginfo);
        console.log('following Data from db', userfollowinginfo[0].follow);
        // setFollowinginfo(userfollowinginfo[0].follow);
        fetchuserDetails(userfollowinginfo[0].follow);
      }
    } catch (error) {
      console.log('Error while fetching user following data', error);
    }
  }
  const profileViewer = (items) => {
    props.navigation.navigate('Detailsprofile', {
      streameruid: items.item.uid,
    });
  }
  async function fetchuserDetails(followinginfo) {
    /*for getting user info*/
    try {
      const userinfo = await getfollowingdetails({ uid, followinginfo });
      if (userinfo.error) {
        console.log('error');
      }
      else {
        let array = [];
        console.log('Data fromdb', userinfo.length);
        console.log('Data fromd b', userinfo);
        setFollowinginfo(userinfo);
      }
    }
    catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  return (
    <View style={styles.scroll}>
      <SafeAreaView style={[styles.menuList, styles.scroll]}>
        <FlatList
          data={followinginfo}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.rowData} onPress={() => profileViewer({ item })}>
              <Image style={styles.icon} source={{ uri: item.profile_pic }} />
              <Text style={styles.menuText}>{item.name}</Text>
              {/* <View style={styles.list}>
                  <Text style={styles.rightText}>Follow</Text>
                </View> */}
            </TouchableOpacity>
          )}
        // keyExtractor={(item) => item.uid}
        />
      </SafeAreaView>
    </View>
  );
}
export default UserFollowing;