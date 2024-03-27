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
const image = { uri: 'https://i.pinimg.com/originals/8c/42/b9/8c42b9b369f8c7246d5b2e022ed8fffc.jpg' };
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Card style={styles.cards}>
          <View style={styles.rulesTextcontainer}>
            <TouchableOpacity>
              <Image
                style={styles.chevronIcon}
                source={require('../../../assets/icons/left-chevron.png')}
              />
            </TouchableOpacity>
            <Text style={styles.rulesText}>Rules</Text>
            <Text style={styles.dot}>.</Text>
          </View>
          <View style={styles.textContent}>
            <Text style={styles.rulesText1}>
              1. You need a key to open Ratu Chest .
            </Text>
            <Text style={styles.rulesText2}>
              2. If you open 10 treasure chest at once A surprice gift will
              appear.{' '}
            </Text>
            <Text style={styles.rulesText3}>
              3. You can preview the surprise gift in (Prizes preview) .
            </Text>
            <Text style={styles.rulesText4}>
              4. The winning gift will put in your package. You can give it to
              your favourite host or User .
            </Text>
            <Text style={styles.rulesText5}>
              5. The winning gift will put in your package. You can give it to
              your favourite host or User .
            </Text>
            <Text style={styles.rulesText5}>
              6. The winning gift will put in your package. You can give it to
              your favourite host or User .
            </Text>
          </View>
        </Card>
      </ImageBackground>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cards: {
    height: '60%',
    opacity: 1,
    backgroundColor: '#fff',
    borderRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: (15, 20),
  },
  rulesTextcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    margin: (10, 10),
  },
  chevronIcon: {
    marginTop: 3,
    width: 20,
    height: 15,
  },
  rulesText: {
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#EA2027',
    fontSize: 20,
    fontWeight: 'bold',
  },
  dot: {
    color: 'white',
  },
  textContent: {
    margin: (10, 10),
  },
  rulesText1: {
    color: '#FFC312',
    fontSize: 20,
    letterSpacing: 0.7,
    textAlign: 'justify',
  },
  rulesText2: {
    color: '#FFC312',
    fontSize: 20,
    letterSpacing: 0.7,
    textAlign: 'justify',
    marginTop: 8,
  },
  rulesText3: {
    color: '#FFC312',
    fontSize: 20,
    letterSpacing: 0.7,
    textAlign: 'justify',
    marginTop: 8,
  },
  rulesText4: {
    color: '#FFC312',
    fontSize: 20,
    letterSpacing: 0.7,
    textAlign: 'justify',
    marginTop: 8,
  },
  rulesText5: {
    color: '#FFC312',
    fontSize: 20,
    letterSpacing: 0.7,
    textAlign: 'justify',
    marginTop: 8,
  },
});
export default App;
