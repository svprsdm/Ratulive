import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Button,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    Linking 
} from 'react-native';
import styles from './support.style';
import Dialog from "react-native-dialog";
import Modal from 'react-native-modal';
import { Right } from 'native-base';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { useAuth } from '../../hooks/Auth';
import storage from '@react-native-firebase/storage';
import { selectUser, updateUserPic, getUserDetails, updateAgent, streamerrequestforagent,getAgentData } from '../../utils/api';
import { ToastAndroid } from 'react-native';
const Support = () => {
    const auth = useAuth();
    const radio_props = [
        { label: 'Male', value: 0 },
        { label: 'Female', value: 1 }
    ];
    const [isModalVisible, setModalVisible, hasBackdrop] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [secondModalVisible, setsecondModalVisible] = useState(false);
    const [thirdModalVisible, setthirdModalVisible] = useState(false);
    const [existingagentmodal, setExistingagentmodal] = useState(false);
    const [AgentStatusModalVisible, setAgentStatusModalVisible] = useState(false);
    const [agentidModalVisible, setagentidModalVisible] = useState(false);
    const toggleSecondModal = () => {
        setsecondModalVisible(!secondModalVisible);
    };
    const conformationmodal = async () => {
        try {
            const userinfo = await getUserDetails({ agentcode });
            if (userinfo.error) {
                console.log('error');
            } else {
                console.log('Response', userinfo);
                setAgentname(userinfo[0].name);
                setAgentuid(userinfo[0].uid);
                console.log(agentname);
                console.log(agentuid);
                const agentinfo = await getAgentData({id:userinfo[0].uid});
                console.log(agentinfo[0]);
                setAgentstatus(agentinfo[0].approval_status);
                setStreamerreq(agentinfo[0].streamer_requests);
                console.log('streamer request',agentinfo[0].streamer_requests);
                // if(agentinfo[0].streamer_requests.length != null){
                // for (let i = 0; i <= agentinfo[0].streamer_requests.length; i++) {
                //     if (uid == agentinfo[0].streamer_requests[i]) {
                //         ToastAndroid.show('Request is already pending', ToastAndroid.SHORT);
                //     }
                //   }
                // }
                if(agentstatus == 'active'){
                    
                      setthirdModalVisible(true);
                
                }else{
                    ToastAndroid.show('Requested agent has not been found', ToastAndroid.SHORT);
                }
            }
        } catch (error) {
            setagentidModalVisible(!agentidModalVisible);
            console.log('Error while fetching user data', error);
        }
    }
    const addagent = async () => {
        if(username != null && icnumber != null && companyname != null && mobile != null && useremail != null && address != null ){
        if(gender == 0){
        console.log('Male gender');
        try {
            await updateAgent({ username, uid, icnumber, companyname, mobile, gender:'Male', useremail, address, userno });
            setModalVisible(!isModalVisible);
            ToastAndroid.show('Form has been Submitted Successfully!!!', ToastAndroid.SHORT);
        } catch (error) {
            console.log('Error while adding agent', error);
        }
    }else if(gender == 1){
        console.log('Female gender');
        try {
            await updateAgent({ username, uid, icnumber, companyname, mobile, gender:'Female', useremail, address, userno });
            setModalVisible(!isModalVisible);
            ToastAndroid.show('Form has been Submitted Successfully!!!', ToastAndroid.SHORT);
        } catch (error) {
            console.log('Error while adding agent', error);
        }
    }
}else{
    ToastAndroid.show('Check all the fields', ToastAndroid.SHORT);
}
    }
    const updatestreamerrequest = async () => {
        console.log(agentuid);
        console.log(uid);
        const uidd = [uid];
        if(agentstatus == 'active'){
        try {
            await streamerrequestforagent({
                uid: agentuid,
                streameruid: uidd,
                streamerid:uid,
            });
            setthirdModalVisible(!thirdModalVisible);
            setsecondModalVisible(!secondModalVisible);
            ToastAndroid.show('Form has been Submitted Successfully!!!', ToastAndroid.SHORT);
        } catch (error) {
            console.log('error while deleting user from stream', error);
        }
    }else{
        ToastAndroid.show('Requested agent status is pending', ToastAndroid.SHORT);
    }
    }

    async function getAgentDetails(){
        try {
            const userinfo = await getUserDetails({ agentcode:associatedagent });
            if (userinfo.error) {
                console.log('error');
            } else {
                console.log('Response', userinfo);
                setAgentname(userinfo[0].name);
                setAgentuserno(userinfo[0].userno);  
                // setAgentapprovalstatus(userinfo[0].approval_status); 
                // console.log('Response',userinfo[0].approval_status ); 
            }
        } catch (error) {
            console.log('Error while fetching user data', error);
        }
    }

    async function getAgentapprovalstatus(){
        try {
            const agentinfo = await getAgentData({id:uid});
            if (agentinfo.error) {
                console.log('error');
            } else {
                console.log('Response', agentinfo);
                setAgentapprovalstatus(agentinfo[0].approval_status); 
                console.log('Response',agentinfo[0].approval_status ); 
            }
        } catch (error) {
            console.log('Error while fetching getAgentapprovalstatus', error);
        }
    }
    // const [visible, setVisible] = useState(false);
    // const showDialog = () => {
    //     setVisible(true);
    // };
    // const handleCancel = () => {
    //     setVisible(false);
    // };
    // const handleDelete = () => {
    //     setVisible(false);
    // };
    const [value, onChangeText] = React.useState('');
    // const [getInitialState] = function() {
    //     return {
    //       value: 0,
    //     }
    // };
    const [displayimage, setDisplayimage] = useState(null);
    const { email, displayName, photoURL, uid } = auth?.user;
    const [name, setName] = React.useState('');
    const [agentname, setAgentname] = React.useState('');
    const [agentuserno, setAgentuserno] = React.useState('');
    const [agentuid, setAgentuid] = React.useState('');
    const [companyname, setCompanyname] = React.useState('');
    const [icnumber, setIcnumber] = React.useState(0);
    const [mobile, setMobile] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [useremail, setUseremail] = React.useState('');
    const [userno, setUserno] = React.useState(0);
    const [profilepic, setProfilepic] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [agentcode, setAgentcode] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [associatedagent, setAssociatedagent] = React.useState('');
    const [agentstatus, setAgentstatus] = React.useState('');
    const [agentrefareestatus, setAgentrefareestatus] = React.useState('');
    const [agentapprovalstatus,setAgentapprovalstatus] = React.useState('');
    const [streamerreq, setStreamerreq] = React.useState([]);
    useEffect(() => {
        fetchuserDetails();
        getAgentapprovalstatus();
    }, []);

    useEffect(() =>{
        getAgentDetails();
    },[associatedagent])

    async function fetchuserDetails() {
        // /for getting user info/
        console.log('select user');
        try {
            const userinfo = await selectUser({ uid });
            if (userinfo.error) {
                console.log('error');
            } else {
                console.log('Response', userinfo);
                setUserno(userinfo[0].userno);
                setProfilepic(userinfo[0].profile_pic);
                setUsername(userinfo[0].name);
                //   setUsercrowns(userinfo[0].wallet);
                setMobile(userinfo[0].phone);
                setAddress(userinfo[0].address);
                setUseremail(userinfo[0].email);
                setAssociatedagent(userinfo[0].agent_code);
                setAgentrefareestatus(userinfo[0].is_agent_refaree);
                //setUserpearl(userinfo[0].pearl_count);
                console.log(userno);
                console.log(profilepic);
                console.log(username);
                console.log(mobile);
            }
        } catch (error) {
            console.log('Error while fetching user data', error);
        }
    }
    return (
        <View style={{ backgroundColor: '#000000', flex: 1 }}>
            <View style={styles.headerContainer}>
                <View style={styles.userProfile}>
                    <View style={styles.leftContainer}>
                        <Image
                            style={styles.userCrown}
                            source={require('./../../../assets/crown.png')}
                            style={{ width: 35, height: 25, tintColor: 'gold' }}
                        />
                        <View>
                            <TouchableOpacity
                            //  onPress={handleChoosePhoto}
                            // onPress={choosePhoto}
                            >
                                {/* <Text>image</Text> */}
                                <Image
                                    style={styles.userImage}
                                    source={{ uri: profilepic }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userNameRow}>
                            <Text style={styles.userNameText}>{username}</Text>
                        </View>
                        <View style={styles.userBioRow}>
                            <Text style={styles.userBioText}>ID: {userno}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    {/* Terms & Conditions */}
                    <View style={{ padding: 20, borderBottomColor: 'grey', borderTopColor: 'grey', borderBottomWidth: 0.4, borderTopWidth: 0.4 }}>
                        <View>
                            <TouchableOpacity onPress={() => Linking.openURL('https://www.ratulive.com/user-agreement.html')}>
                            <Text 
                            style={{ color: '#fff', marginLeft: 0, marginBottom: 20, fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginTop: 3 }}
                            >
                                Our Terms & Conditions
                            </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Image
                                source={require('./../../../assets/ratu_icons/terms_condition.png')}
                                style={{ width: 24, height: 24, }}
                            />
                            <Text style={{ color: '#fff', marginLeft: 10, textAlign: 'left', marginTop: 3 }}>
                                Terms & Conditions
                            </Text>
                        </View>
                    </View>
                    {/* Become an Agent */}
                    <View style={{ width: '100%', padding: 20, borderBottomColor: 'grey', borderBottomWidth: 0.4, borderTopWidth: 0.4 }}>
                        <View>
                            <Text style={{ color: '#fff', marginLeft: 0, marginBottom: 20, fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginTop: 3 }}>
                                Want to become an Agent ?
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Image
                                    source={require('./../../../assets/ratu_icons/become_agent.png')}
                                    style={{ width: 24, height: 24, }}
                                />
                                {/* <Text onPress={showDialog} style={{color:'#fff',marginLeft:10,textAlign:'left',marginTop:3}}>
                                    Become an Agent
                                </Text> */}
                                <Text 
                                // onPress={toggleModal}
                                onPress={()=>{
                                    if (associatedagent == null){
                                        if(agentapprovalstatus == 'pending'){
                                            ToastAndroid.show('Your application for agent is pending for approval', ToastAndroid.SHORT);
                                        }else{
                                            if(agentapprovalstatus == 'active'){
                                                ToastAndroid.show('Your already an agent', ToastAndroid.SHORT);
                                            }else{
                                                if(agentapprovalstatus == 'inactive'){
                                                ToastAndroid.show('Your request has been rejected by management, Please contact admin', ToastAndroid.SHORT);  
                                                }else{
                                                    if(agentrefareestatus == 'pending'){
                                                        ToastAndroid.show("You cannot request for an agent, since your request for associate with an agent is pending ", ToastAndroid.SHORT);  
                                                        }else{   
                                                            toggleModal()
                                                        }
                                                }
                                            }
                                        }
                                    }else{
                                    setExistingagentmodal(!existingagentmodal)
                                    }
                                    }}
                                 style={{ color: '#fff', marginLeft: 10, textAlign: 'left', marginTop: 3 }}>
                                    Become an Agent
                                </Text>
                            </View>
                            <Modal hasBackdrop isVisible={isModalVisible} >
                            <ScrollView style={{}}>
                                <View style={styles.agentModal}>
                                    <View>
                                        <Text onPress={toggleModal} style={{ textAlign: 'right', color: '#fff',fontSize: 20,color:'red' }}>X</Text>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'left', marginBottom: 20, marginLeft: 20, fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Become an Agent</Text>
                                    </View>
                                    <Text style={{ marginLeft: 14, marginBottom: 8, color: '#fff' }}>Name</Text>
                                    <TextInput
                                        style={{ marginLeft: 12, marginBottom: 12, borderRadius: 6, height: 40, borderColor: '#777', borderWidth: 1, color: '#fff' }}
                                        onChangeText={(username) => {
                                            setUsername(username);
                                        }}
                                        value={username}
                                    />
                                    <Text style={{ marginLeft: 14, marginBottom: 8, color: '#fff' }}>IC Number</Text>
                                    <TextInput
                                        style={{ marginLeft: 12, marginBottom: 12, borderRadius: 6, height: 40, borderColor: '#777', borderWidth: 1, color: '#fff' }}
                                        onChangeText={(icnumber) => {
                                            setIcnumber(icnumber);
                                        }}
                                        value={icnumber}
                                    />
                                    <Text style={{ marginLeft: 14, marginBottom: 8, color: '#fff' }}>Company Name</Text>
                                    <TextInput
                                        style={{ marginLeft: 12, marginBottom: 12, borderRadius: 6, height: 40, borderColor: '#777', borderWidth: 1, color: '#fff' }}
                                        onChangeText={(companyname) => {
                                            setCompanyname(companyname);
                                        }}
                                        value={companyname}
                                    />
                                    <Text style={{ marginLeft: 14, marginBottom: 8, color: '#fff' }}>Email</Text>
                                    <TextInput
                                        style={{ marginLeft: 12, marginBottom: 12, borderRadius: 6, height: 40, borderColor: '#777', borderWidth: 1, color: '#fff' }}
                                        onChangeText={(useremail) => {
                                            setUseremail(useremail);
                                        }}
                                        value={useremail}
                                    />
                                    <Text style={{ marginLeft: 14, marginBottom: 8, color: '#fff' }}>Mobile</Text>
                                    <TextInput
                                        style={{ marginLeft: 12, marginBottom: 12, borderRadius: 6, height: 40, borderColor: '#777', borderWidth: 1, color: '#fff' }}
                                        onChangeText={(mobile) => {
                                            setMobile(mobile);
                                        }}
                                        value={mobile}
                                    />
                                    <Text style={{ marginLeft: 14, marginBottom: 8, color: '#fff' }}>Address</Text>
                                    <TextInput
                                        style={{ marginLeft: 12, marginBottom: 16, borderRadius: 6, height: 40, borderColor: '#777', borderWidth: 1, color: '#fff' }}
                                        onChangeText={(address) => {
                                            setAddress(address);
                                        }}
                                        value={address}
                                    />
                                    <View style={{ color: '#fff' }}>
                                        <RadioForm
                                            radio_props={radio_props}
                                            initial={0}
                                            formHorizontal={true}
                                            labelHorizontal={false}
                                            itemShowKey="label"
                                            itemRealKey="value"
                                            // onPress={(item) => {setGender(item.value)}}
                                            onPress={(itemShowKey) => {setGender(itemShowKey)}}
                                            onPress={(label) => {setGender(label)}}
                                            accessible={true}
                                            labelStyle={styles.new}
                                            buttonStyle={10}
                                            buttonSize={10}
                                        />
                                    </View>
                                    <View>
                                        <View style={styles.fixToText}>
                                            <Button
                                                title="Submit"
                                                onPress={addagent}
                                            />
                                        </View>
                                    </View>
                                </View>
                                </ScrollView>
                            </Modal>
                        </TouchableOpacity>
                    </View>
                    {/* Associate with an Agent */}
                    <View style={{ width: '100%', padding: 20, borderBottomColor: 'grey', borderBottomWidth: 0.4, borderTopWidth: 0.4 }}>
                        <View>
                            <Text style={{ color: '#fff', marginLeft: 0, marginBottom: 20, fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginTop: 3 }}>
                                Want to Associate with an Agent ?
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Image
                                    source={require('./../../../assets/ratu_icons/become_agent.png')}
                                    style={{ width: 24, height: 24, }}
                                />
                                {/* <Text onPress={showDialog} style={{color:'#fff',marginLeft:10,textAlign:'left',marginTop:3}}>
                                    Become an Agent
                                </Text> */}
                                <Text 
                                onPress={()=>{
                                    if (associatedagent == null){
                                        if(agentapprovalstatus == 'active'){
                                            ToastAndroid.show('Your already an agent', ToastAndroid.SHORT);
                                        }else{
                                            if(agentrefareestatus == 'pending'){
                                                ToastAndroid.show("your previous request for associate with an agent is pending ", ToastAndroid.SHORT);  
                                                }else{   
                                                    toggleSecondModal()
                                                }   
                                        }
                                    }else{
                                    setExistingagentmodal(!existingagentmodal)
                                    }
                                    }} style={{ color: '#fff', marginLeft: 10, textAlign: 'left', marginTop: 3, }}>
                                    Click here
                                </Text>
                            </View>
                            <Modal hasBackdrop isVisible={secondModalVisible} >
                                <View style={styles.agentModal}>
                                    <View>
                                        <Text onPress={toggleSecondModal} style={{ textAlign: 'right', color: '#fff' }}>X</Text>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: 'left', marginBottom: 20, marginLeft: 20, fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Associate with an Agent</Text>
                                    </View>
                                    <Text style={{ marginLeft: 14, marginBottom: 8, color: '#fff' }}>Agent Code</Text>
                                    <TextInput
                                        style={{ marginLeft: 12, marginBottom: 12, borderRadius: 6, height: 40, borderColor: '#777', borderWidth: 1, color: '#fff' }}
                                        onChangeText={(agentcode) => {
                                            setAgentcode(agentcode);
                                        }}
                                        value={agentcode}
                                    />
                                    <View>
                                        <View style={styles.fixToText}>
                                            <Button
                                                color='gold'
                                                title="Save"
                                                titleStyle={styles.buttonTitleSearch}
                                                title="Submit"
                                                onPress={conformationmodal}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={thirdModalVisible}
                            onRequestClose={() => {
                                setthirdModalVisible(!thirdModalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <Text style={styles.modalText}>Are you sure,you want to link with</Text>
                                <Text style={styles.modalText}>the agent {agentname} ({agentcode})</Text>
                                <View style={styles.modalView}>
                                    <TouchableHighlight
                                        activeOpacity={0.9}
                                        underlayColor="#ccc"
                                        style={[styles.button, styles.buttonNo]}
                                        onPress={() => setthirdModalVisible(!thirdModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Cancel</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        activeOpacity={0.8}
                                        underlayColor="yellow"
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() =>{
                 if(streamerreq != null){
                    var condition = streamerreq.indexOf(uid);
                     if (condition >= 0) {
                        ToastAndroid.show('Request is already pending', ToastAndroid.SHORT);
                    }else{
                    updatestreamerrequest()
                }
            }else{
                updatestreamerrequest()
            }
                // for (let i = 0; i <= streamerreq.length; i++) {
                //     if (uid == streamerreq[i]) {
                //         ToastAndroid.show('Request is already pending', ToastAndroid.SHORT);
                //     }
                //   }else:
                // }else{
                //     updatestreamerrequest()
                // }
                                            
                                        }}
                                    >
                                        <Text style={styles.textStyle}>confirm</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={existingagentmodal}
                            onRequestClose={() => {
                                setExistingagentmodal(!existingagentmodal);
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
                                        onPress={() => setExistingagentmodal(!existingagentmodal)}
                                    >
                                        <Text style={styles.textStyle}>Okay</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={agentidModalVisible}
                            onRequestClose={() => {
                                setagentidModalVisible(!agentidModalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <Text style={styles.modalText}>Incorrect agent ID,Please check</Text>
                                <View style={styles.modalView}>
                                    <TouchableHighlight
                                        activeOpacity={0.9}
                                        underlayColor="#ccc"
                                        style={[styles.button, styles.buttonNo]}
                                        onPress={() => setagentidModalVisible(!agentidModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>OK</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>

                        {/* <Modal
                            animationType="fade"
                            transparent={true}
                            visible={agentidModalVisible}
                            onRequestClose={() => {
                                setAgentStatusModalVisible(!AgentStatusModalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <Text style={styles.modalText}>Agent does not exist</Text>
                                <View style={styles.modalView}>
                                    <TouchableHighlight
                                        activeOpacity={0.9}
                                        underlayColor="#ccc"
                                        style={[styles.button, styles.buttonNo]}
                                        onPress={() => setAgentStatusModalVisible(!AgentStatusModalVisible)}
                                    >
                                        <Text style={styles.textStyle}>OK</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal> */}
                    </View>
                    {/* For Support please contact */}
                    <View style={{ padding: 20, borderTopColor: 'grey', borderBottomWidth: 0.4 }}>
                        <View>
                            <Text style={{ color: '#fff', marginLeft: 0, marginBottom: 20, fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginTop: 3 }}>
                                For Support please contact
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Image
                                source={require('./../../../assets/ratu_icons/support_email.png')}
                                style={{ width: 24, height: 24, }}
                            />
                            <Text style={{ color: '#fff', marginLeft: 10, textAlign: 'left', marginTop: 3 }}>
                                support@ratulive.com
                            </Text>
                        </View>
                    </View>
                    {/* agents@ratulive.com */}
                    <View style={{ padding: 20, borderBottomColor: 'grey', borderTopColor: 'grey', borderBottomWidth: 0.4, borderTopWidth: 0.4 }}>
                        <View>
                            <Text style={{ color: '#fff', marginLeft: 0, marginBottom: 20, fontSize: 16, fontWeight: 'bold', textAlign: 'left', marginTop: 3 }}>
                                For Agent Support please contact
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            <Image
                                source={require('./../../../assets/ratu_icons/support_email.png')}
                                style={{ width: 24, height: 24, }}
                            />
                            <Text style={{ color: '#fff', marginLeft: 10, textAlign: 'left', marginTop: 3 }}>
                                agents@ratulive.com
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
export default Support;