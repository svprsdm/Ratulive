import React from 'react';
import { Image, FlatList, Text, View } from 'react-native';
import CustomFields from './CustomFields';
import styles from './TopupCrowns.style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useFetchMasterCrowns from '../../hooks/useFetchMasterCrowns';
const numColumns = 2;
function TopupCrowns(props) {
  const { allMasterCrowns } = useFetchMasterCrowns();
  return (
    <View style={styles.container}>
      <FlatList
        data={allMasterCrowns}
        renderItem={({ item }) => (
          <View style={[styles.flatListStyle]}>
            <View style={styles.crownsHeader}>
              <Text style={styles.crownsHeaderText}>{item.count} CROWNS</Text>
            </View>
            <View style={styles.crowns}>
              <Image
                source={CustomFields.variables.Logo}
                style={styles.liveImage}></Image>
            </View>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('Payment', {
                  amount: item.value,
                  crowns: item.count,
                })
              }
              style={styles.buyButton}>
              <Text style={styles.buyAmount}>RM {item.value} </Text>
              <Text style={styles.buyText}>BUY</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
export default TopupCrowns;
