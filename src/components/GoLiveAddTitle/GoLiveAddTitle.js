import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
  TouchableHighlight,
  Dimensions,
  Modal
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import GoPrivate from './GoPrivate';
import GoPrivateCrown from './GoPrivateCrown';
import { selectUser } from '../../utils/api'
import { useAuth } from '../../hooks/Auth';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import users from '../../storage/storage';
// import Axios from 'axios' 
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
function GoLiveAddTitle(props) {
  const [showBtn, setShowBtn] = useState(false);
  const [title, setTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const userid = users[2];
  const handleChangeInput = value => {
    setInputValue(value);
    console.log(value);
  };
  const [shouldShow, setShouldShow] = useState(false);
  const btnHandler = () => {
    setShowBtn(!showBtn);
  };
  const navigation = useNavigation();
  const auth = useAuth();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalUserPicVisible, setModalUserPicVisible] = React.useState(false);
  const { email, displayName, photoURL, uid } = auth?.user;
  const [userno, setUserno] = React.useState();
  const [username, setUsername] = React.useState('');
  const [userpic, setUserpic] = React.useState('');
  useEffect(() => {
    fetchuserDetails();    
  });

  
  async function fetchuserDetails() {
    /*for getting user info*/
    console.log('select user');
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        console.log('Response', userinfo);
        setUserno(userinfo[0].userno);
        setUserpic(userinfo[0].profile_pic);
        setUsername(userinfo[0].name);
        
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  // publicchoice = async()=>{
  //   console.log('Tokenid',token_id);
  //   try {
  //     await updateUser({});
  //  } catch (error) {
  //     console.log('Error while adding details', error);
  //  }
  // navigation.navigate('Live');
  // console.log('public pressed');
  // }
  // privatechoice= ()=>{
  //   try {
  //     await updateUser({});
  //  } catch (error) {
  //     console.log('Error while adding details', error);
  //  }
  // }
  return (
    <SafeAreaView style={{
      backgroundColor: '#000',
    }}
    >
      <View style={styles.container}>
        <View style={styles.headContainer}>
          <Image
            source={require('../../../assets/icons/R.png')}
            style={styles.ricongolive}
          />
          {/* <TouchableOpacity onPress={publicchoice}>
              <Image
                source={require('../../../assets/icons/cancel.png')}
                style={styles.cancelIcongolive}
              />
            </TouchableOpacity> */}
        </View>
        <ScrollView>
          <View style={styles.containerBody}>
            <Image
              source={{ uri: userpic }}
              style={styles.avatar}
            />
            <Text style={{ color: '#fff', fontSize: 18, paddingTop: 5, fontWeight: 'bold' }}>
              {username}
            </Text>
            <Text style={{
              color: '#000',
              fontSize: 14,
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 246, 143, 1)',
              padding: 5,
              borderRadius: 10,
              margin: 5
            }}>
              Ratu ID: {userno}
            </Text>
            <TextInput
              style={styles.addTitle}
              placeholder="Add Title"
              placeholderTextColor="white"
              // value={showBtn}
              // onChangeText={handleChangeInput}
              // onChange={btnHandler}
              value={title}
              onChangeText={(title) => {
                setTitle(title);
              }}
            />
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={styles.okBtn}
                onPress={() => {
                  if(userpic === null || typeof userpic === "undefined")
                  {
                    setModalUserPicVisible(true);
                  }else {
                    setModalVisible(true);
                  }
                  
                }}
              >
                <Text style={{ fontSize: 14 }}>Go Public</Text>
              </TouchableOpacity>
              {showBtn !== '' ? (
                <TouchableOpacity onPress={() => {
                  if(userpic === null || typeof userpic === "undefined")
                  {
                    setModalUserPicVisible(true);
                  }else {
                    setShouldShow(!shouldShow)
                  } 
                
              }}
                
                style={styles.okBtn}>
                  <View>
                    <Text style={{ fontSize: 14, color: '#000' }}>Go Private</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
            {shouldShow ? (
              <View style={{
                width: '80%',
                color: '#fff',
                flexDirection: 'row',
                // marginTop: 20,
                zIndex: 99999,
                display: 'flex',
                flex: 1,
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                alignSelf: 'center',
                position: 'relative'
              }}
              >
                <GoPrivate
                  title={title} />
                <GoPrivateCrown
                  title={title} />
              </View>
            ) : null}
            {/* <View style={
                {
                  position:'relative',
                  top: 30,
                  zIndex:-99999
                }
              }>
                <TouchableOpacity onPress={() => setShouldShow(!shouldShow)}>
                  <Image
                    source={require('../../../assets/ratu_icons/lock.png')} style={{width: 50, height: 50, left: 15, marginBottom: 10}}
                  />
                  <Text style={{color: '#fff', fontSize:18}}>Go Private</Text>
                </TouchableOpacity>
              </View> */}
          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalUserPicVisible}
          onRequestClose={() => {
            setModalUserPicVisible(!modalUserPicVisible);
          }}
        >
          <View style={styles.centeredView}>
            <Text style={styles.modalText}>Please upload the profile under profile menu at bottom.</Text>
            <View style={styles.modalView}>             
              <TouchableHighlight
                activeOpacity={0.8}
                underlayColor="yellow"
                style={[styles.button, styles.buttonClose]}
                onPress={() => {                  
                  setModalUserPicVisible(!modalUserPicVisible);             
                  setTimeout(() => {
                    navigation.navigate('UserProfile');
                  }, 500); // Adjust the delay as needed (in milliseconds)
                }}
              >
                <Text style={styles.textStyle}>OK </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <Text style={styles.modalText}>Are you sure,Do you want to start a Public session</Text>
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
                  // setShouldShow(!shouldShow);
                  setTimeout(() => {
                    navigation.navigate('GoLiveLiveStream', {
                      selectedItem: props.selectedItem,
                      title: title,
                    })
                  }, 300)
                }}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cancelIcongolive: {
    height: 20,
    width: 20,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '2%',
  },
  container: {
    // flex: 1, 
    // backgroundColor: '#000',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  containerBody: {
    // bottom: 0,
    // position: 'relative',
    alignItems: 'center',
    // flexDirection: 'column',
    // height: '100%',
    height: responsiveScreenHeight(70), // 50% of Screen height
    width: responsiveScreenWidth(100), // 50% of Screen width
    flex: 1
  },
  avatar: {
    height: 60,
    width: 60,
    padding: 10,
    borderRadius: 70,
    borderColor: '#FFD949',
    borderWidth: 3,
  },
  addTitle: {
    height: 50,
    marginTop: '5%',
    borderWidth: 1,
    width: '80%',
    borderRadius: 5,
    borderColor: '#FFD949',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingLeft: 25,
    color: '#fff',
    bottom: 15,
  },
  okBtn: {
    backgroundColor: '#FFD949',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10
  },
  result: {
    // bottom: -100,
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
    marginLeft: 20,
    marginRight: 20,
    top: 10,
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
export default GoLiveAddTitle;
