import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import styles from './LiveShowStyle'
import SocketManager from '../socket/socketManager';
import Video from 'react-native-video';
export default function Livegift(props) {
    const [gifttCounter, setGiftCounter] = useState(1);
    const [items, setItems] = React.useState([
        { count: 500, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 70, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 90, img: require('../../../assets/icons/rose.png'), img2: require('../../../assets/icons/premium.png'), name: 'rose' },
        { count: 100, img: require('../../../assets/icons/security.png'), img2: require('../../../assets/icons/premium.png'), name: 'security' },
        { count: 140, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 190, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 210, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 368, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 998, img: require('../../../assets/icons/rose.png'), img2: require('../../../assets/icons/premium.png'), name: 'rose' },
        { count: 234, img: require('../../../assets/icons/security.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 543, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 120, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 140, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 500, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 160, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 170, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 180, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 190, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 50, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
        { count: 10, img: require('../../../assets/icons/kiss.png'), img2: require('../../../assets/icons/premium.png'), name: 'kiss' },
        { count: 20, img: require('../../../assets/icons/macro.png'), img2: require('../../../assets/icons/premium.png'), name: 'macro' },
    ]);
    if (props.visible == true) {
        return (
            <View style={styles.giftContainer}>
                <View>
                    <View style={styles.giftRowContainer}>
                        {/* <Text style={styles.giftText}>GIFTING</Text> */}
                        <TouchableOpacity style={styles.cancelIconTouch} onPress={() => props.giftPopUpVisibility(false)}>
                            <Image source={require('../../../assets/icons/cancel.png')} style={styles.cancelIcon} /></TouchableOpacity>
                    </View>
                    <FlatGrid
                        itemDimension={80}
                        data={items}
                        style={styles.gridView}
                        spacing={10}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                SocketManager.instance.emitSendGifts({
                                    roomId: Math.random().toString(36).substring(7),
                                    userName: "gift",
                                    imgName: item.name,
                                    giftCoin: item.count,
                                });
                                console.log("called");
                                props.giftPopUpVisibility();
                            }}>
                                <Image style={styles.giftsIcon} source={item.img} />
                                <View style={styles.giftIconContainer}>
                                    {/* <Image source={item.img2} style={styles.premiumIcon}  type="gif/video/webm"/> */}
                                    {/* <Video width="560" height="420" controls="controls">
                               <source src="URL to your webm video file" type="video/webm">
                            </Video> */}
                                    {/* <Video
                                source={item.img2}
                                style={{ width: 300, height: 300 }}
                                controls={true}
                                ref={(ref) => {
                                this.player = ref
                            }} /> */}
                                    <Text style={styles.giftIconnumber}>{item.count}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    } else {
        return (
            <View />
        )
    }
}
