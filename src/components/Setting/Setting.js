import React, { useState } from 'react';
import { View, Text, Image, Share, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { LocationEnable } from '..';
import { useAuth } from '../../hooks/Auth';
import locationEnable from '../login-auth/locationEnable/LocationEnableScreen';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geolocation.getCurrentPosition(
    (info) => {
        console.log("User Data", { user: info });
    },
    // {enableHighAccuracy: true, timeout: 15000, maximumAge: 150},
);
const Setting = (props) => {
    const auth = useAuth();
    const { uid } = auth?.user;
    console.log('setting', uid);
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity>
            <Text>Bind Mobile Number</Text>
        </TouchableOpacity>
        */}
            <TouchableOpacity
                onPress={() => props.navigation.navigate('PhoneBindScreen', {
                    uid: uid,
                })}
                style={{
                    color: '#fff',
                    padding: 20,
                    marginVertical: 10,
                    marginHorizontal: 16,
                    borderTopColor: '#111',
                    borderTopWidth: 1,
                    borderBottomColor: '#111',
                    borderBottomWidth: 1
                }}
            >
                <Text style={{
                    color: '#fff',
                    fontSize: 16
                }}>
                    Change Mobile number
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            style={{
                color: '#fff',
                padding: 20,
                marginVertical: 10,
                marginHorizontal: 16,
                borderTopColor:'#111',
                borderTopWidth:1,
                borderBottomColor:'#111',
                borderBottomWidth:1
            }}
            onPress={locationEnable}
        >
            <Text style={{
                color:'#fff',
                fontSize:16
            }}>Location Enable</Text>
        </TouchableOpacity> */}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
});
export default Setting;