import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Dialog from 'react-native-dialog';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Card, Avatar, Button, Title } from 'react-native-paper';
import styles from './AddFriendFollowStyles';
import DialogBox from './DialogBox'
class Menudata extends React.PureComponent {
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
      <View style={{
        // height:30,width:30, alignItems: 'center',
      }}>
        <Menu
          ref={this.setMenuRef}
          button={<TouchableOpacity onPress={this.showMenu}>
            {/* <Image  style={styles.warningIcon} source={require('../../../assets/icons/warning.png') }/> */}
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/ratu_icons/report_ico.png')} />
          </TouchableOpacity>}
        >
          <MenuItem onPress={() => {
            this.setState(prevState => ({
              visible: !prevState.visible,
              dialog: 'block'
            }));
          }}>
            <View style={styles.blockContainer}>
              <Image style={styles.blockIcon} source={require('../../../assets/icons/block.png')} />
              <Text style={styles.blockText}> Block</Text>
            </View>
          </MenuItem>
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
        <DialogBox visible={this.state.visible} dialog={this.state.dialog} hideDialog={this.hideDialogBox} tokenid={this.props.token_id}/>
      </View>
    );
  }
}
export default Menudata;
