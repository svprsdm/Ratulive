import React, { useState } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './AddFriendFollowStyles'
import { Card, Avatar, Button } from 'react-native-paper';
import Menudata from './Menudata';
export default function AddFriendFollowButton(props) {
  const [gifttCounter, setGiftCounter] = useState(1);
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  if (props.visible == true) {
    return (
      <View
        style={styles.cardContainer}>
        {/* <Card style={styles.cards}> */}
        <View
          style={styles.cardUnder}>
          <TouchableHighlight onPress={() => { props.errorPopVisibility() }}>
            <Image
              style={{ height: 18, width: 18, top: 10, }}
              source={require('../../../assets/icons/pngegg.png')}
            />
          </TouchableHighlight>
          <View style={styles.avtarImageContainer}>
            <Avatar.Image size={80} source={require('../../../assets/icons/pngegg.png')} />
          </View>
          <TouchableHighlight style={styles.avtarAttiontionContainer}>
            {/* <Avatar.Image size={20} source={require('../../assets/icons/warning.png')} /> */}
            <Menudata />
          </TouchableHighlight>
        </View>
        <View
          style={styles.idContainer}>
          <Text style={styles.idText}>
            ID: 23454123
          </Text>
        </View>
        <View style={styles.listContainer}>
          <View
            style={styles.friendsfollowContentContainer}>
            {/* <Text style={{ color: '#fff', opacity: 0.8 }}>Friends</Text> */}
            <Text style={{ color: '#fff', opacity: 1, fontSize: 16, }}>Followers</Text>
            <Text style={{ color: '#fff', opacity: 1, fontSize: 16, }}>Following</Text>
            <Text style={{ color: '#fff', opacity: 1, fontSize: 16, }}>Crowns</Text>
          </View>
          <View
            style={styles.listdataContainer}>
            <TouchableHighlight style={styles.followBtn}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight style={styles.addFriendBtn}>
            <Text style={styles.addFriendText}>Add Friend</Text>
          </TouchableHighlight> */}
          </View>
        </View>
      </View>
    );
  }
  else {
    return (
      <View />
    )
  }
}
