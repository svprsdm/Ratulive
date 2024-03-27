import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-paper';
const image = { uri: 'https://i1.jpopasia.com/news/4/11961-2vtd7z75rt.jpg' };
const Viewerslist = (props) => {
  if (props.visible === true) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.image}>
          <Card style={styles.cards}>
            <ScrollView>
              <View style={styles.headerContainer}>
                <Text style={styles.headerContent}>Top gifters </Text>
              </View>
              {/* repeat component  */}
              <View style={styles.detailprofileContainer}>
                <Image
                  style={styles.profileLogo}
                  source={require('../../../assets/icons/profile.png')}
                />
                <View style={styles.profileNameContainer}>
                  <Text style={styles.profileName}> Sonia</Text>
                  <View style={styles.premiumContainer}>
                    <Image
                      style={styles.premiumIcon}
                      source={require('../../../assets/icons/premium.png')}
                    />
                    <Text style={styles.premiumNumber}> 800</Text>
                  </View>
                </View>
                <Text style={styles.ruffText}>.x x xcscscscscs</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.addfriendIcon}
                    source={require('../../../assets/icons/addfriend.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
              </View>
              {/* repeat component  end */}
              {/* repeat component  */}
              <View style={styles.detailprofileContainer}>
                <Image
                  style={styles.profileLogo}
                  source={require('../../../assets/icons/profile.png')}
                />
                <View style={styles.profileNameContainer}>
                  <Text style={styles.profileName}> Sonia</Text>
                  <View style={styles.premiumContainer}>
                    <Image
                      style={styles.premiumIcon}
                      source={require('../../../assets/icons/premium.png')}
                    />
                    <Text style={styles.premiumNumber}> 800</Text>
                  </View>
                </View>
                <Text style={styles.ruffText}>.x x xcscscscscs</Text>
                <TouchableOpacity>
                  <Image
                    style={styles.addfriendIcon}
                    source={require('../../../assets/icons/addfriend.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
              </View>
              {/* repeat component  end */}
            </ScrollView>
          </Card>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <View></View>
    )
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    bottom: 0
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  cards: {
    height: '100%',
    opacity: 0.7,
    backgroundColor: '#000',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: (15, 8),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: -6,
  },
  headerContent: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
  },
  detailprofileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 2,
    margin: (5, 5),
  },
  profileLogo: {
    width: 50,
    top: '0%',
    height: 50,
  },
  profileName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileNameContainer: {
    flexDirection: 'column',
    right: 14,
  },
  premiumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  premiumIcon: {
    width: 15,
    top: '7%',
    left: 5,
    height: 18,
  },
  premiumNumber: {
    fontSize: 14,
    top: '5%',
    marginLeft: 5,
    color: '#dfe6e9',
  },
  ruffText: {
    color: 'transparent',
  },
  addfriendIcon: {
    width: 22,
    top: '28%',
    height: 22,
  },
  lineContainer: {
    top: 10,
    margin: (10, 10),
  },
  line: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    opacity: .3
  },
});
export default Viewerslist;
