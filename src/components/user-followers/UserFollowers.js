import React, { Component } from 'react';
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from './UserFollowers.style';
import { useAuth } from '../../hooks/Auth';
import { getfollower, getfollowerdetails } from '../../utils/api';
import DATA from './../../../resource/UserData';
function UserFollowers(props) {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [followerinfo, setFollowerinfo] = React.useState();
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
    fetchuserfollowers();
  }, []);
  const fetchuserfollowers = async () => {
    try {
      const userfollowerinfo = await getfollower({ uid });
      if (userfollowerinfo.error) {
        console.log('error');
      } else {
        console.log('follower Data from db', userfollowerinfo);
        console.log('follower Data from db', userfollowerinfo[0].follower);
        fetchuserDetails(userfollowerinfo[0].follower);
      }
    } catch (error) {
      console.log('Error while fetching user follower data', error);
    }
  }
  const profileViewer = (items) => {
    props.navigation.navigate('Detailsprofile', {
      streameruid: items.item.uid,
    });
  }
  async function fetchuserDetails(followerinfo) {
    /*for getting user info*/
    try {
      console.log('followerinfo', followerinfo);
      const userinfo = await getfollowerdetails({ uid, followerinfo });
      if (userinfo.error) {
        console.log('error');
      }
      else {
        let array = [];
        console.log('Data fromdb', userinfo.length);
        console.log('Data fromd b', userinfo);
        setFollowerinfo(userinfo);
      }
    }
    catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  return (
    <View style={styles.scroll}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={[styles.menuList, styles.scroll]}>
          <FlatList
            data={followerinfo}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.rowData} onPress={() => profileViewer({ item })}>
                <Image
                  style={styles.icon}
                  source={{ uri: item.profile_pic }}
                />
                <Text style={styles.menuText}>{item.name}</Text>
                {/* <View style={styles.list}>
                    <Text style={styles.rightText}>Follow</Text>
                  </View> */}
              </TouchableOpacity>
            )}
          // keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
    </View>
  );
}
export default UserFollowers;