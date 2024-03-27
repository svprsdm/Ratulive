import React, { useState } from 'react';
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
  Alert,
  Modal
} from 'react-native';
import { useAuth } from '../../../hooks/Auth';
import { selectUser, updateWallet, updatePearlCount, updateRinggitEarned, updateRinggitEarnedPublisher, updateHeartCount, updatePrivatePearl,updateePrivatePearl, updatesubscriberpaidstatus, getpaidviewer,updateesubscriberpaidstatus } from '../../../utils/api';
export default function Goliveprivatecrowns(props) {
  const { datas } = props.route.params;
  const auth = useAuth();
  const { uid } = auth?.user;
  const streamerid = datas.session_id;
  const [modalVisibleWallet, setModalVisibleWallet] = React.useState(false);
  const [pearll, setPearll] = React.useState(0);
  const tokenId = datas.token_id;
  const pearlreceived = datas.pearls_via_private;
  const value = datas.crowns.replace(/(^.*\[|\].*$)/g, '');
  const valuee = value.replace(/(^")|("$)/g, '');
  console.log('crown value', valuee);
  console.log('tokenid', tokenId);
  console.log('tokenid', pearlreceived);
  const [balance, setBalance] = React.useState(0);
  const [pearlbalance, setPearlbalance] = React.useState(0);
  const [crownvalue, setCrownvalue] = React.useState(valuee);
  React.useLayoutEffect(() => {
    // if (datas.paidviewer != null) {
    //   for (let i = 0; i <= datas.paidviewer.length; i++) {
    //     if (uid == datas.paidviewer[i]) {
    //       props.navigation.navigate('swipeLive', { activeusers: datas });
    //     }
    //   }
    // }
  })
  // React.useLayoutEffect(()=>{
  //   fetchpaidviewer();
  // },[])
  React.useEffect(() => {
    fetchuserDetails();
    fetchstreamerDetails();
  });
  
  const updatebalance = async () => {
    if (crownvalue <= balance) {
      try {
       
        // const updatedpearls = await updatePearlCount({ uid: streamerid, pearl_count });
        if(valuee <= 1000)
        {

          const usercrowns = Number(balance) - Number(crownvalue);
          const pearl_count = Number(pearlbalance) + Number(valuee);
          const updatestatus = await updateWallet({ uid: uid, wallet: usercrowns });

          const ringgitearned = valuee * 5;
          const ringgitearnedd = ringgitearned*0.000250227*0.1;
          const privatePearls =  await updatePearlCount({uid: uid,pearl_count: ringgitearned});
          const privateRMpub = await updateRinggitEarnedPublisher({token_id: tokenId, ringgitearned: ringgitearnedd});
          const privateRMuser = await updateRinggitEarned({uid: uid,ringgitearned: ringgitearnedd});

          const privateearnedpearl = JSON.stringify(Number(pearlreceived) + Number(ringgitearned));        
          const updatepearls = await updatePrivatePearl({ id: tokenId, privateearnedpearl })
          const updateepearls = await updateePrivatePearl({ id: tokenId, privateearnedpearl })
          if (updatestatus != null) {
            console.log('updated');
            updatesubscriber();
            props.navigation.navigate('swipeLive', { activeusers: datas });
          }

        }else{

          const usercrowns = Number(balance) - Number(crownvalue);
          const pearl_count = Number(pearlbalance) + Number(valuee);
          const updatestatus = await updateWallet({ uid: uid, wallet: usercrowns });
          
          const ringgitearned = valuee * 5;
          //const ringgitearnedd = ringgitearned*0.0000229112*0.1;
          const ringgitearnedd = ringgitearned*0.000250227*0.1;
          const privatePearls =  await updatePearlCount({uid: uid,pearl_count: ringgitearned});
          const privateRMpub = await updateRinggitEarnedPublisher({token_id: tokenId, ringgitearned: ringgitearnedd});
          const privateRMuser = await updateRinggitEarned({uid: uid,ringgitearned: ringgitearnedd});

          const privateearnedpearl = JSON.stringify(Number(pearlreceived) + Number(ringgitearned));        
          const updatepearls = await updatePrivatePearl({ id: tokenId, privateearnedpearl })
          const updateepearls = await updateePrivatePearl({ id: tokenId, privateearnedpearl })
          if (updatestatus != null) {
            console.log('updated');
            updatesubscriber();
            props.navigation.navigate('swipeLive', { activeusers: datas });
          }

        }
        
      } catch (error) {
        console.log('Error while adding details', error);
      }
    } else {
      setModalVisibleWallet(true);
      // Alert.alert("Your wallet balance is Low, Please topup and continue");
    }
  }
  async function updatesubscriber() {
    const paidid = [uid];
    try {
      await updatesubscriberpaidstatus({id: tokenId,subscriber: paidid })
      await updateesubscriberpaidstatus({id: tokenId,subscriber: paidid })
      console.log()
    } catch (error) {
      console.log('error while deleting user from stream', error);
    }
  }
  async function fetchuserDetails() {
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        console.log('Response from goliveprivatecrowns', userinfo);
        setBalance(userinfo[0].wallet);
        console.log('user balance', balance);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  async function fetchstreamerDetails() {
    try {
      const userinfo = await selectUser({ uid: streamerid });
      if (userinfo.error) {
        console.log('error');
      } else {
        console.log('Response from goliveprivatecrowns', userinfo);
        setPearlbalance(userinfo[0].pearl_count);
        console.log('Pearlbalance', pearlbalance);
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ top: 270 }}>
        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>It's Private stream,It requires {crownvalue} crowns.</Text>
        <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>Please press okay to continue</Text>
        <SafeAreaView>
          <View
            style={styles.btnStyle}
          >
            <Button
              title="Submit"
              color="gold"
              onPress={() => { updatebalance() }}
            />
          </View>
        </SafeAreaView>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleWallet}
        onRequestClose={() => {
          setModalVisibleWallet(!modalVisibleWallet);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Your Wallet Balance is Low</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#ccc"
              style={[styles.button, styles.buttonNo]}
              onPress={() => setModalVisibleWallet(!modalVisibleWallet)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisibleWallet(!modalVisibleWallet);
                props.navigation.navigate('topup')
              }}
            >
              <Text style={styles.textStyle}>Topup</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
    flex: 1,
    alignContent: 'center'
  },
  btnStyle: {
    marginTop: 30,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#999',
    overflow: "hidden",
    marginBottom: 10,
    color: '#000'
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