import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View, Alert, Platform, RefreshControl } from 'react-native';
import styles from './Stories.style';
import Stories from "react-native-stories-media";
import { updateMoments, selectUser, getMoments, getUserMoments } from '../../../utils/api';
import { useAuth } from '../../../hooks/Auth';
var S = [{
  username: "Guilherme",
  title: "Title story",
  profile:
    "https://avatars2.githubusercontent.com/u/26286830?s=460&u=5d586a3783a6edeb226c557240c0ba47294a4229&v=4",
  stories: [
    {
      id: 1,
      url:
        "https://images.unsplash.com/photo-1532579853048-ec5f8f15f88d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      type: "image",
      duration: 2,
      isReadMore: true,
      url_readmore: "https://github.com/iguilhermeluis",
      created: "2021-01-07T03:24:00",
    },
  ],
},]
const OwnStory = (props) => {
  // const  story  = props["data"];
  // const data= story || [];
  // console.log("object Story", props, "story", story);
  const auth = useAuth();
  const { uid } = auth?.user;
  const [status, setStatus] = useState(false);
  const [newData, setNewData] = useState(null);
  var x = [];
  React.useLayoutEffect(() => {
    //console.log("object");
    getUserStories();
    //console.log('imageuplaod status from ownstory',props.imageupload);
  },[props.imageupload]);

  async function getUserStories() {
    //console.log("test1234");
    try {
      const userMomentslist = await getUserMoments({ uid });
      //console.log("new test");
      if (userMomentslist.error) {
        console.log('error');
      } else {
        //console.log('Response for usermoments ownstory', userMomentslist);
        x.push(userMomentslist);
        // if(x){
        // setUserarray(x);}
        setNewData(x);
        setStatus(false);
        //console.log('user moments from own story', x);
        if (newData != null) {
          console.log('user moments from own stor', newData[0].username);
          console.log('user moments from ow stor', newData[0].stories);
        }
      }
    }
    catch (error) {
      console.log('Error while adding details', error);
    }
  }
  function condition() {
    if (newData == null) {
      return <Text>Moments</Text>
    } else {
      return <Stories data={newData} userid={uid}/>
    }
  }
 
  return (
    <View>
      {condition()}
    </View>
  );
}
export default OwnStory;
// const styles = new StyleSheet.create({
//   boxStory: {
//     marginLeft: 5,
//   },
//   ItemSeparator: { height: 1, backgroundColor: "#ccc" },
//   container: {
//     flex: 1,
//     // backgroundColor: "rgba(255,255,255,255)",
//     paddingBottom: 3,
//   },
//   circle: {
//     width: 50,
//     height: 50,
//     borderRadius: 60,
//     borderWidth: 2,
//     //borderColor: "#FFF",
//   },
//   superCircle: {
//     borderWidth: 3,
//     // borderColor: "blue",
//     borderRadius: 60,
//   },
//   modal: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 8,
//     textAlign: "center",
//   },
// });