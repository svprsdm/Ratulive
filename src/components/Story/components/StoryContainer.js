import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modalbox';
import GestureRecognizer from 'react-native-swipe-gestures';
import Story from './Story';
import UserView from './UserView';
import Readmore from './Readmore';
import ProgressArray from './ProgressArray';
import Icon from 'react-native-vector-icons/FontAwesome';
const SCREEN_WIDTH = Dimensions.get('window').width;
const StoryContainer = (props) => {
  const { user } = props;
  const { stories = [] } = user || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(3);
  const story = stories.length ? stories[currentIndex] : {};
  const { isReadMore, url } = story || {};
  const [value, setText] = useState('');
  const onText = (text) => {
    setText(text);
    console.log(text);
  }
  const changeStory = (evt) => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };
  const nextStory = () => {
    if (stories.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryNext();
    }
  };
  const prevStory = () => {
    if (currentIndex > 0 && stories.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryPrevious();
    }
  };
  const onImageLoaded = () => {
    setLoaded(true);
  };
  const onVideoLoaded = (length) => {
    setLoaded(true);
    setDuration(length.duration);
    // props.onVideoLoaded(length.duration);
  };
  const onPause = (result) => {
    setIsPause(result);
  };
  const onReadMoreOpen = () => {
    setIsPause(true);
    setModel(true);
  };
  const onReadMoreClose = () => {
    setIsPause(false);
    setModel(false);
    // setTEnter(styles.modal);
  };
  const loading = () => {
    if (!isLoaded) {
      return (
        <View style={styles.loading}>
          <View style={{ width: 1, height: 1 }}>
            <Story onImageLoaded={onImageLoaded} pause onVideoLoaded={onVideoLoaded} story={story} />
          </View>
          <ActivityIndicator color="white" />
        </View>
      );
    }
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };
  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      setModel(true);
    }
  };
  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        delayLongPress={500}
        onPress={e => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}
      >
        <View style={styles.container}>
          <Story onImageLoaded={onImageLoaded} pause={isPause} isNewStory={props.isNewStory} onVideoLoaded={onVideoLoaded} story={story} />
          {loading()}
          <UserView name={user.username} profile={user.profile} onClosePress={props.onClose} />
          {isReadMore && <Readmore onReadMore={onReadMoreOpen} />}
          <ProgressArray
            next={nextStory}
            isLoaded={isLoaded}
            duration={duration}
            pause={isPause}
            isNewStory={props.isNewStory}
            stories={stories}
            currentIndex={currentIndex}
            currentStory={stories[currentIndex]}
            length={stories.map((_, i) => i)}
            progress={{ id: currentIndex }}
          />
        </View>
        <Modal style={styles.modal} position="center" onPress={Keyboard.dismiss} isOpen={isModelOpen} onClosed={onReadMoreClose}>
          <KeyboardAvoidingView behavior="padding" style={styles.keyContain}>
            {/* <TouchableOpacity onPress={Keyboard.dismiss}> */}
            <Text style={{ paddingLeft: 15, paddingTop: 15, color: 'grey' }}>Comments here</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <TextInput
                style={{ height: 40, width: '75%', color: '#fff', backgroundColor: '#000', marginTop: 5 }}
                onChangeText={text => onText(text)}
                // onPress={(event)=> setTEnter(styles.modal2)}
                value={value}
              />
              <View style={{ marginTop: 35, borderRadius: 25, borderColor: 'gold', backgroundColor: 'gold', borderWidth: 5, padding: 5, }}>
                <Icon name="send" style={styles.actionButtonIcon} onPress={onReadMoreClose} />
              </View>
            </View>
            {/* </TouchableOpacity> */}
          </KeyboardAvoidingView>
        </Modal>
      </TouchableOpacity>
    </GestureRecognizer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // paddingTop: 30,
    backgroundColor: 'red',
  },
  keyContain: {
    flex: 1,
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  loading: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '96%',
    height: '15%',
    backgroundColor: '#000',
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: '#000',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 25,
    color: 'white',
    // textAlign:'center',
  },
});
export default StoryContainer;
