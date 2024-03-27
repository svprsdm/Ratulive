import React, {Component} from 'react';
import {Image, TouchableOpacity, Text, View} from 'react-native';
import PhotoGrid from 'react-native-image-grid';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {items: []};
  }
  componentDidMount() {
    // Build an array of 60 photos
    let items = Array.apply(null, Array(60)).map((v, i) => {
      return {id: i, src: 'http://placehold.it/200x200?text=' + (i + 1)};
    });
    this.setState({items});
  }
  renderHeader() {
    return <Text>I'm on top!</Text>;
  }

  renderItem(item, itemSize, itemPaddingHorizontal) {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          width: itemSize,
          height: itemSize,
          paddingHorizontal: itemPaddingHorizontal,
        }}
        onPress={() => {
          // Do Something
        }}>
        <Image resizeMode="cover" style={{flex: 1}} source={{uri: item.src}} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <PhotoGrid
        data={this.state.items}
        itemsPerRow={3}
        itemMargin={1}
        itemPaddingHorizontal={1}
        renderHeader={this.renderHeader}
        renderItem={this.renderItem}
      />
    );
  }
}
export default HomeScreen;
