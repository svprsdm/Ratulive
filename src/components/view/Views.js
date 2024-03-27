import React, { useState } from 'react';
import Video from 'react-native-video';
import { SafeAreaView, StyleSheet, Text, Dimensions, Image, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import Info from '../common/Info';
import styled from 'styled-components/native';
import Footer from '../common/Footer';
// import LiveChat from '../common/LiveChat';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const Icon = styled.Image`
	height: 40px;
`
export default function Views(data) {
	const [isVisible, setISVisible] = useState(true);
	const [newMsg, setNewMsg] = useState("");
	let setMsg = (data) => {
		setNewMsg(data);
	}
	return (
		<GestureRecognizer
			onSwipeLeft={() => {
				console.log("swiped");
				setISVisible(!isVisible)
			}}
			style={styles.videoContainer}
			onSwipeRight={() => {
				console.log("swiped");
				setISVisible(!isVisible)
			}}
			style={styles.videoContainer}
		>
			<Video
				source={require("../../../assets/videos/01.mp4")}
				style={styles.video}
				repeat={true}
				resizeMode={"cover"}
				rate={1.0}
				ignoreSilentSwitch={"obey"}
			/>
			<Header visible={isVisible} />
			<Info visible={isVisible} />
			<Sidebar visible={isVisible} />
			{/* <LiveChat visible={isVisible} msg = {newMsg}/> */}
			<Footer visible={isVisible} receiveMsg={setMsg} />
		</GestureRecognizer>
	);
};
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	videoContainer: {
		flex: 1,
		backgroundColor: 'black',
		position: 'relative',
	},
	video: {
		flex: 1,
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
	}
});
