import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './DashboardStyle';
import CustomFields from './CustomField';
import CardView from 'react-native-cardview';
import {SliderBox} from 'react-native-image-slider-box';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
export default class Dashboard extends Component {
  state = {
    nameval: 'Popular',
    selectedTab: '',
    tabBarList: CustomFields.variables.tabbatList,
    displayAdImages: CustomFields.variables.displayAdArray,
  };
  randomHex = (index, name) => {
    this.setState({selectedTab: index, nameval: name});
  };
  renderingList = () => {
    const {tabBarList} = this.state;
    if (tabBarList.length > 0) {
      return tabBarList.map((item, index) => {
        return (
          <View style={styles.tabViewstyle}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.randomHex(index, item.name)}
              style={[
                styles.background,
                this.state.selectedTab == index
                  ? (style = {backgroundColor: 'gold'})
                  : (style = {backgroundColor: 'black'}),
              ]}>
              <Text
                style={[
                  styles.textbackground,
                  this.state.selectedTab == index
                    ? (style = styles.colorBlack)
                    : (style = styles.colorWHite),
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TopContainer}>
          <View style={styles.leftContainer}>
            <Image source={CustomFields.variables.Logo} style={styles.logo} />
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.skip}>{CustomFields.variables.title}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.skip}></Text>
          </View>
        </View>
        <View style={{height: 40}}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ref="_scrollView"
            style={styles.scrollViewStyle}>
            <View style={styles.scrollViewView}>
              <CardView cardElevation={5} style={styles.cardviewStyle}>
                {this.renderingList()}
              </CardView>
            </View>
          </ScrollView>
        </View>
        <View style={styles.sliderBoxView}>
          <SliderBox
            images={this.state.displayAdImages}
            sliderBoxHeight={100}
            dotColor={'orange'}
            inactiveDotColor={'white'}
            paginationBoxVerticalPadding={10}
            autoplay
            circleLoop
            dotStyle={{height: 8, width: 8, borderRadius: 20}}
            parentWidth={deviceWidth - 40}
            ImageComponentStyle={{borderRadius: 10}}
          />
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18}}>{this.state.nameval}</Text>
        </View>
      </View>
    );
  }
}
