import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import SearchBar from './Searchbar';
export default function Searchbar() {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: "5%" }}>
        <Text style={{ color: "white", fontSize: 15 }}>Search Loaction</Text>
        <Image source={require('../../../assets/Avatar.png')} style={{ height: 50, width: 50 }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: "0%", margin: "3%" }}>
        <Image source={require('../../../assets/Avatar.png')} style={{ height: 30, width: 30 }} />
        <SearchBar />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", margin: "5%", marginTop: "8%" }}>
        <Image source={require('../../../assets/Avatar.png')} style={{ height: 40, width: 40 }} />
        <View style={{ marginLeft: "3%" }}>
          <Text style={{ color: "white" }}>Current Location</Text>
          <Text style={{ color: "white", opacity: 0.6, fontSize: 12, marginTop: "2%" }}>Using GPS</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", margin: "5%" }}>
        <Image source={require('../../../assets/Avatar.png')} style={{ height: 40, width: 40 }} />
        <Text style={{ color: "white", marginLeft: "3%" }}>Other</Text>
      </View>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginTop: "2%"
        }}
      />
      <View>
        <Text style={{ color: "white", margin: "3%", marginLeft: "8%" }}>Recent Search</Text>
        <View style={{ flexDirection: "row", alignItems: "center", marginLeft: "5%", }}>
          <Image source={require('../../../assets/Avatar.png')} style={{ height: 40, width: 40 }} />
          <Text style={{ color: "white", opacity: 0.6, marginLeft: "3%" }}>Surat</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginTop: "5%"
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
});