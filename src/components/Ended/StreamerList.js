import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
export default function Streamlist() {
  const [item] = React.useState(
    {
      img: require('../../../assets/girl1.png'),
      img: require('../../../assets/girl3.png')
    }
  );
  return (
    <View style={styles.container}>
      <Image source={item.img} style={{ width: 90, height: 90, borderRadius: 50 }} />
      <Text style={{ color: "white" }}>Mary</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center", alignItems: "center"
  },
});
