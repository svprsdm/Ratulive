import React from 'react';
import { View } from 'react-native';
import styles from './Moments.style';
import StoriesList from '../Story/screens/Stories';
const Moments = (props) => {
    return (
        <View style={styles.container}>
            {/* <FlatList
                data={imageList}
                renderItem={({item,index}) => (
                <TouchableOpacity style={styles.rowData} onPress={viewStories}>
                    <View>
                        <Image
                            style={{height:60,width:60,borderRadius:50,borderColor:'#fff',borderWidth:1,marginLeft:10}}
                            source={item.download_url}
                        />
                    </View>
                    <View style={styles.menuText}>
                        <Text style={styles.menuText}>{item.views} views</Text>
                        <Text style={styles.menuText}>{item.hours}</Text>
                    </View>
                </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            /> */}
            <StoriesList />
        </View>
    );
}
export default Moments;