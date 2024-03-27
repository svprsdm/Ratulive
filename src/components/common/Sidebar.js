import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'
import SocketManager from '../../components/socket/socketManager';
import TouchFLoatingEffect from './TouchFloatingEffect';
// const Container = styled.View`
// 	flex:1;
// 	alignItems:flex-end;
// 	marginTop:62%;
// 	marginRight:8%
// `
const Container = styled.View`
	flex:1;
	marginTop:62%;
	marginLeft:80%
`
const Menu = styled.View`
	margin: 9px 0;
	align-items: center;
`
const User = styled.View`
	width: 48px;
	height: 48px;
	margin-bottom: 13px;
`
const Avatar = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: 48px;
	border-width: 2px;
	border-color: #ffffff;
`
const Icon = styled.Image`
	height: 40px;
`
const Count = styled.Text`
	color: #fff;
	font-size: 12px;
	letter-spacing: -0.1px;
`
const SoundBg = styled.View`
	background: #1f191f;
	width: 50px;
	height: 50px;
	border-radius: 50px;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
`
const Sound = styled.Image`
	width: 25px;
	height: 25px;
	border-radius: 25px;
`
const Sidebar = (props, { avatar, count }) => {
	const [heartCounter, setHeartCounter] = useState(1);
	const [messageCounter, setMessageCounter] = useState(1);
	if (props.visible === true) {
		return (
			<Container>
				{/* <Menu>
					<TouchableOpacity>
					<Icon resizeMode='contain' source={require('../assets/icons/like1.png')} />
					</TouchableOpacity>
				</Menu> */}
				<Menu>
					<TouchableOpacity onPress={() => {
						props.trackHeartCount(heartCounter);
						SocketManager.instance.emitSendHearts({
							roomId: Math.random().toString(36).substring(7)
						});
						console.log('Room id generated', roomId);
						setHeartCounter(prevCount => prevCount + 1);
					}}>
						<Icon resizeMode='contain' source={require('../../../assets/icons/like1.png')} />
					</TouchableOpacity>
				</Menu>
				<Menu>
					<TouchableOpacity onPress={() => props.giftPopVisibility()}>
						<Icon resizeMode='contain' source={require('../../../assets/icons/gift.png')} />
					</TouchableOpacity>
				</Menu>
				<Menu>
					<TouchableOpacity onPress={() => {
						setMessageCounter(prevCount => prevCount + 1);
						SocketManager.instance.emitSayHii({
							roomId: Math.random().toString(36).substring(7),
							userName: "userName",
							message: "Hii",
							count: messageCounter
						})
					}
					}>
						<Icon resizeMode='contain' source={require('../../../assets/icons/say.png')} />
					</TouchableOpacity>
				</Menu>
				<Menu>
					<TouchableOpacity>
						<Icon resizeMode='contain' source={require('../../../assets/icons/error.png')} />
					</TouchableOpacity>
				</Menu>
			</Container>
		)
	} else {
		return (
			<Container></Container>
		);
	}
}
export default Sidebar
