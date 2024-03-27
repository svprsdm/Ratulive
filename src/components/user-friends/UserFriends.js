import React, {Component} from 'react';
import {
  Animated,
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from './UserFriends.style';
import DATA from './../../../resource/UserData';
export default class UserFriends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    fetch('https://picsum.photos/v2/list')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.setState({data: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    return (
      <View style={styles.scroll}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <SafeAreaView style={[styles.menuList, styles.scroll]}>
            <FlatList
              data={this.state.data}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.rowData}>
                  <Image
                    style={styles.icon}
                    source={{uri: item.download_url}}
                  />
                  <Text style={styles.menuText}>{item.author}</Text>
                  <View style={styles.list}>
                    <Text style={styles.rightText}>{'Follow'}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        )}
      </View>
    );
  }
}
