import React, {useState} from 'react';
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
    SafeAreaView,
    ToastAndroid,
    Alert
  } from 'react-native';
  import {useAuth} from '../../../hooks/Auth';
  import {updatesubscriberpaidstatus,updateesubscriberpaidstatus} from '../../../utils/api';

export default function PublicLive(props) {
  //const [number, setNumber] = React.useState(null);
  const auth = useAuth();
  const {uid} = auth?.user;
  const {datas} = props.route.params;
  const tokenId = datas.token_id; 

  React.useLayoutEffect(()=>{    
          props.navigation.navigate('swipeLive', {activeusers: datas});     
  })

    
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    color: '#fff',
    borderRadius: 3,
    top: 10,
  },

  container: {
    backgroundColor: '#000',
    height: '100%',
    flex:1,
    alignContent:'center'
  },

  btnStyle: {
    marginTop:30,
    marginLeft:50,
    marginRight:50,
    borderWidth:2,
    borderRadius:20,
    borderColor:'#999',
    overflow:"hidden",
    marginBottom:10,
    color: '#000'
  }
});