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
import { useNavigation } from '@react-navigation/native';
const GoPrivate = (props) => {
  const [shouldShow, setShouldShow] = useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const btnHandler = () => {
    setShouldShow(previousState => !previousState);
  };
  return (
    <View style={{ width: '100%' }}>
      {!shouldShow ? (
        <View style={{ height: 200 }}>
          <TextInput
            style={{
              height: 50,
              borderWidth: 1,
              width: '100%',
              borderRadius: 5,
              borderColor: '#FFD949',
              backgroundColor: 'rgba(0,0,0,0.8)',
              paddingLeft: 10,
              color: '#fff',
              bottom: 15,
              position: 'absolute',
            }}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
            onSubmitEditing={() => {
              setModalVisible(true);
            }}
            //numeric value   // This prop makes the input to get numeric only 
            keyboardType={'numeric'}
            placeholder="Private Password"
            placeholderTextColor="white"
          />
        </View>
      ) : null}
      <View style={{ alignItems: 'center', display: 'flex', alignContent: 'center', alignSelf: 'flex-start', position: 'relative', width: '50%', height: 60, flexDirection: 'column' }}>
        <TouchableOpacity style={{}} onPress={btnHandler}>
          <View>
            <Image source={require('../../../assets/ratu_icons/password.png')} style={styles.privateBtn} />
            <Text style={{ color: '#fff' }}>Password</Text>
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
          <Text style={styles.modalText}>Are you sure,Do you want to start a private session with password {password}</Text>
          <View style={styles.modalView}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="#ccc"
              style={[styles.button, styles.buttonNo]}
              onPress={() => setModalVisible(!modalVisible)}
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
                    password: password,
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
export default GoPrivate;