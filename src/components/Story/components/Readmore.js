import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// eslint-disable-next-line react/prefer-stateless-function
class Readmore extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }
  render() {
    const {
      onReadMore, text
    } = this.props;
    return (
      // text==''
      //   ?
      <TouchableOpacity onPress={onReadMore} style={styles.readMoreWrapper}>
        <View style={styles.readMore}>
          <Icon name="chevron-up" size={25} color="white" />
        </View>
        <Text style={styles.readText}>Reply</Text>
      </TouchableOpacity>
      //   :
      // <TouchableOpacity onPress={onReadMore} style={styles.readMoreWrapper2}>
      //   <Text style={styles.readText}>{text}</Text>
      //   <View style={styles.readMore}>
      //     <Icon name="chevron-up" size={20} color="white" />
      //   </View>
      // </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  readMore: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
    marginTop: 8,
  },
  readMoreWrapper: {
    position: 'absolute',
    bottom: 25,
    width: '98%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreWrapper2: {
    position: 'absolute',
    bottom: 25,
    width: '98%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C0C0C0',
  },
});
export default Readmore;
