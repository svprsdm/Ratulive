import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components/native'
const Icon = styled.Image`
	height: 40px;
`
const Container = styled.View`
	top: 80px;
	width: 100%;
	left:10;
	flex-direction: column;
	position: absolute;
	z-index: 1;
`
const RowContainer = styled.View`
	width: 100%;
	top:8;
	left:4;
	flex-direction: row;
	z-index: 1;
`
const Info = (props) => {
	if (props.visible === true) {
		return (
			<Container>
				<View style={{ backgroundColor: 'black', borderRadius: 50, opacity: .7, height: 25, width: 85, position: "relative" }}><Text style={{ position: "absolute", top: 2.5, left: 15, color: "white" }}>00:02.43</Text></View>
				<RowContainer>
					<View style={{ backgroundColor: 'grey', borderRadius: 50, opacity: .7, height: 35, width: 35, position: "relative", marginRight: '2%' }}><Icon resizeMode='contain' source={require('../../../assets/icons/game-controller.png')} style={{ position: "absolute", top: -4, left: 7 }} /></View>
					<View style={{ backgroundColor: 'grey', borderRadius: 50, opacity: .7, height: 35, width: 35, position: "relative" }}><Icon resizeMode='contain' source={require('../../../assets/icons/micro-sd.png')} style={{ position: "absolute", top: -4, left: 7 }} /></View>
				</RowContainer>
			</Container>
		)
	}
	else {
		return (
			<View></View>
		)
	}
}
export default Info
