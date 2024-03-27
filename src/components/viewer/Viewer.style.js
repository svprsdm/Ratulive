import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  playerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
  },
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
    width: width
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 10,
  },
  flex1: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput1: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    // height: 40,
    left: 20,
    top: height - 80,
  },
  col: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 6,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    height: 45,
  },
  //   wrapIconHeart: {
  //     width: 45,
  //     height: 45,
  //     borderRadius: 45,
  //     backgroundColor: 'white',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     marginLeft: 8,
  //     zIndex: 2,
  //   },
  //   iconHeart: {
  //     width: 45,
  //     height: 45,
  //     zIndex: 2,
  //   },
  wrapIconSend: {
    flex: 1,
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 20,
  },
  iconSend: {
    width: 33,
    height: 33,
    backgroundColor: "black"
  },
  iconCancel: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  fullScreen: {
    aspectRatio: width / height,
    width: "100%"
  },
  videoView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoStyle: {
    alignSelf: 'center',
    height: '80%',
    // resizeMode: 'contain'
  },
});
export default styles;