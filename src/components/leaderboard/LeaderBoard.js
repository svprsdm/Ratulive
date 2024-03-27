import React, { Component, useEffect, useState } from 'react';
import styles from './LeaderBoard.style';
import CustomFields from './CustomFields';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  // TouchableHighlight,
  FlatList,
  // ImageBackground,
  SectionList,
} from 'react-native';
import CardView from 'react-native-cardview';
import { useAuth } from '../../hooks/Auth';
import {
  getLeaderboard,
  selectUser, updatefollower, updatefollowing, getfollowing, deletefollowing, deletefollower
} from '../../utils/api';
// -import { Item } from 'react-native-paper/lib/typescript/src/components/List/List';
const imageList = [
  {
    author: 'Lisa', // User name
    download_url: require('../../../assets/girl1.png'), //User Image
    id: '500', //Pear count
  },
  {
    author: 'Andrea',
    download_url: require('../../../assets/girl2.png'),
    id: '0',
  },
  {
    author: 'Sona',
    download_url: require('../../../assets/girl3.png'),
    id: '0',
  },
  {
    author: 'Linda',
    download_url: require('../../../assets/girl4.png'),
    id: '105',
  },
  {
    author: 'Ben Moore',
    download_url: require('../../../assets/girl5.png'),
    id: '106',
  },
  {
    author: 'Asin',
    download_url: require('../../../assets/girl6.png'),
    id: '108',
  },
  {
    author: 'Nayanthara',
    download_url: require('../../../assets/girl7.png'),
    id: '106',
  },
  {
    author: 'Hanisika',
    download_url: require('../../../assets/girl8.png'),
    id: '100000',
  },
  {
    author: 'Anushka',
    download_url: require('../../../assets/girl9.png'),
    id: '100000',
  },
];
const imagesList = imageList.reverse();
export default function LeaderBoard(props) {
  const [nameval, setnameval] = React.useState('Daily', 'Weekly');
  const [selectedTab, setselectedTab] = React.useState('');
  const [tabBarList, settabBarList] = React.useState(CustomFields.tabbatList);
  const [listData, setlistData] = React.useState([]);
  const [secondtopper, setsecondtopper] = React.useState([]);
  const [today, setToday] = React.useState([]);
  const [month, setMonth] = React.useState([]);
  const [followerlength, setFollowerlength] = useState(0);
  const [Followinglength, setFollowinglength] = useState(0);
  const [followbutton, setFollowbutton] = useState('Follow');
  const auth = useAuth();
  const { uid } = auth?.user;
  // const streamerid = props.route.params.streameruid;
  //   item.author = name;
  // item.download_url = profilepic;
  // item.senderid = uid;
  // item.id = streamerid;
  // item.receiverid = streamerid;
  // useEffect(() => {
  //   fetchuserfollowing();
  // }, [])
  // const fetchuserfollowing = async () => {
  //   try {
  //     const userfollowinginfo = await getfollowing({ uid });
  //     if (userfollowinginfo.error) {
  //       console.log('error');
  //     } else {
  //       console.log('following Data from db', userfollowinginfo);
  //       console.log('following', userfollowinginfo.length);
  //       console.log('following', userfollowinginfo[0].follow[0]);
  //       for (let i = 0; i <= userfollowinginfo.length; i++) {
  //         if (streamerid == userfollowinginfo[0].follow[i]) {
  //           setFollowbutton('Unfollow');
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log('Error while fetching user following data', error);
  //   }
  // }
  // useEffect(() => {
  //   fetchuserDetails();
  // }, []);
  // async function fetchuserDetails() {
  //   /*for getting user info*/
  //   console.log('select user from details profile', streamerid);
  //   try {
  //     const userinfo = await selectUser({ uid: streamerid });
  //     if (userinfo.error) {
  //       console.log('error');
  //     } else {
  //       console.log('Data from db', userinfo);
  //       setName(userinfo[0].name);
  //       setUuserno(userinfo[0].userno);
  //       setProfilepic(userinfo[0].profile_pic);
  //       setLocation(userinfo[0].country);
  //       setFollowerlength(userinfo[0].follower.length);
  //       setFollowinglength(userinfo[0].follow.length);
  //       setPearlcount(userinfo[0].pearl_count);
  //     }
  //   } catch (error) {
  //     console.log('Error while fetching user data', error);
  //   }
  // }
  async function updatingfollowerandfollowing(item) {
    console.log('streamerid', item.uid);
    const streameridd = [item.uid];
    console.log('viewerid', uid);
    const uidd = [uid];
    console.log('viewerid', uidd);
    console.log('streamerid', streameridd);
    if (followbutton == 'Follow') {
      try {
        await updatefollower({ uid: item.uid, vieweruid: uidd });
        await updatefollowing({ uid, streameridd });
        setFollowbutton('Unfollow');
      } catch (error) {
        console.log('Error while adding follower and following', error);
      }
    } else {
      try {
        await deletefollower({ uid: item.uid, vieweruid: uidd });
        await deletefollowing({ uid, streameridd });
        setFollowbutton('Follow');
      } catch (error) {
        console.log('Error while adding follower and following', error);
      }
    }
  }
  React.useLayoutEffect(() => {
    // console.log(props.route.params.data);
    fetchLeaderboard();
  }, []);
  async function fetchLeaderboard() {
    try {
      console.log('getLeaderboard');
      //const id = tokenId;
      const subinfo = await getLeaderboard('week');
      const subbinfo = await getLeaderboard('today');
      const subbbinfo = await getLeaderboard('month');
      if (subinfo.error) {
        // console.log('error');
      } else {
        // console.log('Leaderboard Data Daily', subinfo[0]);
        setsecondtopper(subinfo);
        setToday(subbinfo);
        setMonth(subbbinfo);
        console.log('Get LeaderBoard Response response', secondtopper);
        // console.log('Daily LeaderBoard Response response', subbinfo.length);
        // setSubscriberslength(subinfo.length);
      }
    }
    catch (error) {
      // console.log('Error while fetching Leaderboard data', error);
    }
  }
  // updatingfollowerandfollowing = async () => {
  //   console.log('streamerid', streamerid);
  //   const streameridd = [streamerid];
  //   console.log('viewerid', uid);
  //   const uidd = [uid];
  //   console.log('viewerid', uidd);
  //   console.log('streamerid', streameridd);
  //   if (followbutton == 'Follow') {
  //     try {
  //       await updatefollower({ uid: streamerid, vieweruid: uidd });
  //       await updatefollowing({ uid, streameridd });
  //       setFollowbutton('Unfollow');
  //     } catch (error) {
  //       console.log('Error while adding follower and following', error);
  //     }
  //   } else {
  //     try {
  //       await deletefollower({ uid: streamerid, vieweruid: uidd });
  //       await deletefollowing({ uid, streameridd });
  //       setFollowbutton('Follow');
  //     } catch (error) {
  //       console.log('Error while adding follower and following', error);
  //     }
  //   }
  // }
  const randomHex = (index, name) => {
    setselectedTab(index);
    setnameval(name);
    // console.log('selected tab', selectedTab);
    // console.log('selected tab', nameval);
  };
  
  const profileViewer = (items) => {
    props.navigation.navigate('Detailsprofile', {
      streameruid: items.item.uid,
    });
  }

  function condition() {
    if (nameval == 'Weekly') {
      // console.log("object imagesList vinoth", today);
      if (secondtopper.length <= 0) {
        // console.log("object")
        return <View
          style={{
            textAlign: 'center',
            display: 'flex',
            // flex:1,
            alignContent: 'center',
            height: 500,
            alignItems: 'center',
            alignSelf: 'center',
            // backgroundColor:'gold',
            width: '100%',
            paddingTop: '50%'
          }}
        >
          <Text style={{
            fontSize: 10,
            color: '#fff',
            fontWeight: '900',
            marginTop: 3,
            marginLeft: 2,
          }}>No Data</Text></View>
      }
      else {
        // console.log("object24325")
        return <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 160,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 3,
              }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {secondtopper
                  .sort((a, b) => a.id < b.id)
                  .map((item, index) => (
                    <>
                      {index == 1 && (
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{ flex: 1, alignItems: 'center' }}>
                            <Image
                              source={CustomFields.variables.SilverCrown}
                              // source={{uri:'data:image/png;base64,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'}}
                              style={{ height: 27, width: 50, marginLeft: 8, top: 5 }}
                            />
                            <Image
                              style={styles.icon2}
                              source={{ uri: item.download_url }}
                            />
                            <View style={{}}>
                              <View style={styles.trapezoid2}>
                                <Text style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>TOP-2</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '700',
                                marginTop: 5
                              }}>
                              {item.author}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '300',
                              }}>
                              {' '}
                              <Image
                                style={{
                                  height: 12,
                                  width: 12,
                                  paddingLeft: 10,
                                }}
                                source={CustomFields.variables.Crown}
                              />{' '}
                              {item.id}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </>
                  ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {secondtopper.map((item, index) => (
                  <>
                    {index == 0 && (
                      <View style={{ flex: 1, alignItems: 'center' }}>
                      {/* <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={()=>{profileViewer({ item })}} > */}
                        <View style={{ flex: 1, alignItems: 'center' }}>
                        
                          <Image
                            source={CustomFields.variables.GoldCrown}
                            style={{ height: 27, width: 50 }}
                          />
                          {/* <TouchableOpacity  onPress={() => profileViewer({ item })}> */}
                          <Image
                            style={styles.icon1}
                            source={{ uri: item.download_url }}
                          />
                          {/* </TouchableOpacity> */}
                          <View style={{ flexDirection: 'row' }}>
                            <View style={styles.trapezoid1}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 2,
                                }}>
                                TOP-1
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                        </View>
                      
                    )}
                  </>
                ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {secondtopper.map((item, index) => (
                  <>
                    {index == 2 && (
                      <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}   onPress={() => profileViewer({ item })}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Image
                            source={CustomFields.variables.BronzeCrown}
                            style={{ height: 27, width: 50, marginLeft: 12 }}
                          />
                          <Image
                            style={styles.icon3}
                            source={{ uri: item.download_url }}
                          />
                          {/* <Image source={CustomFields.variables.Pentagon1} style={{height:55,width:55,marginLeft:10,marginTop:-50}} /> */}
                          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={styles.trapezoid3}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>
                                TOP-3
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </View>
            </View>
          </View>
          <SafeAreaView style={{
            height: '70%',
            // flex: 1,
            // paddingTop: StatusBar.currentHeight,
          }}>
            <ScrollView style={styles.scrollView}>
            {/* <View style={styles.flatListView}> */}
              {/* <FlatList
                data={imagesList}
                renderItem={({item, index}) =>
                  index > 2 && ( */}
              {secondtopper.map((item, index) => (
                <>
                  {index > 2 && (
                    
                      <View style={styles.flatListView}
                        contentContainerStyle={styles.rowData}
                        horizontal={false}
                      >
                        {/* Leader Profile icon */}
                        <TouchableOpacity  onPress={() => profileViewer({ item })}>
                        <View>
                          <Image style={styles.icon} source={{ uri: item.download_url }} />
                        </View>
                        <View style={[styles.leaderList]}>
                          <Text style={[styles.leaderTitle]}>{item.author}</Text>
                          <Text style={styles.leaderCount}>
                            <Image
                              style={styles.leaderIcon}
                              source={CustomFields.variables.Crown}
                            />
                            <Text style={styles.leaderCountNumber}>{item.id}</Text>
                          </Text>
                        </View>
                        {/* <TouchableOpacity
                          style={{ marginBottom: 10 }}
                          onPress={() => enterChat(item)}>
                          <Image
                            style={styles.messageItem}
                            source={CustomFields.variables.Message}
                          />
                        </TouchableOpacity> */}
                        {/* <View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "yellow",
                              height: 30, width: 80,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30
                            }}
                            // disabled={disabled}
                            onPress={() => { updatingfollowerandfollowing(item) }}
                          >
                            <Text>{followbutton}</Text>
                          </TouchableOpacity>
                        </View> */}
                        </TouchableOpacity>
                      </View>
                    
                  )}
                </>
              ))}
            {/* </View> */}
            </ScrollView>
          </SafeAreaView>
        </View>
      }
    }
    else if (nameval == 'Daily') {
      // console.log("object secondtopper ", secondtopper);
      if (today == 'No Data') {
        // console.log("object")
        return <View
          style={{
            textAlign: 'center',
            display: 'flex',
            // flex:1,
            alignContent: 'center',
            height: 500,
            alignItems: 'center',
            alignSelf: 'center',
            // backgroundColor:'gold',
            width: '100%',
            paddingTop: '50%'
          }}
        >
          <Text style={{
            fontSize: 10,
            color: '#fff',
            fontWeight: '900',
            marginTop: 3,
            marginLeft: 2,
            textAlign: 'center',
          }}>
            No Data
          </Text>
        </View>
      }
      else {
        return <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 160,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 3,
              }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {today
                  .sort((a, b) => a.id < b.id)
                  .map((item, index) => (
                    <>
                      {index == 1 && (
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{ flex: 1, alignItems: 'center' }}>
                            <Image
                              source={CustomFields.variables.SilverCrown}
                              style={{ height: 27, width: 50, marginLeft: 8, top: 5 }}
                            />
                            <Image
                              style={styles.icon2}
                              source={{ uri: item.download_url }}
                            />
                            <View style={{}}>
                              <View style={styles.trapezoid2}>
                                <Text style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>TOP-2</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '700',
                                marginTop: 5
                              }}>
                              {item.author}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '300',
                              }}>
                              {' '}
                              <Image
                                style={{
                                  height: 12,
                                  width: 12,
                                  paddingLeft: 10,
                                }}
                                source={CustomFields.variables.Crown}
                              />{' '}
                              {item.id}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </>
                  ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {today.map((item, index) => (
                  <>
                    {index == 0 && (
                      <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => profileViewer({ item })}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Image
                            source={CustomFields.variables.GoldCrown}
                            style={{ height: 27, width: 50 }}
                          />
                          <Image
                            style={styles.icon1}
                            source={{ uri: item.download_url }}
                          />
                          <View style={{ flexDirection: 'row' }}>
                            <View style={styles.trapezoid1}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 2,
                                }}>
                                TOP-1
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {today.map((item, index) => (
                  <>
                    {index == 2 && (
                      <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Image
                            source={CustomFields.variables.BronzeCrown}
                            style={{ height: 27, width: 50, marginLeft: 12 }}
                          />
                          <Image
                            style={styles.icon3}
                            source={{ uri: item.download_url }}
                          />
                          {/* <Image source={CustomFields.variables.Pentagon1} style={{height:55,width:55,marginLeft:10,marginTop:-50}} /> */}
                          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={styles.trapezoid3}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>
                                TOP-3
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </View>
            </View>
          </View>
          <SafeAreaView style={{
            height: '70%',
            // flex: 1,
            // paddingTop: StatusBar.currentHeight,
          }}>
            <ScrollView style={styles.scrollView}>
            {/* <View style={styles.flatListView}> */}
              {/* <FlatList
                data={imagesList}
                renderItem={({item, index}) =>
                  index > 2 && ( */}
              {today.map((item, index) => (
                <>
                  {index > 2 && (
                    
                      <View style={styles.flatListView}
                        contentContainerStyle={styles.rowData}
                        horizontal={false}
                      >
                        {/* Leader Profile icon */}
                        <TouchableOpacity  onPress={() => profileViewer({ item })}>
                        <View>
                          <Image style={styles.icon} source={{ uri: item.download_url }} />
                        </View>
                        <View style={[styles.leaderList]}>
                          <Text style={[styles.leaderTitle]}>{item.author}</Text>
                          <Text style={styles.leaderCount}>
                            <Image
                              style={styles.leaderIcon}
                              source={CustomFields.variables.Crown}
                            />
                            <Text style={styles.leaderCountNumber}>{item.id}</Text>
                          </Text>
                        </View>
                        {/* <TouchableOpacity
                          style={{ marginBottom: 10 }}
                          onPress={() => enterChat(item)}>
                          <Image
                            style={styles.messageItem}
                            source={CustomFields.variables.Message}
                          />
                        </TouchableOpacity> */}
                        {/* <View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "yellow",
                              height: 30, width: 80,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30
                            }}
                            // disabled={disabled}
                            onPress={() => { updatingfollowerandfollowing(item) }}
                          >
                            <Text>{followbutton}</Text>
                          </TouchableOpacity>
                        </View> */}
                        </TouchableOpacity>
                      </View>
                    
                  )}
                </>
              ))}
            {/* </View> */}
            </ScrollView>
          </SafeAreaView>
        </View>
      }
    }
    else if (nameval == 'Monthly') {
      // console.log("object secondtopper ", secondtopper);
      if (today.length <= 0) {
        // console.log("object")
        return <View
          style={{
            textAlign: 'center',
            display: 'flex',
            // flex:1,
            alignContent: 'center',
            height: 500,
            alignItems: 'center',
            alignSelf: 'center',
            // backgroundColor:'gold',
            width: '100%',
            paddingTop: '50%'
          }}
        >
          <Text style={{
            fontSize: 10,
            color: '#fff',
            fontWeight: '900',
            marginTop: 3,
            marginLeft: 2,
            textAlign: 'center',
          }}>
            No Data
          </Text>
        </View>
      }
      else {
        return <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 160,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 3,
              }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {month
                  .sort((a, b) => a.id < b.id)
                  .map((item, index) => (
                    <>
                      {index == 1 && (
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{ flex: 1, alignItems: 'center' }}>
                            <Image
                              source={CustomFields.variables.SilverCrown}
                              style={{ height: 27, width: 50, marginLeft: 8, top: 5 }}
                            />
                            <Image
                              style={styles.icon2}
                              source={{ uri: item.download_url }}
                            />
                            <View style={{}}>
                              <View style={styles.trapezoid2}>
                                <Text style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>TOP-2</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '700',
                                marginTop: 5
                              }}>
                              {item.author}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '300',
                              }}>
                              {' '}
                              <Image
                                style={{
                                  height: 12,
                                  width: 12,
                                  paddingLeft: 10,
                                }}
                                source={CustomFields.variables.Crown}
                              />{' '}
                              {item.id}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </>
                  ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {month.map((item, index) => (
                  <>
                    {index == 0 && (
                      <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Image
                            source={CustomFields.variables.GoldCrown}
                            style={{ height: 27, width: 50 }}
                          />
                          <Image
                            style={styles.icon1}
                            source={{ uri: item.download_url }}
                          />
                          <View style={{ flexDirection: 'row' }}>
                            <View style={styles.trapezoid1}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 2,
                                }}>
                                TOP-1
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {month.map((item, index) => (
                  <>
                    {index == 2 && (
                      <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Image
                            source={CustomFields.variables.BronzeCrown}
                            style={{ height: 27, width: 50, marginLeft: 12 }}
                          />
                          <Image
                            style={styles.icon3}
                            source={{ uri: item.download_url }}
                          />
                          {/* <Image source={CustomFields.variables.Pentagon1} style={{height:55,width:55,marginLeft:10,marginTop:-50}} /> */}
                          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={styles.trapezoid3}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>
                                TOP-3
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </View>
            </View>
          </View>
          <SafeAreaView style={{
            height: '70%',
            // flex: 1,
            // paddingTop: StatusBar.currentHeight,
          }}>
            <ScrollView style={styles.scrollView}>
            {/* <View style={styles.flatListView}> */}
              {/* <FlatList
                data={imagesList}
                renderItem={({item, index}) =>
                  index > 2 && ( */}
              {month.map((item, index) => (
                <>
                  {index > 2 && (
                    
                      <View style={styles.flatListView}
                        contentContainerStyle={styles.rowData}
                        horizontal={false}
                      >
                        {/* Leader Profile icon */}
                        <TouchableOpacity  onPress={() => profileViewer({ item })}>
                        <View>
                          <Image style={styles.icon} source={{ uri: item.download_url }} />
                        </View>
                        <View style={[styles.leaderList]}>
                          <Text style={[styles.leaderTitle]}>{item.author}</Text>
                          <Text style={styles.leaderCount}>
                            <Image
                              style={styles.leaderIcon}
                              source={CustomFields.variables.Crown}
                            />
                            <Text style={styles.leaderCountNumber}>{item.id}</Text>
                          </Text>
                        </View>
                        {/* <TouchableOpacity
                          style={{ marginBottom: 10 }}
                          onPress={() => enterChat(item)}>
                          <Image
                            style={styles.messageItem}
                            source={CustomFields.variables.Message}
                          />
                        </TouchableOpacity> */}
                        {/* <View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "yellow",
                              height: 30, width: 80,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30
                            }}
                            // disabled={disabled}
                            onPress={() => { updatingfollowerandfollowing(item) }}
                          >
                            <Text>{followbutton}</Text>
                          </TouchableOpacity>
                        </View> */}
                        </TouchableOpacity>
                      </View>
                    
                  )}
                </>
              ))}
            {/* </View> */}
            </ScrollView>
          </SafeAreaView>
        </View>
      }
    }
    else if (nameval == 'All Times') {
      // console.log("object secondtopper ", secondtopper);
      if (today.length <= 0) {
        // console.log("object")
        return <View
          style={{
            textAlign: 'center',
            display: 'flex',
            // flex:1,
            alignContent: 'center',
            height: 500,
            alignItems: 'center',
            alignSelf: 'center',
            // backgroundColor:'gold',
            width: '100%',
            paddingTop: '50%'
          }}
        >
          <Text style={{
            fontSize: 10,
            color: '#fff',
            fontWeight: '900',
            marginTop: 3,
            marginLeft: 2,
            textAlign: 'center',
          }}>
            No Data
          </Text>
        </View>
      }
      else {
        return <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginBottom: 160,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                flex: 3,
              }}>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {month
                  .sort((a, b) => a.id < b.id)
                  .map((item, index) => (
                    <>
                      {index == 1 && (
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                          <View style={{ flex: 1, alignItems: 'center' }}>
                            <Image
                              source={CustomFields.variables.SilverCrown}
                              style={{ height: 27, width: 50, marginLeft: 8, top: 5 }}
                            />
                            <Image
                              style={styles.icon2}
                              source={{ uri: item.download_url }}
                            />
                            <View style={{}}>
                              <View style={styles.trapezoid2}>
                                <Text style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>TOP-2</Text>
                              </View>
                            </View>
                          </View>
                          <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '700',
                                marginTop: 5
                              }}>
                              {item.author}
                            </Text>
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#FFFFFF',
                                fontWeight: '300',
                              }}>
                              {' '}
                              <Image
                                style={{
                                  height: 12,
                                  width: 12,
                                  paddingLeft: 10,
                                }}
                                source={CustomFields.variables.Crown}
                              />{' '}
                              {item.id}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </>
                  ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {month.map((item, index) => (
                  <>
                    {index == 0 && (
                      <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Image
                            source={CustomFields.variables.GoldCrown}
                            style={{ height: 27, width: 50 }}
                          />
                          <Image
                            style={styles.icon1}
                            source={{ uri: item.download_url }}
                          />
                          <View style={{ flexDirection: 'row' }}>
                            <View style={styles.trapezoid1}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 2,
                                }}>
                                TOP-1
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                {month.map((item, index) => (
                  <>
                    {index == 2 && (
                      <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                          <Image
                            source={CustomFields.variables.BronzeCrown}
                            style={{ height: 27, width: 50, marginLeft: 12 }}
                          />
                          <Image
                            style={styles.icon3}
                            source={{ uri: item.download_url }}
                          />
                          {/* <Image source={CustomFields.variables.Pentagon1} style={{height:55,width:55,marginLeft:10,marginTop:-50}} /> */}
                          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <View style={styles.trapezoid3}>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: '#000',
                                  fontWeight: '900',
                                  marginTop: 3,
                                  marginLeft: 1,
                                }}>
                                TOP-3
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', top: 100 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '700',
                              marginTop: 5
                            }}>
                            {item.author}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#FFFFFF',
                              fontWeight: '300',
                            }}>
                            {' '}
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                paddingLeft: 10,
                              }}
                              source={CustomFields.variables.Crown}
                            />{' '}
                            {item.id}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </>
                ))}
              </View>
            </View>
          </View>
          <SafeAreaView style={{
            height: '70%',
            // flex: 1,
            // paddingTop: StatusBar.currentHeight,
          }}>
            <ScrollView style={styles.scrollView}>
            {/* <View style={styles.flatListView}> */}
              {/* <FlatList
                data={imagesList}
                renderItem={({item, index}) =>
                  index > 2 && ( */}
              {month.map((item, index) => (
                <>
                  {index > 2 && (
                    
                      <View style={styles.flatListView}
                        contentContainerStyle={styles.rowData}
                        horizontal={false}
                      >
                        {/* Leader Profile icon */}
                        <TouchableOpacity  onPress={() => profileViewer({ item })}>
                        <View>
                          <Image style={styles.icon} source={{ uri: item.download_url }} />
                        </View>
                        <View style={[styles.leaderList]}>
                          <Text style={[styles.leaderTitle]}>{item.author}</Text>
                          
                        </View>
                        <View>
                          <Text style={styles.leaderCount}>
                            <Image
                              style={styles.leaderIcon}
                              source={CustomFields.variables.Crown}
                            />
                            <Text style={styles.leaderCountNumber}>{item.id}</Text>
                          </Text>
                        </View>
                        {/* <TouchableOpacity
                          style={{ marginBottom: 10 }}
                          onPress={() => enterChat(item)}>
                          <Image
                            style={styles.messageItem}
                            source={CustomFields.variables.Message}
                          />
                        </TouchableOpacity> */}
                        {/* <View>
                          <TouchableOpacity
                            style={{
                              backgroundColor: "yellow",
                              height: 30, width: 80,
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 30
                            }}
                            // disabled={disabled}
                            onPress={() => { updatingfollowerandfollowing(item) }}
                          >
                            <Text>{followbutton}</Text>
                          </TouchableOpacity>
                        </View> */}
                        </TouchableOpacity>
                      </View>
                    
                  )}
                </>
              ))}
            {/* </View> */}
            </ScrollView>
          </SafeAreaView>
        </View>
      }
    }
  }
  function renderingList() {
    if (tabBarList.length > 0 && tabBarList.length !== 0) {
      return tabBarList.map((item, index) => {
        return (
          <View style={styles.tabViewstyle}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => randomHex(index, item.name)}
              style={[
                styles.background,
                selectedTab == index
                  ? (style = { backgroundColor: 'gold' })
                  : (style = { backgroundColor: 'black' }),
              ]}>
              <Text
                style={[
                  styles.textbackground,
                  selectedTab == index
                    ? (style = styles.colorBlack)
                    : (style = styles.colorWHite),
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  const enterChat = (obj) => {
    obj.text = 'Hi';
    // console.log('Chat');
    props.navigation.navigate('Chat', { data: obj });
  };
  return (
    <View style={styles.container}>
      {/* Top Container Logo Title*/}
      <View style={styles.TopContainer}>
        <View style={styles.leftContainer}>
          <Image source={CustomFields.variables.Logo} style={styles.logo} />
          <Text style={styles.skip}>{CustomFields.title}</Text>
        </View>
      </View>
      {/* Top Filter */}
      <View style={{
        height: 50,
        marginBottom: 5,
        backgroundColor: 'black'
      }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // ref="_scrollView"
          style={styles.scrollViewStyle}>
          <View style={styles.scrollViewView}>
            <CardView cardElevation={4} style={styles.cardviewStyle}>
              {renderingList()}
            </CardView>
          </View>
        </ScrollView>
      </View>
      <View>
        {condition()}
      </View>
    </View>
  );
};