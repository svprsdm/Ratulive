import React from 'react';
import { View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './Profile.style';
import CustomFields from './CustomFields';
import { Component } from 'react';
import Video from 'react-native-video';
class Profile extends Component {
  backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
    const userData = auth().currentUser;
    console.log(userData);
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  logout = () => {
    console.log('wel');
    auth()
      .signOut()
      .then(() => console.log(CustomFields.variables.LogoutMassge));
  };
  // {this.props.params.user.email}
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome</Text>
        <Video
          source={{ uri: 'https://www.youtube.com/watch?v=zfZadurY6c0' }}
          ref={(ref) => {
            this.player = ref;
          }} // Store reference
        //onBuffer={this.onBuffer} // Callback when remote video is buffering
        //onError={this.videoError} // Callback when video cannot be loaded
        //style={styles.backgroundVideo}
        />
        {/* <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => this.logout()}>
          <Text style={styles.buttonText}> Logout</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
export default Profile;
