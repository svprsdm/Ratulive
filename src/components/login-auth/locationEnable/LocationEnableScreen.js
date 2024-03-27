import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, TouchableHighlight, Platform } from 'react-native';
import CustomFields from './CustomFields';
import LinearGradient from 'react-native-linear-gradient';
import styles from './LocationEnableScreenStyle';
import RNSettings from 'react-native-settings';
import { PermissionsAndroid } from 'react-native';
// import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { updateUser, selectUser } from '../../../utils/api';
import { useAuth } from '../../../hooks/Auth';
// Initialize the module (needs to be done only once)
Geocoder.init("AIzaSyDn9BnRvDJSlM7yAjJWMJAfIA-xIBxR-FM"); // use a valid API key
// With more options
// Geocoder.init("AIzaSyC_Hw8FDM-01kZ_HCzSkxiIAZ4ED3w_EEA", {language : "en"}); // set the language
export default function LocationEnable(props) {
  const auth = useAuth();
  const { uid } = auth?.user;
  const [latitude, setlatitude] = React.useState(0);
  const [longitude, setlongitude] = React.useState(0);
  const [error, seterror] = React.useState(null);
  const [Address, setAddress] = React.useState(null);
  const [isloading, setisloading] = React.useState();
  const [selectedLocation, setselectedLocation] = React.useState();
  const [currentLongitude, setcurrentLongitude] = React.useState();
  const [currentLatitude, setcurrentLatitude] = React.useState();
  const [name, setName] = React.useState(null);
  React.useEffect(() => {
    requestLocationPermission();
    checkAndroidPermissions();
  })

  React.useLayoutEffect(() => {
    //adduserDetails();
    fetchuserDetails();
  }, []);


  async function fetchuserDetails() {
    /*for getting user info*/    
    try {     
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        // console.log('Data from db', userinfo);
        setName(userinfo[0].name);
        
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        // alert("You can use the location");
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async function checkAndroidPermissions() {
      try {
        const camera = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'OpenVidu needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const audio = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Audio Permission',
            message: 'OpenVidu needs access to your microphone',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const storage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'STORAGE',
            message: 'OpenVidu  needs access to your storage ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (camera === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('You can use the camera');
        } else {
          // console.log('Camera permission denied');
        }
        if (audio === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('You can use the audio');
        } else {
          // console.log('audio permission denied');
        }
        if (storage === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('You can use the storage');
        } else {
          // console.log('storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

  function fetchAddress  (lat, long)  {
    try {
      setisloading(true);
      const mapKey = 'AIzaSyDn9BnRvDJSlM7yAjJWMJAfIA-xIBxR-FM';
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=${mapKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log('adersws', responseJson);
          const userLocation = responseJson.results[0].formatted_address;
          setselectedLocation(userLocation);
          setcurrentLongitude(long);
          setcurrentLatitude(lat);
          setisloading(false);
          
          var stateName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name;
          var cityName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'locality').length > 0)[0].long_name;
          var countryName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name;

          UpdateUserDetails(stateName, cityName, countryName);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) { }
  };
  async function UpdateUserDetails(stateName, cityName, countryName) {
    
    try {
      const location = await updateUser({ uid, newState: stateName, city: cityName, country: countryName });
      if (location.error) {
        console.log('error');
      } else {
        props.navigation.navigate('Profile');
      }
      
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }

  function fetchAddresss (lat, long) {
    try {
      setisloading(true);
      const mapKey = 'AIzaSyDn9BnRvDJSlM7yAjJWMJAfIA-xIBxR-FM';
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${long}&key=${mapKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log('adersws', responseJson);
          const userLocation = responseJson.results[0].formatted_address;
          setselectedLocation(userLocation);
          setcurrentLongitude(long);
          setcurrentLatitude(lat);
          setisloading(false);
          
          var stateName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name;
          var cityName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'locality').length > 0)[0].long_name;
          var countryName = responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name;

          UpdateUserDetailss(stateName, cityName, countryName);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) { }
  };

  async function UpdateUserDetailss(stateName, cityName, countryName) {
    //console.log('update same user UpdateUserDetailss');
    try {
      const location = await updateUser({ uid, newState: stateName, city: cityName, country: countryName });
      if (location.error) {
        console.log('error');
      } else {
      //props.navigation.navigate('EditProfile');
      }
    } catch (error) {
      console.log('Error while adding details', error);
    }
  }


  async function locationEnabled  ()  {
    // console.log(" Location Line 1")
    // const users =  fetchuserDetails();
    
    if(name === null || typeof name === "undefined"){
      Geolocation.getCurrentPosition(
        (position) => {
          //console.log("Position", position);
          // fetchAddresss(
          //   position.coords.latitude,
          //   position.coords.longitude,
          // );
          Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            //console.log("json", json);
            var addressComponent = json.results[0].address_components[0];
            // var location = json.results[0];
            var location = json.results[0].geometry.location;
            var stateName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name;
            var cityName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'locality').length > 0)[0].long_name;
            var countryName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name;
            // console.log("Adress Component", addressComponent);
            
            UpdateUserDetailss(stateName, cityName, countryName);
           
            setAddress(addressComponent);
            // console.log(addressComponent);
            props.navigation.navigate('EditProfile');
          })
          .catch(error => console.warn(error));
        },
      );
      // props.navigation.navigate('EditProfile');
    }else{
      RNSettings.getSetting(RNSettings.LOCATION_SETTING).then((result) => {
        if (result == RNSettings.ENABLED) {
          
          //props.navigation.navigate('Dashboard');
          //props.navigation.navigate('EditProfile');
          Geolocation.getCurrentPosition(
            (position) => {
              //console.log("Position", position);
              // fetchAddress(
              //   position.coords.latitude,
              //   position.coords.longitude,
              // );
              Geocoder.from(position.coords.latitude, position.coords.longitude)
              .then(json => {
               
                var addressComponent = json.results[0].address_components[0];
                // var location = json.results[0];
                var location = json.results[0].geometry.location;
                var stateName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name;
                var cityName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'locality').length > 0)[0].long_name;
                var countryName = json.results[0].address_components.filter(x => x.types.filter(t => t == 'country').length > 0)[0].long_name;
                // console.log("Adress Component", addressComponent);
               
                UpdateUserDetails(stateName, cityName, countryName);
                setAddress(addressComponent);
                // console.log(addressComponent);
              })
              .catch(error => console.warn(error));
            },
          );
          // props.navigation.navigate('EditProfile');
          
        }
        
        else {
          console.log('Location is disenabled');
          Platform.select({
            ios: () => Linking.openURL('App-Prefs:LOCATION_SERVICES'),
            android: () =>
              RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                interval: 10000,
                fastInterval: 5000,
              })
                .then((data) => {
                  console.log({ success: data });
                })
                .catch((err) => {
                  console.log({ error: err });
                }),
          })();
        }
      });
    }

    
  };
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
      <View style={styles.locationlogoView}>
        <Image
          source={CustomFields.variables.location}
          style={styles.locationImage}
        />
        <Text style={styles.noGPS}>{CustomFields.variables.noGPS}</Text>
        <Text style={styles.noGPS}>
          {' '}
          {'Plaese check for location \n permission'}
        </Text>
      </View>
      <View style={styles.enableView}>
        <LinearGradient
          start={{ x: 0, y: 0, z: 1.5 }}
          end={{ x: 1, y: 1, z: 2 }}
          colors={['#FCEE10', '#CB8529', '#FFE600', '#C97E29', '#FCED00']}
          style={styles.loactioContainer}>
          <TouchableHighlight
            activeOpacity={0.9}
            underlayColor="gold"
            style={styles.loactioContainer}
            onPress={locationEnabled}
          >
            <Text style={styles.enableTxt}>
              {CustomFields.variables.PhoneNumber}
            </Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    </View>
  );
}