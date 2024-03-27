import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Card, Avatar, Button, Title } from 'react-native-paper';
import styles from './GoliveprofileStyle';
import GoliveDialog from './GoliveDialog'
class GoliveMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      dialog: '',
    };
  }
  _menu = null;
  hideDialogBox = () => {
    this.setState(
      { visible: !this.state.visible }
    )
  }
  // chatscreen =(item)=>{
  //   setselecteduserid(item.uid);
  //   setselectedusername(item.name);
  //   setselecteduserprofilepic(item.profile_pic);
  //   console.log('chat screen props',item);
  //   enterChat(itemm);
  // }
  // const enterChat = (obj) => {
  //   obj.text = 'Hi';
  //   console.log('Chat');
  //   console.log('Chat',props);
  //   props.navigation.navigate('Chat', {data: obj});
  // };
  setMenuRef = ref => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };
  showMenu = () => {
    this._menu.show();
  };
  //Test
  render() {
    return (
      <View style={{ height: 30, width: 30, alignItems: 'center', }}>
        <Menu
          ref={this.setMenuRef}
          button={<TouchableOpacity onPress={this.showMenu}><Image style={styles.warningIcon} source={require('../../../assets/icons/menuthreedot.png')} /></TouchableOpacity>}
        >
          {/* <MenuItem onPress={() => {
        this.setState(prevState => ({
          visible: !prevState.visible,
          dialog:'block'
        }));
      }}> */}
          <MenuItem
          // onPress={chatscreen(item)}
          >
            <View style={styles.blockContainer}>
              <Image style={styles.blockIcon} source={require('../../../assets/icons/message.png')} />
              <Text style={styles.blockText}> Chat</Text>
            </View>
          </MenuItem>
          {/* <MenuItem onPress={() => {
        this.setState(prevState => ({
          visible: !prevState.visible,
          dialog:'block'
        }));
      }}>
        <View style={styles.blockContainer}>
          <Image  style={styles.blockIcon} source={require('../../../assets/icons/block.png') }/>
          <Text style={styles.blockText}> Block</Text>
        </View>
      </MenuItem> */}
          <MenuItem onPress={() => {
            this.setState(prevState => ({
              visible: !prevState.visible,
              dialog: 'report'
            }));
          }}
          >
            <View style={styles.blockContainer}>
              <Image style={styles.reportIcon} source={require('../../../assets/icons/attention.png')} />
              <Text style={styles.blockText}> Report</Text>
            </View>
          </MenuItem>
        </Menu>
        <GoliveDialog userid={this.props.userid} username={this.props.username} tokenid={this.props.id} visible={this.state.visible} dialog={this.state.dialog} hideDialog={this.hideDialogBox} />
      </View>
    );
  }
}
export default GoliveMenu;
