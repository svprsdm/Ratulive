import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground, FlatList, TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { selectUser, updatefollower, updatefollowing, getfollowing, deletefollowing, deletefollower } from '../../utils/api';
import { useAuth } from '../../hooks/Auth';
export default function DetailedProfile(props) {
  const [items, setItems] = React.useState([{ name: "Jasmine" }, { name: 'Queen' }, { name: "Reema" }]);
  const [name, setName] = useState('');
  const [uuserno, setUuserno] = useState('');
  const [followerlength, setFollowerlength] = useState(0);
  const [Followinglength, setFollowinglength] = useState(0);
  const [pearlcount, setPearlcount] = useState(0);
  const [pearlbalancee, setPearlbalancee] = useState();
  const [profilepic, setProfilepic] = useState('');
  const [location, setLocation] = useState('');
  const [followbutton, setFollowbutton] = useState('Follow');
  const streamerid = props.route.params.streameruid;
  const auth = useAuth();
  const { uid } = auth?.user;
  const image = { uri: 'https://cdn.pixabay.com/photo/2016/11/21/16/01/attractive-1846127_960_720.jpg' };
  const item = {};
  item.author = name;
  item.download_url = profilepic;
  item.senderid = uid;
  item.id = streamerid;
  item.receiverid = streamerid;
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
  useEffect(() => {
    fetchuserDetails();
  }, []);
  async function fetchuserDetails() {
    /*for getting user info*/
    console.log('select user from details profile', streamerid);
    try {
      const userinfo = await selectUser({ uid: streamerid });
      if (userinfo.error) {
        console.log('error');
      } else {
        console.log('Data from db', userinfo);
        setName(userinfo[0].name);
        setUuserno(userinfo[0].userno);
        setProfilepic(userinfo[0].profile_pic);
        setLocation(userinfo[0].country);
        setFollowerlength(userinfo[0].follower.length);
        setFollowinglength(userinfo[0].follow.length);
        setPearlcount(userinfo[0].pearl_count);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  React.useEffect(() => {
    abbrNum(pearlcount, 2);
  }, [pearlcount])
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
  chatscreen = () => {
    console.log('chat screen props', item);
    enterChat(item);
  }
  const enterChat = (obj) => {
    obj.text = 'Hi';
    console.log('Chat');
    props.navigation.navigate('Chat', { data: obj });
  };
  updatingfollowerandfollowing = async () => {
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
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: profilepic }} style={{ width: "100%", height: "100%", position: 'absolute', top: 0 }}>
        <View style={{ backgroundColor: "rgba(0,0,0,0.8)", height: "60%", width: "100%", position: "absolute", bottom: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", margin: "5%" }}>
            {/* <Image source={require('../../../assets/ratu_icons/main_profile_pic.png')} style={{height:65,width:65}} /> */}
            <Image source={{ uri: profilepic }} style={{ height: 65, width: 65, borderRadius: 100 }} />
            <View style={{ marginLeft: "5%" }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{name}</Text>
              <View style={{ flexDirection: "row", marginTop: "2%", }}>
                <Text style={{ color: "white", fontSize: 14, fontWeight: "regular" }}>ID:{uuserno}</Text>
                <View style={{
                  height: '100%',
                  width: 2,
                  backgroundColor: 'white', marginLeft: "15%"
                }} />
                <Text style={{ color: "white", marginLeft: "15%", fontSize: 14, fontWeight: "regular" }}>{location}</Text>
              </View>
            </View>
          </View>
          {/* <FlatList
        data={items}
        renderItem={({item}) => (
          <View  style={{flexDirection:'row',margin:'5%'}}>
          <Text style={{color:"white"}}>{item.name}</Text>
          </View>
        )}
        /> */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: 30, }}>
            {/* <View style={{alignItems:"center"}}>
          <Text style={{color:"white"}}> Friends</Text>
          <Text style={{color:"yellow",marginTop:"10%"}}>290</Text>
        </View> */}
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 18 }}> Followers</Text>
              <Text style={{ color: "yellow", marginTop: "10%" }}>{followerlength}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 18 }}> Following</Text>
              <Text style={{ color: "yellow", marginTop: "10%" }}>{Followinglength}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 18 }}>Pearls</Text>
              <Text style={{ color: "yellow", marginTop: "10%" }}>{pearlbalancee}</Text>
              {/* <Text style={{color:"yellow",marginTop:"10%"}}>{pearlcount}</Text> */}
            </View>
          </View>
          <View style={{ marginTop: '0%', marginLeft: '5%', marginBottom: 15 }}>
            <Text style={{ color: "white" }}>Bio : "The Purpose of our lives is to be happy"</Text>
          </View>
          {/* <View style={{flexDirection:'row',justifyContent:'space-between', marginLeft: 30, marginright: 30,}}>
        <View>
          <Text><Image source={require('../../../assets/icons/bluegirl.png')} style={{height:60,width:60}} /></Text> 
          <Text style={{color:"yellow",marginTop:"10%", textAlign: 'center',right: 3}}>10</Text>
        </View>
        <View>
          <Text><Image source={require('../../../assets/icons/unicorn.png')} style={{height:60,width:60}} /></Text> 
          <Text style={{color:"yellow",marginTop:"10%", textAlign: 'center',right: 3}}>10</Text>
        </View>
        <View>
          <Text><Image source={require('../../../assets/icons/joker.png')} style={{height:60,width:60}} /></Text> 
          <Text style={{color:"yellow",marginTop:"10%", textAlign: 'center',right: 3}}>1</Text>
        </View>
        <View>
          <Text><Image source={require('../../../assets/icons/bluegirl.png')} style={{height:60,width:60}} /></Text> 
          <Text style={{color:"yellow",marginTop:"10%", textAlign: 'center',right: 3}}>2</Text>
        </View>
      </View> */}
          <View style={{ marginLeft: '20%', marginRight: "20%", marginTop: '10%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ backgroundColor: "yellow", height: 40, width: 100, alignItems: "center", justifyContent: "center", borderRadius: 30 }}
              onPress={chatscreen}
            ><Text>Chat</Text></TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "yellow",
                height: 40, width: 100,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30
              }}
              // disabled={disabled}
              onPress={updatingfollowerandfollowing}
            >
              <Text>{followbutton}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
});