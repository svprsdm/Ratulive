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

export default function Goliveprivatepassword(props) {
  const [number, setNumber] = useState(null);
  const auth = useAuth();
  const {uid} = auth?.user;
  const {datas} = props.route.params;
  const tokenId = datas.token_id;
  console.log('Datas Object after Swipe',datas);
  console.log(datas.password);

  React.useLayoutEffect(()=>{
    // console.log('paidviewer',datas.paidviewer);
    // if(datas.paidviewer != null){
    //   console.log('paidviewer',datas.paidviewer);
    // for(let i=0; i <= datas.paidviewer.length;i++){
    //     if(uid == datas.paidviewer[i]){
    //       props.navigation.navigate('swipeLive', {activeusers: datas});
    //     }
    //   }
    // }
  });

  const checkpassword=()=>{
      if(number == datas.password){
        updatesubscriber();
        props.navigation.push('swipeLive', {activeusers: datas});
      }else{
        ToastAndroid.show('Entered password Incorrect', ToastAndroid.SHORT);
        Alert.alert('Entered password is wrong');
      }
  }

  async function updatesubscriber(){
    const paidid = [uid];
    try {
      await updatesubscriberpaidstatus({id:tokenId, subscriber:paidid})
      await updateesubscriberpaidstatus({id:tokenId, subscriber:paidid})
      console.log()
    } catch (error) {
      console.log('error while deleting user from stream', error);
    }
  }

    return(
      <View style={styles.container}>
          <View style={{top:270}}>
          <Text style={{fontSize: 18,color: 'white',textAlign:'center'}}>It's Private stream, Please Enter password to continue</Text>
      <SafeAreaView>
      
        <TextInput
          style={styles.input}
          onChangeText={(number) => {
            setNumber(number);
          }}
          value={number}
          placeholder="Enter Password"
          keyboardType="numeric"
          placeholderStyle={{ color: '#fff' }}
          placeholderTextColor={'#999'}
          onSubmitEditing={()=>{
           checkpassword();
          }}
        />

    </SafeAreaView>
    </View>
    </View>
    )
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