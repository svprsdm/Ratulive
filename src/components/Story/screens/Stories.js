import React, { useRef, useState, useEffect } from 'react';
import { FlatList, Image,Modal, Text, TouchableOpacity, View, Alert, Platform, RefreshControl } from 'react-native';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import AllStories from '../constants/AllStories';
import StoryContainer from '../components/StoryContainer';
import styles from './Stories.style';
import CustomFields from '../../moments/CustomFields'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import storage from '@react-native-firebase/storage';
import { updateMoments, selectUser, deleteUserStory, getMoments, getUserMoments } from '../../../utils/api';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
var ImagePicker = require('react-native-image-picker');
import { useAuth } from '../../../hooks/Auth';
import OwnStory from './ownStory';

import { MenuProvider } from 'react-native-popup-menu';
export const Stories = () => (
  <MenuProvider>
    <Stories1 />
  </MenuProvider>
);

const Stories1 = (props) => {
  const auth = useAuth();
  const { uid } = auth?.user;
  const [isModelOpen, setModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [isUserModelOpen, setUserModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const [moments, setMoments] = useState([]);
  const [name, setName] = useState([]);
  const [usertime, setusertime] = useState();
  const [arr, setArr] = useState([]);
  const [imagearray,setImagearray] = useState([]);
  const [userarray, setUserarray] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadstatus, setUploadstatus] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [imageSource, setImageSource] = useState(null);
  const [displayimage, setDisplayimage] = useState([]);
  const modalScroll = useRef(null);
  const [newDataa, setNewDataa] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  let array=[];
  React.useEffect(() => {
    onRefresh();
  },[]);

  // React.useEffect(() => {
  //   condition();
  // },[refreshing]);
  var x = [];
  var momTempList = [];
  // React.useLayoutEffect(() => {
  //   console.log("object");
  //   getUserStories();
  // }, []);
  
  const onRefresh = React.useCallback(async () => {
   
    let done = false;
    setRefreshing(true);
    try {
      const userMomentslist = await getMoments({ uid });
    
      if (userMomentslist.error) {
        console.log('error');
      } else {
       
        setArr(userMomentslist);      
        setRefreshing(false);
        done = setTimeout(onRefresh, 5000);
      }
    }
    catch (error) {
      console.log('Error while getting follower moments', error);
    }
  }, [refreshing]);
  // let index=AllStories[4].stories.length;
  // let arr = [];
  
  // arr = AllStories
  const onStorySelect = (index) => {    
    setCurrentUserIndex(index);
    setModel(true);
  };
  const onUserStorySelect = () => {
    // const index=0;
   
    setCurrentUserIndex(index);
    setUserModel(true);
  };
  const onStoryClose = () => {
    setModel(false);
  };
  const onDeleteStoryClose = () => {
    setDeleteModel(false);
  };
  // const arr=(src,id,type,duration,isReadMore,isPaused)=>{
 
  //   src=src; id=id; type=type; duration=duration;
  //   isReadMore=isReadMore; isPaused=isPaused;
 
  // }
  React.useLayoutEffect(() => {
    //  getUserStories();
    fetchuserDetails();
    getStories();
  },[])
  // useEffect(() => {
  //   fetchUserMoments();
  //   getStories();
  // }, [displayimage])
  async function fetchuserDetails() {
    /*for getting user info*/
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        setName(userinfo[0].name);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

  async function updateUserMoments(uploadedimage){
  // const updateUserMoments = async (uploadedimage) => {
    try {
     
      const updatestatus = await updateMoments({
        uid: uid,
        url: uploadedimage,
      });
      if (updatestatus != null) {
       
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded Successfully!'
        );
        setUploadstatus(!uploadstatus);
      }
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }
  // get stories from database
  async function getStories() {
    
    try {
      const userMomentslist = await getMoments({ uid });
      
      if (userMomentslist.error) {
        console.log('error');
      } else {
        // console.log('Response from FollowerMoments',userMomentslist);
        setArr(userMomentslist);
        
      }
    }
    catch (error) {
      console.log('Error while getting follower moments', error);
    }
  }
  //get stories of user
  async function getUserStories(){
    
    try{
    const userMomentslist=await getUserMoments({uid});
   
    if(userMomentslist.error){
      console.log('error');
    }else{
      // var x=[];
      // console.log('Response from FollowerMoments',userMomentslist);
      // console.log('user moments user moments',userMomentslist.profile);
      momTempList.push(userMomentslist);
      setusertime(userMomentslist.momenttime);
      setNewDataa(momTempList);
      
    }
    }
    catch(error){
      console.log('Error while adding details', error);
    }
  }
  function condition() {
    //  if(userarray != null){
    return <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'center'
    }}
    >
      <OwnStory imageupload= {uploadstatus}/>
      <View style={{ flexDirection: 'column', justifyContent: "space-around" }}>
        <Text style={styles.title}> {name}</Text>
        <Text style={styles.title2}> {usertime}</Text>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: "flex-end", alignContent: 'flex-end' }}>
        <TouchableOpacity onPress={() => { deleteStatus() }}
          style={{
            // flex:1,
            flexDirection: 'row',
            left: 180,
            // top: -20,
            marginBottom: 10,
            padding: 15,
            // backgroundColor:'yellow'
          }}>
          <Image
            source={CustomFields.variables.Delete}
            style={{
              width: 16,
              height: 16,
              top: 0,
              right: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  }
  const uploadImage = async (uri) => {
    
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
      
      setImagearray(downloadUrl);
      array.push(downloadUrl);
      // setImagearray(array);
      setDisplayimage(downloadUrl);     
      updateUserMoments(array);
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded Successfully!'
    // );
    setImage(null);
    // setUploadstatus(!uploadstatus);
  };
  const uploadVideo = async (uri, name) => {
   
    // const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const filename = name;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const result = await RNFetchBlob.fs.readFile(uri, 'base64');
    const task = storage()
      .ref(filename)
      .putString(result, 'base64');
    try {
      await task;
      task.on('state_changed', snapshot => {
        setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        );
      });
      const downloadUrl = await storage().ref(filename).getDownloadURL();
      
      array.push(downloadUrl);
      updateUserMoments(array);
      setDisplayimage(downloadUrl);
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    // Alert.alert(
    //   'Photo uploaded!',
    //   'Your photo has been uploaded Successfully!'
    // );
    setImage(null);
  };
  const camera = () => {
    let options = {
      title: 'You can choose one image',
      //maxWidth: 256,
      //maxHeight: 256,
      quality: 1,      
      includeBase64: true,
      presentationStyle: 'fullScreen',
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchCamera(options, response => {
      
      if (response.didCancel) {
        
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].uri;
        //console.log('assests', response.assets[0].uri);
        //console.log({ "Image Path": source });
        setImage(source);
        uploadImage(source);
      }
    });
   
  }
  async function getFileInfo() {
   
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.video],
      })
   
      console.log(
        res['0'].uri,
        res['0'].type, // mime type
        res['0'].name,
        res['0'].size,
      );
      uploadVideo(res['0'].uri, res['0'].name);
      // setImage(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }
  const video = () => {
    let options = {
      title: 'You can choose one image',
      //maxWidth: 256,
      //maxHeight: 256,
      mediaType: 'video',
      quality: 1,
      durationLimit: 30,
      allowsEditing: true,
      includeBase64: true,
      presentationStyle: 'fullScreen',
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
      
      if (response.didCancel) {
       
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].uri;
       
        setImage(source);
        getFileInfo(source);
      }
    });
  
  }
  const gallery = () => {
    let options = {
      title: 'You can choose one image',
      //maxWidth: 256,
      //maxHeight: 256,
      quality: 1,
      durationLimit: 30,
      allowsEditing: true,
      nodata: true,    
      presentationStyle: 'fullScreen',
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchImageLibrary(options, response => {
     
      if (response.didCancel) {
        
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response.assets[0].uri;
        setImage(source);
        uploadImage(source);
      }
    });
 
  }
  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (AllStories.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };
  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };
  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
     
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
     
      setCurrentScrollValue(scrollValue);
    }
  };
  const renderSeperator = () => (
    <View style={{ height: 1, backgroundColor: '#666', marginTop: 4, marginBottom: 4 }} />
  );
  async function deleteStatus() {
    getUserStories();
    setDeleteModel(true);
    
    
  }
  async function onDeleteStory(index) {
    
    if(newDataa != null){
    
    const moment = newDataa[0]['stories'][index].url;
    var momentList = [];
    momentList.push(moment);
   
    const deleteData = await deleteUserStory(uid, momentList);
    
    setDeleteModel(false);
    setUploadstatus(!uploadstatus);
    }
  }
  const closeAlert = () => {
    setDeleteModel(false);
  }
  return (
    <View style={styles.container}>
      <View style={{
        //borderBottomColor: '#999',
        paddingBottom: 10,
        borderBottomWidth: 0.5
      }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 15,
            paddingLeft: 15,
            paddingTop: 2,
            paddingBottom: 2
          }}>
            {condition()}
            
          </View>
        
      </View>
      <Text style={{ color: '#fff', backgroundColor: 'gold', fontSize: 14, color: '#000', padding: 5,borderRadius:8 }}>User Moments</Text>
      {/*
       )}
     /> */}
     <Modal
        animationType="fade"
        transparent={false}
        visible={deleteModel}
        // visible={isModalVisible}
        style={styles.modal}
        onShow={() => {
        }}
        onRequestClose={onDeleteStoryClose}
      >
        <FlatList
          data={newDataa}
          style={{ backgroundColor: '#000' }}
          ItemSeparatorComponent={renderSeperator}
          renderItem={({ item, index }) => (
            item.stories.length !== 0 &&
            <><View
              style={{
                alignContent: 'center',
                width: '100%',
                backgroundColor: '#111',
                alignItems: 'center',
                padding: 20
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: item.stories[index].url }} />
            </View>
              <TouchableOpacity onPress={() => onDeleteStory(index)}
                style={{
                  flexDirection: 'row',
                  flex: 0.5,
                  alignItems: 'center',
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
              >
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
                >
                  
                  <Text style={{ color: '#fff', backgroundColor: 'gold', fontSize: 14, color: '#000', padding: 10 }}>Confirm</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => closeAlert}
                style={{
                  paddingRight: 15,
                  paddingLeft: 15,
                  paddingTop: 6,
                  paddingBottom: 6,
                  position: 'absolute',
                  right: 0,
                  flexDirection: 'row',
                  alignContent: 'flex-end',
                  alignItems: 'flex-end',
                  alignSelf: 'flex-end'
                }}
              >
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'flex-end',
                  alignItems: 'flex-end',
                  alignSelf: 'flex-end'
                }}
                >
                
                  <View style={{ padding: 10 }}>
                    <Image
                      source={CustomFields.variables.Close}
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: -5,
                        right: 0,
                        alignItems: 'flex-end'
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      </Modal>

      <FlatList
        data={arr}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ backgroundColor: 'transparent', opacity: 0 }}
            progressBackgroundColor='transparent'
            colors={['transparent']}
            tintColor='transparent'
          />
        }
        ItemSeparatorComponent={renderSeperator}
        renderItem={({ item, index }) => (
          item.stories.length !== 0 &&
          <TouchableOpacity onPress={() => onStorySelect(index)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 15,
              paddingLeft: 15,
              paddingTop: 6,
              paddingBottom: 6
            }}
          >
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignContent: 'center'
            }}
            >
              <Image
                style={styles.circle}
                source={{ uri: item.profile }}
              />
              <View style={{ flexDirection: 'column', justifyContent: "space-around" }}>
                <Text style={styles.title}>{item.username}</Text>
                <Text style={styles.title2}>{item.momenttime} ago</Text>
              </View>
            </View>
            {/* <View style={{flex:0.7, flexDirection:'row',justifyContent:'flex-end'}}>
              <Image
                source={CustomFields.variables.Menu}
                style={{
                  width:20,
                  height:20,
                  marginTop:-5,
                  marginLeft:100,
                  alignItems:'flex-end'}}
              />
            </View> */}
          </TouchableOpacity>
        )}
      />
      {/* // delete Modal */}
      
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll} style={styles.container}>
          {arr.map((item, index) => (
            item.stories.length !== 0 ? <StoryContainer
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            /> : <StoryContainer
              onClose={true}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
      <ActionButton buttonColor="gold" renderIcon={() => <Icon name="camera" style={styles.actionButtonIcon} />}>
        <ActionButton.Item buttonColor='gold' title="Gallery" onPress={() => gallery()} >
          <Icon name="photo" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='gold' title="Video" onPress={() => video()} >
          <Icon name="video-camera" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='gold' title="Camera" onPress={() => camera()} >
          <Icon name="camera-retro" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};
export default Stories;
