import React, { useState } from 'react';
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard, 
    KeyboardAvoidingView,
    ActivityIndicator} from 'react-native';
import SocketManager from '../../socket/socketManager';
import {selectUser} from '../../../utils/api';
import {useAuth} from '../../../hooks/Auth';
// import EmojiBoard from './react-native-emoji-board';

export default function Footertab(props){

    // const [show, setShow] = useState(false);
    // const onClick = emoji => {
    //     console.log(emoji);
    // };

    const [newMessage,setNewMessage] = useState('');
    const [userName,setUserName] = useState('');
    const [roomId,setRoomId] = useState('');
    const [uname, setUname]  = useState('');
    const [disclaimer,setDisclaimer] = React.useState(false);
    const auth = useAuth();
    const {uid} = auth?.user;
     
    React.useEffect(() => {
        fetchuserDetails();
         
        },[]);

    React.useEffect(()=>{
            const timer = setTimeout(() => {
              setDisclaimer(true);
            }, 5000);
          });    
        
        async function fetchuserDetails(){
          /*for getting user info*/
        //   console.log('select user');
          try{
          const userinfo = await selectUser({uid});
          if(userinfo.error){
            console.log('error');
          }else{
            // console.log('Data from db',userinfo);
            setUname(userinfo[0].name);
            
          }
          } catch(error){
          console.log('Error while fetching user data', error);
          }
          }

    if(props.visible === true && props.footerOnGiftPop === false){
        return(
            <View style={{
                backgroundColor:'rgba(0, 0, 0, 0.8)', 
                height:50, 
                width:'100%',
                flexDirection:"row",
                position:'absolute',
                bottom:0,
                zIndex:99999,
                }}>
                
                {/* <Image source={require('../../../../assets/icons/smile.png')} style={{height:25,width:25,marginTop:10,marginLeft:10}} /> */}
               
            {/* <TouchableOpacity onPress={() => setShow(!show)}>
                <Text>click here</Text>
            </TouchableOpacity>
            <EmojiBoard showBoard={show} onClick={onClick} /> */}
                <TextInput maxLength={75} placeholder={'Say Something'} 
                    style={{
                        opacity:1, 
                        height:45, 
                        width:'75%',
                        marginLeft:'2%', 
                        color:'#fff',
                        zIndex:99999,
                        }} value={newMessage} onChangeText={(text)=>setNewMessage(text)}>
                </TextInput>
                
                <TouchableOpacity onPress = {() => {
                    if(userName === '' && roomId ===''){
                        SocketManager.instance.emitSendMessage({
                            roomId:Math.random().toString(36).substring(8),
                            userName:uname,
                            message:newMessage,
                            tokenId:props.tokenid
                        });
                        Keyboard.dismiss();
                        setNewMessage('');
                        setRoomId('');
                        setUserName('');    
                    }else{
                        SocketManager.instance.emitSendMessage({
                            roomId:roomId,
                            userName:userName,
                            message:newMessage
                        });                
                        Keyboard.dismiss();
                        setNewMessage('');    
                    }
                }} >
                
                    <View style={{backgroundColor:"gold",borderRadius:10,height:20,width:50,marginTop:13, }}>
                        <Text style={{marginLeft:12, lineHeight: 20, fontSize: 12}}>Send</Text>
                    </View>
                </TouchableOpacity>
      
            </View>
            
            
            )
        }else{
            return(
                <View >
                </View>
                )
            }
            
        }