import { relativeTimeRounding } from 'moment';
import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
export default function chatMessageFormat(props) {
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    useEffect(() => {
        setMessage(message);
        setUserName(userName);
    }, [])
    if (props.visible === true) {
        return (
            <View style={styles.chatContainer}>
                <View style={styles.rectangle}>
                    <View style={{ flexDirection: 'row', marginLeft: 2, marginTop: 2, marginBottom: 2 }}>
                        <Text
                            style={{ fontSize: 12, color: 'yellow', fontWeight: 'bold', left: 5, height: '100%', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>
                            {props.userName} :
                            <Text
                                style={{ fontSize: 14, color: 'white', fontWeight: 'semi-bold', left: 15, height: '100%', lineHeight: 20, paddingRight: 10, paddingLeft: 10 }} numberOfLines={0}>
                                {' '} {props.message}
                            </Text>
                        </Text>
                        {/*  */}
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
    chatContainer: {
        position: 'relative',
        width: '100%',
        // height:32,
    },
    rectangle: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 5,
        marginRight: 0,
        paddingRight: 20,
        paddingTop: 3,
        paddingBottom: 3,
        marginTop: 2,
        // height:'95%',
        // lineHeight: 15,
        // alignContent:'center',
        // alignSelf:'center',
        alignItems: 'center',
        // width:'100%',
        // flexWrap:'wrap'
        // padding: (5,5)
    },
});
    // <View style={styles.rectangle}>
    //         <View style={{flexDirection:'row', margin:1}}>
    //        <Image source={require('../assets/Avatar.png')} 
    //        style={props.message != ''?{width:26,height:30,marginLeft:'3%'} : {width:0,height:0}} />
    //        <View style={{flexDirection:'column', position: 'relative',marginLeft:5}}>
    //         <Text 
    //         style={{fontSize:8,color:'white',fontWeight:'bold'}}>
    //         {props.userName}
    //         </Text>
    //          <View style={{left:1,top:10,position:'absolute'}}>
    //         <Text  style={{fontSize:13,color:'white',width: 250,  marginBottom:'1%'}}>
    //          {props.message}
    //         </Text>
    //       </View>
    //       </View>
    //     </View>
    //     </View>