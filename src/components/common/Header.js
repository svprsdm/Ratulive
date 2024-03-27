import React from 'react'
import { TouchableOpacity, View, Text, ImageBackground, Image } from 'react-native'
import styled from 'styled-components/native'
import SocketManager from '../../components/socket/socketManager'
const Icon = styled.Image`
	height: 15px;
	marginTop:5%
`
const Icon1 = styled.Image`
	height: 45px;
`
const Container = styled.View`
	width: 100%;	 
	flex-direction: row;
	marginTop:3%
`
const Header = (props) => {
	if (props.visible === true) {
		return (
			<Container>
				<View style={{ marginLeft: '3%' }}>
					<Icon source={require('../../../assets/icons/R.png')} style={{ height: 50 }} />
				</View>
				<View style={{ backgroundColor: "grey", width: 200, height: 35, borderRadius: 50 / 2, opacity: .7, marginLeft: '10%', marginTop: '2%', position: 'relative' }}>
					<Image source={require('../../../assets/avatar/img.jpg')} style={{ width: 50, height: 50, borderRadius: 100, position: 'absolute', top: -6 }} />
					<View style={{ marginLeft: 35, flexDirection: "row", justifyContent: "center" }}>
						<Icon resizeMode='contain' source={require('../../../assets/icons/shiny.png')} />
						<Text style={{ color: "white", marginTop: "5%" }}>42.3K</Text>
						<Icon resizeMode='contain' source={require('../../../assets/icons/like1.png')} />
						<Text style={{ color: "white", marginTop: "5%" }}>1.2M</Text>
					</View>
				</View>
				<TouchableOpacity style={{ marginTop: '5%', marginLeft: "15%" }} onPress={
					SocketManager.instance.emitLeaveRoom({
						userName: "userName",
						roomId: Math.random().toString(36).substring(8)
					})
				}>
					<Image resizeMode='contain' source={require('../../../assets/icons/cancel.png')} style={{ width: 15, height: 15 }} />
				</TouchableOpacity>
			</Container>
		)
	} else {
		return (
			<Container></Container>
		);
	}
}
export default Header
