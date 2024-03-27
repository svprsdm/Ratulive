import React, { Component } from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import styles from './messageStyle';
import CustomFields from './CustomFields';
import { db, useAuth ,AuthProvider} from '../../hooks/Auth';
import { selectUser } from '../../utils/api';
import auth from '@react-native-firebase/auth';
import { GiftedAvatar } from 'react-native-gifted-chat';

const MessageScreen = (props) => {
    const [imageList,setImageList]=React.useState([]);

    const enterChat = (obj) => {
        console.log('Chat');
        props.navigation.navigate('Chat', { data: obj, name: obj.author });
      };
      // async getData(){
      //   const auth = useAuth();
      //   const { email, displayName, photoURL, uid } = await auth?.user;
      //   console.log("uid",uid);
      // }
      React.useLayoutEffect(()=>{
        // console.log("this.props",this.props);
        const au=auth().currentUser.uid;
        console.log("au",au);
        // getAllMessages()
      //  getData();
    console.log("object uid",au);
        const messageRef = db.collection('chatHistory')
          .doc(au)
          .collection('historyData')
          .orderBy('createdAt', "desc")
        console.log("object");
        var allmsg;
        const unSubscribe = messageRef.onSnapshot((querySnap) => {
          if(querySnap != null){
          allmsg = querySnap.docs.map(docSanp => {
            const data = docSanp.data()
            if (data.createdAt) {
              return {
                ...docSanp.data(),
                createdAt: docSanp.data().createdAt.toDate()
              }
            } else {
              return {
                ...docSanp.data(),
                createdAt: new Date()
              }
            }
          });
          console.log("all message console", allmsg);
          fetchuserDetails();
          async function fetchuserDetails() {
            const arr = [];
          for(let i=0;i<allmsg.length;i++){
            console.log("object on message screen", allmsg[i].id);
            try {
              
              const userinfo = await selectUser({ uid: allmsg[i].id });
              if (userinfo.error) {
                console.log('error');
              } else {
                console.log('Data from db', userinfo);
                const item = {};
                
                item.author = userinfo[0].name;
                item.createdAt = allmsg[i].createdAt;
                item.download_url = userinfo[0].profile_pic;
                item.id = allmsg[i].id;
                item.hours = allmsg[i].hours;
                item.isOnline = allmsg[i].isOnline;
                item.noMessages = allmsg[i].noMessages;
                item.text = allmsg[i].text;
                arr.push(item);
              }
              
              
            } catch (error) {
              console.log('Error while fetching user data', error);
            }
          }
          setImageList(arr);
          console.log("imagelist console", imageList);
        }
          // setImageList(allmsg);
          
        }
        });
    
        console.log("object state", imageList);
        
    },[])


    return (
        <View style={styles.container}>
          <View style={styles.TopContainer}>
            <View style={styles.leftContainer}>
              <Image source={CustomFields.variables.Logo} style={styles.logo} />
              <Text style={styles.skip}>{CustomFields.title}</Text>
            </View>
            <View style={styles.rightContainer}>
              {/* <Image
                source={CustomFields.variables.Search}
                style={styles.search}
              />
              <Image source={CustomFields.variables.More} style={styles.more} /> */}
            </View>
          </View>
          <View style={styles.chatList}>
            <FlatList
              data={imageList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.rowData}
                  onPress={() => enterChat(item)}>
                  <View>
                    <Image
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 40,
                        marginLeft: 10,
                      }}
                      source={{uri:item.download_url}}
                    />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={styles.menuText}>{item.author}</Text>
                    <Text style={styles.message}>{item.text}</Text>
                  </View>
                  <View style={styles.menuTextEnd}>
                    {/* <Text style={styles.menuTextEnd}>{item.hours}</Text> */}
                    {item.noMessages > 0 && (
                      <View
                        style={[
                          styles.Chats,
                          {
                            marginRight: 14,
                            marginBottom: 12,
                            color: '#000',
                            textAlign: 'center',
                          },
                        ]}>
                        <Text
                          style={{ marginTop: 2, color: '#000', marginLeft: 8 }}>
                          {item.noMessages}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      );
   
}
export default MessageScreen;