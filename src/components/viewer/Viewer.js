import React, { Component } from 'react';
import styled from "styled-components/native";
import {
  Animated,
  Image,
  Platform,
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  Button,
  Dimensions,
  KeyboardAvoidingView, Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {
  TabView,
  TabBar,
  TabViewPagerScroll,
  TabViewPagerPan,
} from 'react-native-tab-view';
import Share from 'react-native-share';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import styles from './Viewer.style';
import CustomFields from './CustomFields';
import Video from "react-native-video";
import ChatInputGroup from '../ChatInputGroup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import { NodePlayerView } from 'react-native-nodemediaclient';
import MessagesList from '../MessagesList/MessagesList';
class Viewer extends Component {
  state = {
    data: this.props.route.params.data,
    messages: [],
    countHeart: 0,
    isVisibleMessages: true,
    inputUrl: 'https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4',
  };
  onEndEditing = () => this.setState({ isVisibleMessages: true });
  onFocusChatGroup = () => {
    this.setState({ isVisibleMessages: false });
  };
  onPressSend = (message) => {
    //this.setState({message:message});
    // const { beginAt, messages } = data;
    // const start = moment(beginAt);
    // for (let i = 0; i < message.length; i += 1) {
    //   ((j, that) => {
    //     // const end = moment(messages[j].createdAt);
    //     // const duration = end.diff(start);
    //      setTimeout(() => {
    //       that.setState((prevState) => ({ messages: [...prevState.messages, message[j]] }));
    //     }, 5000);
    //   })(i, this);
    // }
    // SocketManager.instance.emitSendMessage({
    //   roomName: this.roomName,
    //   userName: this.userName,
    //   message,
    // });
    data = { roomName: 'vinoth', userName: 'vinoth', message: message }
    const messages = get(data, 'messages', []);
    messages.message = message;
    this.setState((prevState) => ({ messages: [...prevState.messages, messages] }));
    console.log("message");
    console.log(messages);
    //this.setState({ messages });
    this.setState({ isVisibleMessages: true });
  };
  renderListMessages = () => {
    const { messages, isVisibleMessages } = this.state;
    console.log(messages);
    if (!isVisibleMessages) return null;
    return <MessagesList messages={messages} />;
  };
 
  renderChatGroup = () => {
    return (
      <ChatInputGroup
        onPressHeart={this.onPressHeart}
        onPressSend={this.onPressSend}
        onFocus={this.onFocusChatGroup}
        onEndEditing={this.onEndEditing}
      />
    );
  };
  render() {
    const { message } = this.state;
    console.log(this.props.route.params);
    {/* // {this.renderNodePlayerView()} */ }
    return (
      <View style={styles.container}><Video
        source={require("../../../assets/video.mp4")}
        style={styles.playerView}
        muted={false}
        repeat={false}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
      />
        {this.renderChatGroup()}
        {this.renderListMessages()}
      </View>
    )
  }
}
export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;
Viewer.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  route: PropTypes.shape({}),
};
Viewer.defaultProps = {
  navigation: {
    goBack: () => null,
  },
  route: {},
};
export default Viewer;