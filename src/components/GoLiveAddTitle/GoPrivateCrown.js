//import React in our code
import React, { useState } from 'react';
//import all the components we are going to use
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
  TouchableHighlight,
  SafeAreaView,
  Modal
} from 'react-native';

import SelectableChips from 'react-native-chip/SelectableChips';
import { useNavigation } from '@react-navigation/native';
const GoPrivateCrown = (props) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [chipvalue, setChipvalue] = React.useState(0);
  const navigation = useNavigation();
  const btnHandler = () => {
    setShouldShow(previousState => !previousState);
  };
  return (
    <View style={{ width: '100%', position: 'absolute', }}>
      {shouldShow ? (
        <View style={{ height: 200, top: '20%', display: 'flex', alignContent: 'center', alignItems: 'center' }}>
          <SelectableChips
            initialChips={["1000", "3000", "5000", "8000"]}
            onChangeChips={(chips) => {
              setChipvalue(chips);
              setModalVisible(true);
            }} alertRequired={false}
            chipStyle={{ width: 50, fontSize: 10, borderColor: 'yellow' }}
            valueStyle={{ fontSize: 10, color: 'black', fontWeight: 'bold' }}
            valueStyleSelected={{ backgroundColor: 'yellow' }}
            chipStyleSelected={{ backgroundColor: 'yellow' }}
            style={{
              fontSize: 8,
              bottom: 0
            }}
          />
        </View>
      ) : null}
      <View style={{ alignItems: 'center', display: 'flex', alignContent: 'flex-end', alignSelf: 'flex-end', position: 'relative', width: '50%', height: 60, flexDirection: 'column' }}>
        <TouchableOpacity style={{ height: 40 }} onPress={() => btnHandler(!shouldShow)}>
          <View>
            <Image source={require('../../../assets/ratu_icons/ticket.png')} style={styles.privateBtn} />
            <Text style={{ color: '#fff' }}>Ticket</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      > 
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Are you sure,Do you want to start a private session with {chipvalue} crowns</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#ccc"
              style={[styles.button, styles.buttonNo]}
              onPress={() => {
                setModalVisible(!modalVisible)
                setShouldShow(!shouldShow)
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor="yellow"
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setShouldShow(!shouldShow);
                setTimeout(() => {
                  navigation.navigate('GoLiveLiveStream', {
                    selectedItem: props.selectedItem,
                    chips: JSON.stringify(chipvalue),
                    title: props.title,
                  })
                }, 300)
              }}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
  },
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  privateBtn: {
    width: 25,
    height: 25,
    left: 0,
    marginBottom: 10,
    borderWidth: 1,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    flex: 1,
    borderColor: '#fff',
    borderRadius: 100,
    padding: 15,
    borderRightColor: 'red'
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: '45%',
    backgroundColor: "rgba(0,0,0,0.95)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
    top: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    flexDirection: 'column',
    color: 'white'
  },
  modalView: {
    margin: 20,
    flexDirection: 'row',
    // justifyContent:'flex-end', 
    // alignItems: 'flex-end'
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 80,
    margin: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "gold",
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '40%'
  },
  buttonNo: {
    backgroundColor: "grey",
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  textStyle: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center"
  },
});
export default GoPrivateCrown;