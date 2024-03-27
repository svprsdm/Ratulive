import React, { useState } from 'react';
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
  ToastAndroid,
  Alert,
  Modal,
  FlatList
} from 'react-native';
import {useAuth} from '../../hooks/Auth';
import {getstreaminglogs} from '../../utils/api';


export default function Streaminglog() {
  
  const auth = useAuth();
  const { uid } = auth?.user;
  const [logdataa, setlogdataa] = React.useState([]);

  React.useEffect(() => {
    fetchrecentlogs();
  });

const fetchrecentlogs = async () => {
    try {
      const userlogs = await getstreaminglogs({ uid });
      if (userlogs.error) {
        // console.log('error');
      } else {
        setlogdataa(userlogs.data.receivedCrowns.reverse());
      }
    } catch (error) {
      // console.log('Error while fetching user logs', error);
    }
  }
  
  
  return (
    <View style={styles.container}>
    <View style={styles.popular}>
        {/* <Text
          style={{
            color: '#fff',
            fontSize: 20,
            marginBottom: 8,
            marginLeft: 20,
            top:60
          }}>
          Recent logs
        </Text> */}
        <FlatList
          data={logdataa}
          style={{ borderTopColor: 'grey', borderTopWidth: 0.5, }}
          renderItem={({ item }) => (
            <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 0.5,
                padding: 15,
              }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: '#fff', fontSize: 15 }}>
                  Received {item.money} 
                </Text>
                <Text style={{ color: '#fff', fontSize: 15, marginTop: 2 }}>
                  {item.date}
                </Text>
                <Text style={{ color: '#fff', fontSize: 15, marginTop: 2 }}>
                  {item.time}
                </Text>
                
              </View>
            </View>
          )}
        />
      </View>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000'
    },
    popular: {
        flex: 2,
        marginTop:10,
    },
});