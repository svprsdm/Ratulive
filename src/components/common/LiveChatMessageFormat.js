import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
export default function chatMessageFormat(props) {
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    useEffect(() => {
        setMessage(message);
        setUserName(userName);
        return () => {
            props.joinNotification != '' ? props.returnToEmpty(props.joinNotification) : props.returnToEmpty(props.leaveNotification)
        }
    }, [])
    if (props.visible === true) {
        return (
            <View style={styles.rectangle}>
                <View style={{ flexDirection: 'row', margin: 1 }}>
                    <Image source={require('../../../assets/Avatar.png')}
                        style={props.message != '' ? { width: 26, height: 30, marginLeft: '3%' } : { width: 0, height: 0 }} />
                    <View style={{ flexDirection: 'column', position: 'relative', marginLeft: 5 }}>
                        <Text
                            style={{ fontSize: 8, color: 'white', fontWeight: 'bold' }}>
                            {props.userName}
                        </Text>
                        <View style={{ left: 1, top: 10, position: 'absolute' }}>
                            <Text style={{ fontSize: 13, color: 'white', width: 250 }}>
                                {props.message}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <></>
        )
    }
}
const styles = StyleSheet.create({
    rectangle: {
        width: 300,
        borderRadius: 5,
        position: 'relative',
        opacity: 1,
        height: 'auto',
        marginBottom: 5
    },
});
