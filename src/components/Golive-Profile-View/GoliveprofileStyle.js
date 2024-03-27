import { Dimensions, StyleSheet } from 'react-native'
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
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
		height: 25,
		width: 25,
		marginTop: "45%"
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
