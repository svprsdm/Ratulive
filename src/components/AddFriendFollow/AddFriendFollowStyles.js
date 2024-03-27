import { Dimensions, StyleSheet } from 'react-native'
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
	// LiveShow file Style
	videoContainer: {
		flex: 1,
		backgroundColor: '#212121',
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
	cardContainer: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		left: 0,
		zIndex: 5,
		height: '50%',
		backgroundColor: '#212121',
		borderRadius: 35,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		padding: (10, 10),
	},
	cardUnder: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	avtarImageContainer: {
		opacity: 1,
		bottom: '10%',
		textAlign: 'center',
		left: '12%',
	},
	avtarAttiontionContainer: {
		left: '25%',
		top: '3%',
	},
	idContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		top: '3%',
	},
	idText: {
		fontSize: 13,
		color: '#fff',
		opacity: 0.7,
		textAlign: 'center',
	},
	friendsfollowContentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: '15%',
	},
	followBtn: {
		width: "90%",
		alignItems: 'center',
		// height: 50,
		borderRadius: 5,
		backgroundColor: '#f1c40f',
		paddingTop: 10,
		paddingBottom: 10,
	},
	followText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
	addFriendBtn: {
		marginTop: "5%",
		backgroundColor: '#e74c3c',
		alignItems: 'center',
		height: 50,
		width: "90%",
		borderRadius: 5,
	},
	listContainer: {
		justifyContent: "space-around",
		flex: 1
	},
	listdataContainer: {
		marginTop: "10%",
		justifyContent: "center",
		alignItems: "center",
	},
	addFriendText: {
		paddingTop: 10,
		color: 'white',
	},
	dot: {
		color: 'transparent',
	},
	blockContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	btnerrorIcon: {
		backgroundColor: 'transparent',
		height: 50,
		top: 10,
	},
	warningIcon: {
		height: 50,
		width: 50,
	},
	blockIcon: {
		height: 18,
		width: 18,
	},
	blockText: {
		fontSize: 20,
		left: 10,
	},
	reportIcon: {
		height: 18,
		width: 18,
		top: 1,
	},
});
export default styles;
