import React, { useState } from 'react';
import { View, Text, Image, Share, Button } from 'react-native';
import styles from '../refer/Refer.style';
import CustomFields from './CustomFields';
import File from './FileBase64';
const Refer = () => {
    const [page, setCPage] = useState(false);
    const changePage = () => {
        setCPage(!page);
    }
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'Checkout This Ratulive https://www.ratulive.com/ is an interactive live-streaming platform for instant communication and new friends.',
                url: File.appLogo,
            });
            console.log(JSON.stringify(result));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            {page == false ? <>
                <View style={styles.cardContainer}>
                    <Image source={CustomFields.variables.Logo} style={{ marginTop: 10 }} />
                </View>
                <View style={styles.popular}>
                    {/* <Image source={CustomFields.variables.Logo} style={{width:50,height:45}} /> */}
                    <Text style={{ color: 'gold', fontSize: 12, marginTop: 2 }}>Checkout This Ratulive is an interactive live-streaming platform for instant communication and new friends.
                    </Text>
                </View>
                <View style={styles.Button}>
                    <Text onPress={onShare} style={{ color: '#000', backgroundColor: 'gold', fontSize: 16, textAlign: 'center', padding: 9, fontWeight: 'bold', bottom: 25, }}>SHARE</Text>
                </View>
            </> : <>
                <View style={styles.imageContainer}>
                    <Image source={CustomFields.variables.Boys} style={{ width: 410, height: 270 }} />
                </View>
                <View style={{ flex: 1, borderWidth: 25, borderRadius: 20 }}>
                    <View style={{
                        padding: 50,
                        height: 40, margin: 9,
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderRadius: 1, borderColor: 'gold'
                    }}
                    >
                        <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: -25 }}>Your Invite Code</Text>
                        <Text style={{ color: '#fff', fontSize: 25, textAlign: 'center', fontWeight: 'bold', marginTop: 2, marginBottom: 4 }}>RATULIV01</Text>
                    </View>
                    <View>
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' }}>Earn 100 Crowns on every referral</Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center' }}>Claim your rewards once your friend successfully install app and register account</Text>
                    </View>
                </View>
                <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}>
                    <Text onPress={onShare} style={{ color: '#000', backgroundColor: 'gold', fontSize: 16, textAlign: 'center', padding: 9, fontWeight: 'bold', bottom: 25, }}>INVITE NOW</Text>
                </View></>}
        </View>
    )
}
export default Refer;