import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Share, Modal, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native'
import SocketManager from '../../socket/socketManager';
import TouchFLoatingEffect from '../TouchFloatingEffect'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/Auth';
import { selectUser } from '../../../utils/api';
import styles from '../LiveShowStyle';
import Menudata from '../../AddFriendFollow/Menudata';
import OwnStory from '../../Story/screens/ownStory';
import InCallManager from 'react-native-incall-manager';

const Container = styled.View`
	flex:1;
	marginTop:60%;
	marginLeft:80%
`
const Menu = styled.View`
	margin: 9px 0;
	align-items: center;
`
const Icon = styled.Image`
	height:30px
`
const Sidebar = (props, { avatar, count }) => {
	const [heartCounter, setHeartCounter] = useState(1);
	const [messageCounter, setMessageCounter] = useState(1);
	const [uname, setUname] = useState('');
	const auth = useAuth();
	const { uid } = auth?.user;
	const navigation = useNavigation();
	const tokenid = props.tokenid;
	const [balance, setBalance] = useState(0);
	const [modalVisibleWallet, setModalVisibleWallet] = useState(false);
	const [modalVisibleExitMoment, setmodalVisibleExitMoment] = useState(false);
	const [giftCoinCount, setGiftCoinCount] = useState(0);
	const id = props.tokenid;

	React.useEffect(() => {
		fetchuserDetails();
	})
	async function fetchuserDetails() {
		/*for getting user info*/
		//   console.log('select user');
		try {
			const userinfo = await selectUser({ uid });
			if (userinfo.error) {
				console.log('error');
			} else {
				// console.log('Data from db',userinfo);
				setUname(userinfo[0].name);
				setBalance(userinfo[0].wallet);
				// console.log('sidebar',balance);
				// console.log('sidebar tokenid',props.tokenid);
			}
		} catch (error) {
			console.log('Error while fetching user data', error);
		}
	}
	const giftIcon = () => {
		if (balance < 15) {
			setModalVisibleWallet(true);
		} else {
			props.giftPopVisibility(true);
		}
		// props.giftPopVisibility(true);
	}

	const momentNav = () => {
		
	  setmodalVisibleExitMoment(true);
		
	}

	
	const onShare = async () => {
		try {
			const result = await Share.share({
				message:
					'Checkout This Ratulive https://www.ratulive.com/ is an interactive live-streaming platform for instant communication and new friends.',
				url: File.appLogo,
			});
			//   console.log(JSON.stringify(result));
		} catch (error) {
			console.log(error);
		}
	}

	async function updateviewer() {
		const viewerid = [uid];
		try {
		  await deleteviewerlist({
			id,
			vieweruid: viewerid,
		  })
		  // props.streamerstatus(true);
		 
		  
	
	  
		} catch (error) {
		  console.log('error while deleting user from stream', error);
		}
	  }

	if (props.visible === true) {
		return (
			<Container style={{ bottom: "5%", height: 300, right: 5, position: "absolute" }}>
				<Menu>
					{/* <TouchableOpacity onPress= {() => props.errorPopVisibility(true)}>
						<Icon style={{width:40, height: 40}} source={require('../../../../assets/ratu_icons/report_ico.png')} />
					</TouchableOpacity> */}
					<TouchableHighlight style={styles.avtarAttiontionContainer}>
						{/* <Avatar.Image size={20} source={require('../../assets/icons/warning.png')} /> */}
						{/* <Menudata /> */}
						<Menudata token_id = {tokenid}/>
					</TouchableHighlight>
				</Menu>
				<Menu>
					<TouchFLoatingEffect
						token_id={tokenid}
					/>
				</Menu>
				<Menu>
					<TouchableOpacity onPress={momentNav}>
						<Icon style={{ width: 40, height: 40 }} resizeMode='contain' source={require('../../../../assets/ratu_icons/moments_ico.png')} />
					</TouchableOpacity>
				</Menu>
				<Menu>
					<TouchableOpacity
						onPress={giftIcon}>
						<Icon style={{ width: 40, height: 40 }} resizeMode='contain' source={require('../../../../assets/ratu_icons/gift_ico.png')} />
					</TouchableOpacity>
				</Menu>
				<Menu>
					<TouchableOpacity
						onPress={onShare}>
						<Icon style={{ width: 40, height: 40, left: 5, top: -5 }} resizeMode='contain' source={require('../../../../assets/icons/share.png')} />
					</TouchableOpacity>
				</Menu>
				
				
				
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
									navigation.navigate('topup')
								}}
							>
								<Text style={styles.textStyle}>Topup</Text>
							</TouchableHighlight>
						</View>
					</View>
				</Modal>
				{/* <Menu>
					<TouchableOpacity 
						onPress={() => {
							setMessageCounter(prevCount => prevCount + 1);
							SocketManager.instance.emitSayHii({
								roomId:Math.random().toString(36).substring(7),
								userName:uname,
								message:"Hi",
								count:messageCounter
							})}
						}
						>
						<Icon style={{width:60, height: 60}} resizeMode='contain' source={require('../../../../assets/ratu_icons/sayhi_ico.png')} />
					</TouchableOpacity>
				</Menu> */}

				 {/* Modal Popup  */}
						<Modal
						animationType="fade"
						transparent={true}
						visible={modalVisibleExitMoment}
						onRequestClose={() => {
						//Alert.alert("Modal has been closed.");
						setmodalVisibleExitMoment(!modalVisibleExitMoment);
						}}
					>
						<View style={styles.centeredView}>
						<Text style={styles.modalText}>Do You Want To View Moments and Exit Live</Text>
				
						<View style={styles.modalView}>
							<TouchableHighlight
							activeOpacity={0.9}
							underlayColor="#ccc"
							style={[styles.button, styles.buttonNo]}
							onPress={() => setmodalVisibleExitMoment(!modalVisibleExitMoment)}
							>
							<Text style={styles.textStyle}>No</Text>
							</TouchableHighlight>
				
							<TouchableHighlight
							activeOpacity={0.8}
							underlayColor="yellow"
							style={[styles.button, styles.buttonClose]}
							onPress={() => {							
								setmodalVisibleExitMoment(!modalVisibleExitMoment);
								//updateviewer();
								props.audioSetting();
								navigation.replace('Moments');
								
							}}
							>
							<Text style={styles.textStyle}>Yes</Text>
							</TouchableHighlight>
						</View>
						</View>
					</Modal>

			</Container>

			
		)

	} else {
		return (
			<Container></Container>
		);
	}


}
export default Sidebar
