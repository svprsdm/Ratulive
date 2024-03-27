import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DOB,
  Login,
  Profile,
  PhoneAuthScreen,
  PhoneAuthVerify,
  HomeScreen,
  LocationEnable,
  UserProfile,
  MessageScreen,
  LeaderBoard,
  UserFollowers,
  UserFollowing,
  UserFriends,
  Dashboard,  EditProfile,
  TopupCrowns,
  Chat,
  Support,
  Refer,
  Setting,
  Wallet,
  Moments,
  Viewer,
  Views,
  LiveShow,
  Goliveprivatepassword,
  PublicLive,
  Goliveprivatecrowns,
  Golive,
  GoLiveProfileView,
  Ended,
  GoLiveAddTitle,
  GoLiveLiveStream,
  Detailsprofile,
  Viewerslist,
  Location,
  DetailedMoments,
  Payment,  
  Earned,
  Withdraw,
  Streaminglog,
  PhoneBindScreen,
  swipeLive,
} from '../components';
import {
  View,
  Platform,
  Animated,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  Alert,
  Text,
} from 'react-native';
// import {isRequired} from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';
// import styles from '../components/login-auth/age-validate/AgeValidate.style';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { relativeTimeRounding } from 'moment';
import checkIfFirstLaunch from '../utils/checkIfFirstLaunch';
export default function Navigator(props) {
  //Creating Stack for every pages to navigate
  const Stack = createStackNavigator();
  //const Tab = createMaterialBottomTabNavigator();
  const Tab = createBottomTabNavigator();
  const userAccountTab = createMaterialTopTabNavigator();
  
  const [showLocationEnable, setShowLocationEnable] = useState(null);
  useEffect(() => {
    /* 
    Check from localstorage or from somewhere should you
    show "OneTimeScreen"
    and setShowOneTimeScreen to needed value , and setLoading to true
    */
    //   const _retrieveData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('@key');
    //       if (value !== null) {
    //         showLocationEnable = false
    //       }else {
    //          props.navigation.navigate('EditProfile')
    //       }
    //     } catch (error) {
    //     }
    //  };
    //     _retrieveData()
    checkIfFirstLaunch().then((showLocationEnable) => {
      setShowLocationEnable(showLocationEnable)
    });
  }, []);
  function Live() {
    return (
      <View>
        <Image
          source={require('./../../assets/proceed.png')}
          style={{ width: 35, height: 30 }}
        />
      </View>
    );
  }
  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    switch (routeName) {
      case 'LocationEnable':
        return 'LocationEnable';
      case 'UserProfile':
        return 'Profile';
      case 'Account':
        return 'My account';
    }
  }
  function userAccountTabs({ navigation, route }) {
    React.useLayoutEffect(() => {
      // const title = getHeaderTitle(route);
      // console.log(route.params);
      // if (title == 'Profile') {
      navigation.setOptions({
        // headerTitle: title,
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerShown: true,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#FFFFFF',
        },
        headerLeft: () => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('./../../assets/backMenu.png')}
                style={{ height: 40, height: 40, marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('./../../assets/icon.png')}
              style={{ width: 35, height: 45, marginRight: 10 }}
            />
          </TouchableOpacity>
        ),
      });
    }, [navigation, route]);
    return (
      <userAccountTab.Navigator
        initialRouteName={route.params.item}
        initialLayout={{ width: Dimensions.get('window').width }}
        lazy={true}
        tabBarOptions={{
          activeTintColor: 'gold',
          inactiveTintColor: '#FFF',
          labelStyle: { fontSize: 14 },
          indicatorStyle: { borderColor: 'gold', backgroundColor: 'gold' },
          //labelStyle: {color: '#ffffff'},
          style: { backgroundColor: '#000000', width: '100%', color: '#000' },
        }}>
        {/* <userAccountTab.Screen
          name="Friends"
          component={UserFriends}
          options={{
            tabBarLabel: route.params.count.friend + ' Friends',
            tabBarColor: '#ffffff',
          }}
        /> */}
        <userAccountTab.Screen
          name="Followers"
          component={UserFollowers}
          options={{
            tabBarLabel: route.params.count.followers + ' Followers',
            tabBarColor: '#ffffff',
            // tabBarIcon: ({color}) => (
            //   // <MaterialCommunityIcons name="home" color={color} size={26} />
            //   <Live />
            // ),
          }}
        />
        <userAccountTab.Screen
          name="Following"
          component={UserFollowing}
          options={{
            tabBarLabel: route.params.count.following + ' Following',
            tabBarColor: '#ffffff',
            // tabBarIcon: ({color}) => (
            //   // <MaterialCommunityIcons name="home" color={color} size={26} />
            //   <Live />
            // ),
          }}
        />
      </userAccountTab.Navigator>
    );
  }
  function MyTabs({ navigation, route }) {
    React.useLayoutEffect(() => {
      const title = getHeaderTitle(route);
      // console.log(title);
      if (title == 'Profile') {
        navigation.setOptions({
          // headerTitle: title,
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerShown: true,
          headerTitleStyle: {
            fontWeight: 'semi-bold',
            color: '#FFFFFF',
            marginLeft: 0,
          },
          headerLeft: () => (
            <View style={{ flexDirection: 'row' }}>
              {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('./../../assets/backMenu.png')}
                  style={{height: 50, height: 50, marginTop: 10}}
                />
              </TouchableOpacity> */}
              <TouchableOpacity>
                <Image
                  source={require('./../../assets/icon.png')}
                  style={{ width: 35, height: 45, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          ),
        });
      } else {
        navigation.setOptions({ headerTitle: title, headerShown: false });
      }
    }, [navigation, route]);
    return (
      <Tab.Navigator
        initialRouteName="Dashboard"        
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#000',
          // inactiveBackgroundColor:'black',
          // activeBackgroundColor:'black',
          style: {
            backgroundColor: '#000',
            borderTopColor: '#000',
          },
        }}
        ViewStyle={{ backgroundColor: 'red' }}
      // style={{backgroundColor: '#000000'}}
      // tabStyle={{backgroundColor: '#000000'}}
      >
        <Tab.Screen
          name="Live"
          component={Dashboard}
          options={{
            headerLeft: null,
            tabBarIcon: ({ color }) => (
              <Image
                style={{
                  resizeMode: 'contain',
                  position: 'absolute',
                  height: 40,
                  width: 40,
                  zIndex: 999,
                }}
                source={require('./../../assets/ratu_icons/menu_home.png')}></Image>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="leaderboard"
          component={LeaderBoard}
          options={{
            tabBarLabel: 'Leaderboard',
            tabBarIcon: ({ color }) => (
              <Image
                style={{
                  resizeMode: 'contain',
                  position: 'absolute',
                  height: 40,
                  width: 40,
                  zIndex: 999,
                }}
                source={require('./../../assets/ratu_icons/menu_leader.png')}></Image>
            ),
          }}
        />
        <Tab.Screen
          name="Golive"
          component={GoLiveAddTitle}
          options={{
            tabBarLabel: 'Go live',
            tabBarIcon: ({ color }) => (
              <LinearGradient
                start={{ x: 0, y: 0, z: 1.5 }}
                end={{ x: 1, y: 1, z: 2 }}
                colors={['#FCEE10', '#CB8529', '#FFE600', '#C97E29', '#FCED00']}
                style={[styles1.acnBtn]}>
                <Image
                  source={require('./../../assets/ratu_icons/menu_live-1.png')}
                  style={{
                    width: 40,
                    height: 40,
                    position: 'relative',
                    margin: 0,
                    borderRadius: 50,
                  }}
                />
              </LinearGradient>
              // <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="message"
          component={MessageScreen}
          options={{
            tabBarLabel: 'Message',
            tabBarIcon: ({ color }) => (
              <Image
                style={{
                  resizeMode: 'contain',
                  position: 'absolute',
                  height: 40,
                  width: 40,
                  // zIndex: 999,
                  // borderRadius: 100,
                }}
                source={require('./../../assets/ratu_icons/menu_msg.png')}></Image>
            ),
          }}
        />
        <Tab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color }) => (
              <Image
                style={{
                  resizeMode: 'contain',
                  position: 'absolute',
                  height: 40,
                  width: 40,
                  // tintColor: '#acacac',
                  zIndex: 999,
                  // borderRadius: 100,
                }}
                source={require('./../../assets/ratu_icons/menu_profile1.png')}></Image>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  if (showLocationEnable === null) return null
  return (
    <NavigationContainer>
      <Stack.Navigator >
        {showLocationEnable ? (
          <Stack.Screen
            name="LocationEnable"
            component={LocationEnable}
            options={{
              headerLeft: null,
              headerShown: false,
            }}
          />
        ) : null}
        <Stack.Screen name="Profile" component={MyTabs} />
        <Stack.Screen
          name="PhoneAuthScreen"
          component={PhoneAuthScreen}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Login}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GoLiveProfileView"
          component={GoLiveProfileView}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Viewerslist"
          component={Viewerslist}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detailsprofile"
          component={Detailsprofile}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="Profile" component={MyTabs} /> */}
        <Stack.Screen
          name="DOB"
          component={DOB}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            title: 'Make a payment',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Image
                    source={require('./../../assets/icon.png')}
                    style={{ width: 35, height: 45, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />

       
        {/* <Stack.Screen
          name="Moments"
          component={Moments}
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="topup"
          component={TopupCrowns}
          options={{
            title: 'Topup Crowns',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                // onPress={() => navigation.goBack()}
                >
                  <Image
                    source={require('./../../assets/icon.png')}
                    style={{ width: 35, height: 45, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Withdraw"
          component={Withdraw}
          options={{
            title: 'Withdraw',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                // onPress={() => navigation.goBack()}
                >
                  <Image
                    source={require('./../../assets/icon.png')}
                    style={{ width: 35, height: 45, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="Streaminglog"
          component={Streaminglog}
          options={{
            title: 'Streaminglog',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                // onPress={() => navigation.goBack()}
                >
                  <Image
                    source={require('./../../assets/icon.png')}
                    style={{ width: 35, height: 45, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="PhoneBindScreen"
          component={PhoneBindScreen}
          options={{
            title: 'Mobile Binding',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                // onPress={() => navigation.goBack()}
                >
                  <Image
                    source={require('./../../assets/icon.png')}
                    style={{ width: 35, height: 45, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="OTP"
          component={PhoneAuthVerify}
          options={{
            title: 'Enter Verification Code',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#FFFFFF',
            },
          }}
        />
        <Stack.Screen
          name="GoLiveLiveStream"
          component={GoLiveLiveStream}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
          name="Stream"
          component={Stream}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="DetailedMoments"
          component={DetailedMoments}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GoLiveAddTitle"
          component={GoLiveAddTitle}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Ended"
          component={Ended}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen name="Info" component={userAccountTabs} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Support"
          component={Support}
          options={{
            headerTitle: 'Support',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerRight: () => (
              <Image
                source={require('./../../assets/icon.png')}
                style={{ width: 35, height: 45, marginRight: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Refer"
          component={Refer}
          options={{
            headerTitle: 'Refer Friend',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerRight: () => (
              <Image
                source={require('./../../assets/icon.png')}
                style={{ width: 35, height: 45, marginRight: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{
            headerTitle: 'Setting',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerRight: () => (
              <Image
                source={require('./../../assets/icon.png')}
                style={{ width: 35, height: 45, marginRight: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{
            headerTitle: 'WALLET',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerRight: () => (
              <Image
                source={require('./../../assets/icon.png')}
                style={{ width: 35, height: 45, marginRight: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Moments"
          component={Moments}
          options={{
            headerTitle: 'Moments',
            headerStyle: {
              backgroundColor: '#000000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 16,
            },
            headerRight: () => (
              <Image
                source={require('./../../assets/icon.png')}
                style={{ width: 35, height: 45, marginRight: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Viewer"
          component={Viewer}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LiveShow"
          component={LiveShow}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="swipeLive"
          component={swipeLive}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Goliveprivatepassword"
          component={Goliveprivatepassword}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="PublicLive"
          component={PublicLive}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Goliveprivatecrowns"
          component={Goliveprivatecrowns}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Earned"
          component={Earned}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerLeft: null,
            headerShown: false,
          }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles1 = StyleSheet.create({
  acnBtn: {
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    borderWidth: 5,
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: {
      x: 2,
      y: 0,
    },
    shadowRadius: 2,
    top: -20,
    padding: 20,
    display: 'flex',
  },
});
