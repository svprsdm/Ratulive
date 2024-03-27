import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  timerText: {
    fontSize: 14,
    letterSpacing: .5,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.6)',
    opacity: 1,
    borderRadius: 11.5,
    padding: (1, 4),
    // height: 23,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  goLiveContainer: {
    width: 0,
    height: 0,
  },
  video: {
    width: windowWidth,
    height: windowHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    marginRight: 0,
  },
  liveStreamContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: (10, 14),
    paddingTop: 0,
    position: 'absolute',
    top: 0,
  },
  videoIcon: {
    height: 25,
    width: 40,
    marginLeft: '1%',
  },
  ratubtnContainer: {
    marginLeft: '9%',
    textAlign: 'center',
  },
  ratuIcon: {
    height: 40,
    width: 25,
  },
  endLivebtn: {
    height: 30,
    width: '23%',
    backgroundColor: '#EBB022',
    padding: (10, 4),
    marginRight: '5%',
    top: '0%',
    borderRadius: 20,
  },
  endliveText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  disclaimerText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
  },
  liveStreamSubContainer: {
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: (10, 3, 3),
    textAlign: 'center',
    position: 'absolute',
    top: '7%',
  },
  eyeIcon: {
    width: 25,
    height: 17,
    marginLeft: '15%',
  },
  eyeNumber: {
    fontSize: 17,
    color: '#fff',
    marginLeft: '15%',
  },
  timerText: {
    fontSize: 19,
    marginRight: '4%',
    color: '#fff',
    marginTop: '5%',
  },
  dot: {
    color: 'transparent',
  },
  graphContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    top: '12%',
    right: 0,
    margin: (0, 7),
  },
  graphIcon: {
    padding: (10, 10),
  },
  graphText: {
    color: '#fff',
    padding: (10, 10),
    fontSize: 18.5,
  },
  spotifyIcon: {
    padding: (10, 10),
  },
  bottomContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    bottom: 60,
    right: '5%',
    position: 'absolute',
    justifyContent: 'flex-end',
  },
  messageIcon: {
    width: 50,
    height: 50,
  },
  premiumIcon: {
    width: 30,
    height: 30,
  },
  pearlIcon: {
    width: 50,
    height: 50,
  },
  heartIcon: {
    width: 5,
    height: 5,
    top: 50,
  },
  textNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gold',
    backgroundColor: 'rgba(0,0,0,0.8)',
    textAlign: 'center',
    borderRadius: 20,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5
  },
  pauseIcon: {
    width: 50,
    height: 50,
  },
  shareContainer: {
    top: -20,
    left: 5,
  },
  sharetext: {
    top: -10,
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disclaimerText: {
    backgroundColor: 'yellow',
    color: 'black',
    padding: 8,
    bottom: 20,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 12,
    left: -30,
    margin: 40
  }
});
export default styles;
