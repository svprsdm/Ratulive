import React, {useState} from 'react';
import {View, Text, Image, FlatList, SafeAreaView, ScrollView, Button, ImageBackground,ToastAndroid,TouchableHighlight} from 'react-native';
import styles from './Withdraw.style';
import { TextInput } from 'react-native';
import useFetchCrowns from '../../hooks/useFetchCrowns';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomFields from './CustomFields';
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from 'react-native-modal';
import {selectUser,updateWithdrawformm,updatePearlCount,ReplacePearlCount,updateWithdrawnringgit,getUserDetails} from '../../utils/api';
import {useAuth} from '../../hooks/Auth';
import Icon from 'react-native-vector-icons/FontAwesome';


const Withdraw = (props) => {
    const auth = useAuth();
    const {uid} = auth?.user;
    const {allCrowns, fetchCrowns} = useFetchCrowns();
    const [crowns, setCrowns] = React.useState(allCrowns);
    const [number, onChangeNumber] = React.useState('');
    const [Accountnumber, onChangeAccountNumber] = React.useState('');
    const [name, onChangeName] = React.useState('');
    const [bank, onChangeBank] = React.useState('');
    const [branch, onChangeBranch] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [swift, onChangeSwift] = React.useState('');
    const [address, onChangeAddress] = React.useState('');
    const [mobile, onChangeMobile] = React.useState('');
    const [agentname,setAgentname] =  React.useState('');
const [agentuserno,setAgentuserno] =  React.useState('');
const [agentvalidationmodal,setAgentvalidationmodal] =  React.useState(false);
const [existingagentmodal, setExistingagentmodal] = useState(false);
    // const [remainingbalance, setremainingbalance] = React.useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newModalVisible, setNewModalVisible] = useState(false);
    const [validationModalVisible, setValidationModalVisible] = useState(false);
    const [agentvalidationModalVisible, setagentValidationModalVisible] = useState(false);
    const [balancevalidationModalVisible, setBalancevalidationModalVisible] = useState(false);
    const [pearlvalue, setPearlvalue] = React.useState(null);
    const [associatedagent,setAssociatedagent] =  React.useState(null);
    const [ringgitvalue, setRinggitvalue] = React.useState(0);
    // const ringgitvalue = pearlvalue*0.00012*0.1;
    const finalringgitvalue = Math.round((ringgitvalue + Number.EPSILON) * 100) / 100
    const [userno, setUserno] = React.useState(null);
    // const Bg = () => {require('../../../assets/ratu_icons/bg.png')};
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const newToggleModal = () => {
      setNewModalVisible(!newModalVisible);
    };

    const validationToggleModal = () => {
      setValidationModalVisible(!validationModalVisible);
    };

    const agentValidationToggleModal = () => {
      setagentValidationModalVisible(!agentvalidationModalVisible);
    };

    const balancevalidationToggleModal = () => {
      setBalancevalidationModalVisible(!balancevalidationModalVisible);
    };

    const bothToggle = () => {
      setModalVisible(!isModalVisible);
      setNewModalVisible(!newModalVisible);
    }

    // const walletPage = () => {
    //   props.navigation.navigate('Withdraw')
    // }
    
  React.useEffect(() => {
      fetchuserDetails();
       
      },[newModalVisible]);

    //   React.useEffect(() =>{
    //     getAgentDetails();
    // },[associatedagent])

      async function fetchuserDetails(){
        /*for getting user info*/
        
        try{
        const userinfo = await selectUser({uid});
        if(userinfo.error){
        }else{
          setPearlvalue(userinfo[0].pearl_count);
          setRinggitvalue(userinfo[0].ringgits_earned);
          setUserno(userinfo[0].userno);
          onChangeName(userinfo[0].name);
          onChangeMobile(userinfo[0].phone);
          onChangeEmail(userinfo[0].email);
          setAssociatedagent(userinfo[0].agent_code);
          // getAgentDetails();
        }
        } catch(error){
        }
        }

        async function getAgentDetails(){
          try {
              const userinfo = await getUserDetails({ agentcode:associatedagent });
              if (userinfo.error) {
              } else {
                  setAgentname(userinfo[0].name);
                  setAgentuserno(userinfo[0].userno);    
              }
          } catch (error) {
          }
      }

        async function Updatewithdrawform () {
          if(associatedagent == null){
             try {
              const remainingbalance =  Math.floor((number)/0.00000229112);
              const remainingbalancee = pearlvalue - remainingbalance ;
              const remainingringgit = ringgitvalue - number;
              //  const updatedpearls = await ReplacePearlCount({ uid, pearl_count:remainingbalancee });
              const updateringgit = await updateWithdrawnringgit({uid,ringgits_earned:remainingringgit })
              setModalVisible(!isModalVisible);
              
               await updateWithdrawformm({uid,fullname:name,amount:number,bankname:bank,accountnumber:Accountnumber,branchname:branch,swiftcode:swift,email:email,phonenumber:mobile,status:'pending',ringgitbalance:remainingringgit,address:address,userid:userno});

               setNewModalVisible(!newModalVisible);
               ToastAndroid.show('Saved Successfully!!!', ToastAndroid.SHORT);
            } catch (error) {
            }     
          }else{
            agentValidationToggleModal();
          }       
    }

    const checkTextInput = () => {
      if (!number.trim()) {
        // alert('Please Enter the amount for withdrawal');
        ToastAndroid.show('Please Enter the amount for withdrawal', ToastAndroid.SHORT);
        return;
      }
      if (!name.trim()) {
        // alert('Please Enter the name');
        ToastAndroid.show('Please Enter the name', ToastAndroid.SHORT);
        return;
      }
      if (!bank.trim()) {
        // alert('Please Enter the Bank name');
        ToastAndroid.show('Please Enter the Bank name', ToastAndroid.SHORT);
        return;
      }
      if (!Accountnumber.trim()) {
        // alert('Please Enter the Branch name');
        ToastAndroid.show('Please Enter the Bank Account number', ToastAndroid.SHORT);
        return;
      }
      if (!branch.trim()) {
        // alert('Please Enter the Branch name');
        ToastAndroid.show('Please Enter the Branch name', ToastAndroid.SHORT);
        return;
      }
      if (!swift.trim()) {
        // alert('Please Enter the Branch name');
        ToastAndroid.show('Please Enter the swift code', ToastAndroid.SHORT);
        return;
      }
      if (!address.trim()) {
        // alert('Please Enter the Branch name');
        ToastAndroid.show('Please Enter the address', ToastAndroid.SHORT);
        return;
      }
      if (!email.trim()) {
        // alert('Please Enter the Branch name');
        ToastAndroid.show('Please Enter the email', ToastAndroid.SHORT);
        return;
      }
      // if (!mobile.trim()) {
      //   ToastAndroid.show('Please Enter the Mobile number', ToastAndroid.SHORT);
      //   return;
      // }
      // alert('Success');
      if(number >= 100){
        if(number<=finalringgitvalue){
        toggleModal()   
        }else{
          balancevalidationToggleModal()
        }
      }else{
        validationToggleModal()
      }   
    };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const crowns = await fetchCrowns();
      setCrowns(crowns);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, 
  
  [allCrowns, fetchCrowns, props.navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
    <View>
      {/* <ImageBackground source={Bg} style={styles.image}> */}
        <View style={{marginTop: 10, width: '100%', alignContent:'center', alignItems:'center' }}>
          
          <View style={{borderRadius:10, backgroundColor:'rgba(253, 227, 167, 1)', flext:1, flexDirection: 'row', width: '75%', alignContent:'center', alignItems:'center', padding:10}}>
            <View style={{alignContent:'flex-start', alignItems:'flex-start'}}>
                <Image source={CustomFields.variables.Withdraw} />
                <Text style={{color: '#333', top: 0}}>Ratu ID: <Text style={{fontWeight:'bold'}}>{userno}</Text></Text>
                
            </View>
            <View style={{alignContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end', flex:1, top: 0, paddingRight: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color:'#333'}}>
                
                <Text style={{color:'black'}}>{pearlvalue}</Text> Pearls
              </Text>
              <Text style={{fontSize: 18, paddingLeft: 6, paddingTop: 5, color:'#333', fontWeight: 'normal'}}>
                <Text style={{color:'#000'}} maxLength = {2}>{finalringgitvalue}</Text> Ringgit
              </Text>
              <Text style={{fontSize: 16, paddingLeft:0, paddingTop: 5, color:'#000'}}>
                Wallet balance
              </Text>
            </View>

          </View>

          <View style={{ marginTop: 0, marginLeft: 20 }}>
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Streaminglog')}>
              <View style={{  flexDirection: 'row', backgroundColor: '#000', width: 200, padding: 10, borderRadius: 10 }}>
                <View style={{ alignContent: 'flex-start' }}>
                  <Image source={CustomFields.variables.Withdraw} style={{ width: 35, height: 35 }} />
                </View>
                <View style={{ alignContent: 'flex-end', alignSelf: 'center' }}>
                  <Text style={{ fontSize: 16, paddingLeft: 10, color: '#fff' }}>Streaming logs</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
          
          <View style={{color: '#fff', width: '75%', padding: 10, }}>
            <Text  style={{color: '#fff', fontSize: 18, fontWeight:'bold'}}>*Note: </Text>
            <Text style={{color: '#fff', fontSize: 16, fontStyle:'italic'}}>Minimum Daily Withdrawal limit is 100 RM, Maximum Daily Withdrawal limit is 3000 RM</Text>
            <Text style={{color: '#fff',  fontSize: 16, marginTop:10, fontStyle:'italic'}}>It will take 7-10 working days to process the payment</Text>
          </View>

          <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Amount"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              
              // keyboardType="numeric"
            />
            <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(name) => {
                onChangeName(name);
              }}
              value={name}
              placeholder="Full name"
              placeholderTextColor="#999"
              mode='outlined'
              // keyboardType="numeric"
            />
            <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(bank) => {
                onChangeBank(bank);
              }}
              value={bank}
              placeholder="Bank Name"
              placeholderTextColor="#999"
              // keyboardType="numeric"
            />
            <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(Accountnumber) => {
                onChangeAccountNumber(Accountnumber);
              }}
              value={Accountnumber}
              placeholder="Account number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              
              // keyboardType="numeric"
            />
            <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(branch) => {
                onChangeBranch(branch);
              }}
              value={branch}
              placeholder="Bank Branch Name"
              placeholderTextColor="#999"
              // keyboardType="numeric"
            />
            <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(swift) => {
                onChangeSwift(swift);
              }}
              value={swift}
              placeholder="Bank Swift Code"
              placeholderTextColor="#999"
              // keyboardType="numeric"
            />
             <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(address) => {
                onChangeAddress(address);
              }}
              value={address}
              placeholder="Bank Address"
              placeholderTextColor="#999"
              // keyboardType="numeric"
            /> 
            <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(email) => {
                onChangeEmail(email);
              }}
              value={email}
              placeholder="Email"
              placeholderTextColor="#999"
              // keyboardType="numeric"
            />  
            <Icon name="asterisk" color='red' style={{left:175,top:20}} />
            <TextInput
              style={styles.input}
              onChangeText={(mobile) => {
                onChangeMobile(mobile);
              }}
              value={mobile}
              placeholder="Mobile number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              minlenght='10'
              // keyboardType="numeric"
            />
          
          <View>
            <TouchableOpacity onPress={()=>{
              if(associatedagent == null){
              checkTextInput()
              }else{
                agentValidationToggleModal();
              }
              }}>
                <Text style={{color: '#000', backgroundColor:'yellow', padding: (10), borderRadius:10}}>
                    Withdraw
                </Text>
            </TouchableOpacity>
           
            <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Your transaction for RM {number} is going to be processed, it will take 7-10 days to update in your account</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#ccc"
              style={[styles.button, styles.buttonNo]}
              onPress={toggleModal}
            >
              <Text style={styles.textStyle}>No, cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!isModalVisible);
                Updatewithdrawform();
              }}
            >
              <Text style={styles.textStyle}>Ok, Proceed</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={agentvalidationmodal}
        onRequestClose={() => {
          setAgentvalidationmodal(!agentvalidationmodal);
        }}
      >
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>you're associated with an agent,Please contact agent for withdrawal</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#ccc"
              style={[styles.button, styles.buttonNo]}
              onPress={setAgentvalidationmodal(!agentvalidationmodal)}
            >
              <Text style={styles.textStyle}>Okay</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal> */}
          </View>

          <View>
         
          </View>

          {/* <View>
          <Modal
        animationType="fade"
        transparent={true}
        visible={existingagentmodal}
        onRequestClose={() => {
          setExistingagentmodal(!existingagentmodal)
        }}
      >
        <View style={styles.centeredView}>
        <Text style={styles.modalText}>You're already associated with</Text>
         <Text style={styles.modalText}>an agent {agentname} ({agentuserno})</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#ccc"
              style={[styles.button, styles.buttonNo]}
              onPress={
                setExistingagentmodal(!existingagentmodal)
              }
            >
              <Text style={styles.textStyle}>Okay</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
          </View> */}

          <View>
            <AwesomeAlert
              show={newModalVisible}
              showProgress={false}
              title="Congratulations"
              message="Your withdrawal request has been successfully submitted to the admin team for any queries please contact support@ratulive.com"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              cancelText="No, cancel"
              confirmText="Ok"
              confirmButtonColor="green"
              confirmButtonTextStyle="#000"
              onCancelPressed={newToggleModal}
              onConfirmPressed={()=>{
                newToggleModal()
                props.navigation.navigate('Wallet');
              }}
            />
          </View>

          <View>
            <AwesomeAlert
              show={validationModalVisible}
              showProgress={false}
              title="Sorry"
              message="Your Ringgit balance should be above 100"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              // cancelText="No, cancel"
              confirmText="Ok"
              confirmButtonColor="green"
              confirmButtonTextStyle="#000"
              // onCancelPressed={newToggleModal}
              onConfirmPressed={validationToggleModal}
            />
          </View>

          <View>
            <AwesomeAlert
              show={agentvalidationModalVisible}
              showProgress={false}
              title="Sorry"
              message="Since you're associated with an agent,Please contact agent for withdrawal"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              // cancelText="No, cancel"
              confirmText="Ok"
              confirmButtonColor="green"
              confirmButtonTextStyle="#000"
              // onCancelPressed={newToggleModal}
              onConfirmPressed={agentValidationToggleModal}
            />
          </View>

          <View>
            <AwesomeAlert
              show={balancevalidationModalVisible}
              showProgress={false}
              title="Sorry"
              message="Your Ringgit balance is Low"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={false}
              showConfirmButton={true}
              // cancelText="No, cancel"
              confirmText="Ok"
              confirmButtonColor="green"
              confirmButtonTextStyle="#000"
              // onCancelPressed={newToggleModal}
              onConfirmPressed={balancevalidationToggleModal}
            />
          </View>

          <View style={{color: '#fff', width: '75%', paddingTop: 50, paddingBottom:30, alignItems:'center' }}>
            <Text  style={{color: '#fff', fontSize: 18, fontWeight:'bold'}}>If any issues feel free to contact our support</Text>
            <Text style={{color: '#fff', fontSize: 20, fontStyle:'italic', textAlign:'center'}}>support@ratulive.com</Text>
          </View>
        </View>
      {/* </ImageBackground> */}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default Withdraw;
