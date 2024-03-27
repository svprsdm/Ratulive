import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, Dimensions, Button, View, TextInput, TouchableOpacity, } from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
export default function Createpwd(props) {
    if (props.pwd === true) {
        return (
            <View style={styles.createPwdcontainer}>
                <View style={styles.rectangle}>
                    <View style={styles.createpwdTextcontainer}>
                        <Text style={styles.createpwdText}>Create Password</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Create Password"
                            placeholderTextColor="#f1c40f"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={{ justifyContent: 'center', flexDirection: 'row', }}>
                        <TouchableOpacity style={styles.okButton} onPress={() => props.password(false)}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#fff200', '#f39c12', '#fff200',]} style={styles.gradientOkbtn}>
                                <Text style={styles.okText}>OK</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    } else {
        return (
            <View></View>
        )
    }
};
const { height } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    videoContainerpwd: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    video: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    createPwdcontainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rectangle: {
        height: 210,
        width: 320,
        borderRadius: 15,
        backgroundColor: 'black',
        position: 'absolute',
        opacity: .8,
    },
    createpwdTextcontainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    createpwdText: {
        color: '#fff',
        fontSize: 25,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    inputContainer: {
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#f1c40f',
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 18,
        opacity: .8,
        fontSize: 15,
        color: '#f1c40f',
    },
    gradientOkbtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
    okButton: {
        margin: (20, 20),
        width: '70%',
        height: 40,
    },
    okText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
