import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { Card } from 'react-native-paper';
import GoliveMenu from "./GoliveMenu";
import { getStreamer, getviewerlistdetails, updatekickout,updateekickout, getstreamerlistdetails } from "../../utils/api";
import { ToastAndroid } from 'react-native';
const GoLiveProfileView = (props) => {
  const [visible, setVisible] = React.useState(props.visible);
  const [viewerinfo, setViewerinfo] = React.useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [kickoutusername, setkickoutusername] = React.useState('');
  const [kickoutuserid, setkickoutuserid] = React.useState('');
  const [selectedusername, setselectedusername] = React.useState('');
  const [selecteduserprofilepic, setselecteduserprofilepic] = React.useState('');
  const [selecteduserid, setselecteduserid] = React.useState('');
  const itemm = {};
  itemm.author = selectedusername;
  itemm.download_url = selecteduserprofilepic;
  // item.senderid = uid;
  itemm.id = selecteduserid;
  itemm.receiverid = selecteduserid;
  itemm.text = 'Hi'
  // console.log('visible',props.visible);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible])
  useEffect(() => {
    fetchuserDetails();
    // getstreamerpearls()
  })
  function chatscreen(item) {
    // setselecteduserid(item.uid);
    // setselectedusername(item.name);
    // setselecteduserprofilepic(item.profile_pic);
    itemm.author = item.name;
    itemm.download_url = item.profile_pic;
    itemm.id = item.uid;
    itemm.receiverid = item.uid;
    itemm.text = 'Hi'
    console.log('chat screen props', itemm);
    props.navigation.navigate('Chat', { data: itemm });
    // enterChat(itemm);
  }
  // chatscreen =(item)=>{
  //   setselecteduserid(item.uid);
  //   setselectedusername(item.name);
  //   setselecteduserprofilepic(item.profile_pic);
  //   console.log('chat screen props',item);
  //   enterChat(itemm);
  // }
  const enterChat = (obj) => {
    obj.text = 'Hi';
    console.log('Chat');
    console.log('Chat', props);
    console.log('chat screen props', obj);
  };
  async function getstreamerpearls() {
    try {
      console.log('userprofile', props.tokenid);
      const streamerinfo = await getStreamer({ id: props.tokenid });
      if (streamerinfo.error) {
        console.log('error');
      } else {
        // console.log('userprofile',props.tokenid);
        // console.log('userprofilee',streamerinfo[0].viewerlist);
        if (streamerinfo[0].viewerlist != null) {
          fetchuserDetails(streamerinfo[0].viewerlist);
        }
        // fetchuserDetails(userfollowerinfo[0].follower);
        // if(streamerinfo[0].viewerlist != null){
        // setViewercount(streamerinfo[0].viewerlist.length);
        // }else{
        //   setViewercount(0);
        // }
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  async function fetchuserDetails() {
    /*for getting user info*/
    try {
      // const userinfo = await getstreamerlistdetails({tokenId:props.tokenid});
      const userinfo = await getstreamerlistdetails({ id: props.tokenid });
      if (userinfo.error) {
        console.log('error');
      }
      else {
        // let array=[];
        // console.log('Data from',userinfo.length);
        // console.log('Data from',userinfo);
        // console.log('Data from',userinfo.data);
        setViewerinfo(userinfo);
        // console.log('****************',userinfo);
        // console.log('Data from',userinfo.data[0]);
      }
    }
    catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  async function kickoutuser() {
    const kickoutuseridd = [kickoutuserid];
    try {
      console.log('kickout user request');
      await updatekickout({ id: props.tokenid, userid: kickoutuseridd })
      await updateekickout({ id: props.tokenid, userid: kickoutuseridd })
      ToastAndroid.show('Your request has been submitted', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error while updating viewergifts', error);
    }
  }
  if (visible === true) {
    return (
      <Card style={styles.cards}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerContent}>Top Gifters </Text>
            <TouchableOpacity
              style={styles.cancelIconTouch}
              onPress={() => setVisible(false)}
            >
              <Image
                source={require('../../../assets/icons/cancel.png')}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            {viewerinfo
            .sort((a, b) => a.pearls < b.pearls)
            .map((item, index) => (
              <>
                {index >= 0 && (
                  <SafeAreaView style={{
                    height: 70
                  }}>
                    <ScrollView
                      contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        borderBottomColor: '#666',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        height: 80,
                        overflow: 'hidden',
                        marginBottom: 2,
                        marginTop: 2,
                        paddingHorizontal: 5,
                      }}
                      horizontal={false}
                    >
                      <View style={styles.mainViewerContainer}>
            <View style={styles.detailprofileContainer}>
              <Image
              style={styles.profileLogo}
              source={{uri:item.profile_pic}}
              />
              <View style={styles.profileNameContainer}>
                <Text style={styles.profileName}>{item.name}</Text>
                <View style={styles.premiumContainer}>
                <Image
                style={styles.premiumIcon}
                source={require('../../../assets/ratu_icons/pearl1_icon.png')}
                />
                <Text style={styles.premiumNumber}>{item.pearls}</Text>
                </View>
              </View>
              
              {/* <View> */}
              {/* <View>
                <TouchableHighlight
                style={{
                  left:-250,
                  top:10
              }}
                 onPress={()=>{
                setkickoutuserid(item.uid);
                setkickoutusername(item.name);
                setModalVisible(true);
                }}>
                  <Image
                  style={{
                    width: 22,
                    height: 22,
                    
                  }}
                  source={require('../../../assets/icons/logout.png')}
                  />
                </TouchableHighlight>
                </View> */}


                <TouchableHighlight
                style={{
                  top: 10,
                  left:120
              }}
                onPress={()=>{
                  console.log('message',item.uid);
                  console.log('message',item.name);
                  console.log('message',item.profile_pic);
                  chatscreen(item);
                }}
                  >
                  <Image
                  style={{
                    width: 30,
                    height: 30,
                    left:-5
                }}
                  source={require('../../../assets/icons/login.png')}
                  />
                </TouchableHighlight>
                
                <View>
                <TouchableHighlight
                style={{
                  left:10,
                  top:13
              }}
                 onPress={()=>{
                setkickoutuserid(item.uid);
                setkickoutusername(item.name);
                setModalVisible(true);
                }}>
                  <Image
                  style={{
                    width: 22,
                    height: 22,
                    left:-5
                  }}
                  source={require('../../../assets/icons/logout.png')}
                  />
                </TouchableHighlight>
                </View>
              
              
              {/* <TouchableOpacity
                style={{left:-40,
                  top:15}}
              >
                <GoliveMenu 
                userid={item.uid}
                username={item.name}
                id={props.tokenid}/>
              </TouchableOpacity> */}
            </View>
          </View>
                    </ScrollView>
                  </SafeAreaView>
                )}
              </>
            ))}
          </View>
          {/* start hear */}
          {/* <FlatList
        data={viewerinfo}
        renderItem={({item}) => (
          <View style={styles.mainViewerContainer}>
            <View style={styles.detailprofileContainer}>
              <Image
              style={styles.profileLogo}
              source={{uri:item.profile_pic}}
              />
              <View style={styles.profileNameContainer}>
                <Text style={styles.profileName}>{item.name}</Text>
                <View style={styles.premiumContainer}>
                <Image
                style={styles.premiumIcon}
                source={require('../../../assets/ratu_icons/pearl1_icon.png')}
                />
                <Text style={styles.premiumNumber}>{item.pearls}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={()=>{
                setkickoutuserid(item.uid);
                setkickoutusername(item.name);
                setModalVisible(true);
                }}>
                  <Image
                  style={styles.addfriendIcon}
                  source={require('../../../assets/icons/logout.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                onPress={()=>{
                  console.log('message',item.uid);
                  console.log('message',item.name);
                  console.log('message',item.profile_pic);
                  chatscreen(item);
                }}
                  >
                  <Image
                  style={{width: 30,
                    top: '28%',
                    height: 30,}}
                  source={require('../../../assets/icons/login.png')}
                  />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity>
                <GoliveMenu 
                userid={item.uid}
                username={item.name}
                id={props.tokenid}/>
              </TouchableOpacity>
            </View>
          </View>
          )}
          /> */}
          {/* end hear */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <Text style={styles.modalText}>Are you sure you want to Kickout {kickoutusername} from session </Text>
              <View style={styles.modalView}>
                <TouchableHighlight
                  activeOpacity={0.9}
                  underlayColor="#ccc"
                  style={[styles.button, styles.buttonNo]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  activeOpacity={0.8}
                  underlayColor="yellow"
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    kickoutuser();
                  }}
                >
                  <Text style={styles.textStyle}>Yes</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </Card>
    );
  } else {
    return (
      <View />
    );
  }
};
const styles = StyleSheet.create({
  cards: {
    height: '60%',
    opacity: 0.7,
    backgroundColor: '#000',
    borderRadius: 45,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: (15, 8),
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: -3,
    margin: (5, 5)
  },
  headerContent: {
    color: '#fff',
    left: 40,
    fontWeight: 'bold',
    fontSize: 25,
  },
  mainViewerContainer: {
    alignItems: 'stretch',
    marginTop: 10,
  },
  detailprofileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 0,
  },
  profileLogo: {
    width: 50,
    top: '0%',
    height: 50,
  },
  profileName: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileNameContainer: {
    flexDirection: 'column',
    left: 15,
    width: '40%',
  },
  premiumContainer: {
    flexDirection: 'row',
    bottom: 5,
  },
  premiumIcon: {
    width: 15,
    top: '7%',
    left: 5,
    height: 18,
  },
  premiumNumber: {
    fontSize: 12,
    top: '7%',
    left: '40%',
    color: '#dfe6e9',
  },
  addfriendIcon: {
    width: 22,
    top: 15,
    height: 22,
    // left:140
  },
  lineContainer: {
    top: 10,
    margin: (10, 10),
  },
  line: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    opacity: 0.3,
  },
  cancelIcon: {
    width: 19,
    height: 19,
    left:-10
  },
  cancelIconTouch: {
    width: 20,
    left: 50,
    height: 20,
    marginTop: 20,
    marginLeft: '20%',
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: '45%',
    backgroundColor: "rgba(0,0,0,0.95)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    top: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    flexDirection: 'column',
    color: 'white'
  },
  modalView: {
    margin: 20,
    flexDirection: 'row',
    // justifyContent:'flex-end', 
    // alignItems: 'flex-end'
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 80,
    margin: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "gold",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '40%'
  },
  buttonNo: {
    backgroundColor: "grey",
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  },
});
export default GoLiveProfileView;
