import { Dimensions, StyleSheet } from 'react-native'
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	// LiveShow file Style
	videoContainer: {
		flex: 1,
		backgroundColor: 'black',
	},
	video: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		opacity: .6
	},
	giftContainer: {
		backgroundColor: "black",
		width: "100%",
		height: "60%",
		bottom: 0,
		position: 'absolute',
		opacity: 0.8,
	},
	giftRowContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'center',
	},
	giftText: {
		height: 35,
		marginTop: 25,
		marginLeft: "20%",
		backgroundColor: "gold",
		fontWeight: "bold",
		color: "black",
		fontSize: 22,
		borderRadius: 50,
		paddingLeft: 30,
		paddingTop: 2,
	},
	cancelIcon: {
		width: 20,
		height: 20,
		marginTop: "8%",
		marginLeft: '20%',
	},
	cancelIconTouch: {
		width: 20,
		height: 20,
		marginTop: "8%",
		marginLeft: '20%',
	},
	// LiveGift file Style
	gridView: {
		marginTop: "10%"
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 5,
		padding: 10,
		height: 100,
	},
	giftsIcon: {
		height: 50,
		width: 50,
	},
	giftIconcontainer: {
		flex: 1,
		flexDirection: 'row',
		marginLeft: 10,
	},
	premiumIcon: {
		width: 10,
		height: 10,
		marginTop: 5,
	},
	giftIconnumber: {
		color: "white",
		fontWeight: "bold",
		marginLeft: 5,
		fontSize: 10,
		marginTop: 5
	}
});
export default styles;
