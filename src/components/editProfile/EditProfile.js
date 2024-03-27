import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import styles from './EditProfileStyle';
import CustomFields from './CustomField';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import users from '../../storage/storage';
import { useAuth } from '../../hooks/Auth';
//import {useAge} from '../../components/login-auth/age-validate'
import { useNavigation } from '@react-navigation/native';
import { updateUser, selectUser, addUser } from '../../utils/api';
import PhotoUpload from 'react-native-photo-upload';
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
// export default class EditProfile extends Component {
export default function EditProfile(props) {
  // const [state, setState] = useState(  
  //   {
  //     today: new Date(),
  //     country: '',
  //     state: '',
  //     phoneNumberVal: '',
  //     femaleImage: require('../../../assets/Female-i-con.png'),
  //     maleImage: require('../../../assets/Men-I-con.png'),
  //     onClickMale: require('../../../assets/Men-tik.png'),
  //     onClickFemale: require('../../../assets/Female-tik.png'),
  //     onMale: false,
  //     date: '',
  //     onFemale: true,
  //     name: '',
  //     email: '',
  //     gender: '',
  //     photo: null,
  //   }
  // ) 
  const navigation = useNavigation();
  const auth = useAuth();
  const [today, setToday] = useState(new Date());
  const [country, setCountry] = useState('');
  const [newState, setNewState] = useState('');
  const [city, setCity] = useState('');
  const [phoneNumberVal, setPhoneNumberVal] = useState('');
  const [femaleImage, setFemaleImage] = useState(require('../../../assets/Female-i-con.png'));
  const [maleImage, setMaleImage] = useState(require('../../../assets/Men-I-con.png'));
  const [onClickMale, setOnClickMale] = useState(require('../../../assets/Men-tik.png'));
  const [onClickFemale, setOnClickFemale] = useState(require('../../../assets/Female-tik.png'));
  const [onMale, setOnMale] = useState(true);
  const [onFemale, setOnFemale] = useState(true);
  const [date, setDate] = useState('');
  const [name, setName] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [gender, setGender] = useState('');
  const [udob, setUdob] = useState('');
  const [uage, setUage] = useState('');
  const [uuserno, setUuserno] = useState('');
  // const handleChoosePhoto = () => {
  //   const options = {
  //     noData: true,
  //   }
  //   ImagePicker.launchImageLibrary(options, response => {
  //     if (response.uri) {
  //       photo({ photo: response })
  //     }
  //   })
  // }
  // Backend
  // handleUploadPhoto = () => {
  //   fetch("http://localhost:3000/api/upload", {
  //     method: "POST",
  //     body: createFormData(photo, { userId: "123" }) //payload
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log("upload succes", response);
  //       alert("Upload success!");
  //       setState({ photo: null });
  //     })
  //     .catch(error => {
  //       console.log("upload error", error);
  //       alert("Upload failed!");
  //     });
  // };
  const updateInfo = () => {
    // props.navigation.navigate('Dashboard');
    // alert(date)
  }
  const editUser = () => {
    props.navigation.goBack();
  }
  const femalebtn = () => {
    if (!onFemale) {
      setOnFemale(true);
    } else {
      setOnFemale(false);
      setOnMale(true);
      setGender('Female');
    }
  }
  const maleBtn = () => {
    if (!onMale) {
      setOnMale(true);
    } else {
      setOnMale(false);
      setOnFemale(true);
      setGender('Male');
    }
  }
  // render() {
  // const {today, photo} = state;
  var minYear = today.getFullYear() - 90;
  let minDate = Moment('Jan-01-' + minYear).format('MM-DD-YYYY');
  //let maxDate = Moment(today).format('MM-DD-YYYY');
  let maxDate = udob;
  const { email, displayName } = auth?.user;
  const { uid, photoURL, phoneNumber } = auth?.user;
  React.useLayoutEffect(() => {
    //adduserDetails();
    fetchuserDetails();
  }, []);
  //   async function adduserDetails(){
  //     try{
  //       await addUser({
  //         uid:uid,
  //         phone:phoneNumber
  //       })
  //     }
  //   catch (error) {
  //     console.log('There was an error adding user to db:',);
  //   }
  // }
  async function fetchuserDetails() {
    /*for getting user info*/
    console.log('select user');
    try {
      const userinfo = await selectUser({ uid });
      if (userinfo.error) {
        console.log('error');
      } else {
        console.log('Data from db', userinfo);
        setName(userinfo[0].name);
        setNewEmail(userinfo[0].email);
        setCountry(userinfo[0].country);
        setNewState(userinfo[0].address);
        setPhoneNumberVal(userinfo[0].phone);
        setDate(userinfo[0].date);
        setUuserno(userinfo[0].userno);
        setUdob(userinfo[0].dob);
        setUage(userinfo[0].age);
        setGender(userinfo[0].gender);
        setCity(userinfo[0].city);
        console.log(userinfo[0].gender);
        console.log(gender);
        if (userinfo[0].gender == 'Male') {
          setOnMale(false);
          setOnFemale(true);
        }
        if (userinfo[0].gender == 'Female') {
          setOnFemale(false);
          setOnMale(true);
        }
      }
    } catch (error) {
      console.log('Error while fetching user data', error);
    }
  }

  const checkTextInput = () => {
    if (!name.trim()) {
      // alert('Please Enter the amount for withdrawal');
      ToastAndroid.show('Please Enter the name', ToastAndroid.SHORT);
      return;
  }
}

  const UpdateUserDetails = async () => {
    const age = users[0];
    
    const dob = users[1];
    
    const userno = JSON.stringify(users[2]);
    
    /*for updating user */
   
    try {
      await updateUser({ uid, name, phoneNumberVal, gender, newEmail, newState, city, country, age, dob, udob, uage, email, displayName, phoneNumber });
      ToastAndroid.show('Saved Successfully!!!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Error while adding details', error);
    }
    console.log('sai');
    navigation.navigate('Profile');
  }
  return (
    <View style={styles.container}>
      <View style={styles.TopContainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image
              source={CustomFields.variables.backMenu}
              style={styles.logo}
            />
          </TouchableOpacity>
          <Text style={styles.skip}>{CustomFields.variables.title}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Image
            source={CustomFields.variables.Logo}
            style={styles.notification}
          />
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.viewStyle}>
          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <Button title="Choose Photo" onPress={handleChoosePhoto()} />
        </View> */}
          <View style={styles.textFiledView}>
            <View style={styles.viewStyles}>
              <Image
                source={CustomFields.variables.editUser}
                style={styles.textFieldInput}
              />
              <TextInput
                style={styles.PhoneNumber}
                placeholder={displayName}
                placeholderTextColor="#aaa"
                value={name}
                onChangeText={(name) => {
                  setName(name);
                }}
              />
            </View>
          </View>
          {/* <View style={styles.textFiledView}>
            <View style={styles.viewStyles}>
              <Image
                source={CustomFields.variables.editEmail}
                style={styles.textFieldInput}
              />
              <TextInput
                style={styles.PhoneNumber}
                placeholder={email}
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={newEmail}
                onChangeText={(newEmail) => {
                  setNewEmail(newEmail);
                }}
              />
            </View>
          </View> */}
          {/* <View style={styles.textFiledView}>
            <View style={styles.viewStyles}>
              <Image
                source={CustomFields.variables.editMobile}
                style={styles.textFieldInput}
              />
              <TextInput
                style={styles.PhoneNumber}
                placeholder={phoneNumber}
                placeholderTextColor="#aaa"
                keyboardType="phone-pad"
                value={phoneNumberVal}
                onChangeText={(phoneNumberVal) => {
                  setPhoneNumberVal(phoneNumberVal);
                }}
                maxLength={13}
                // editable={false : true}
              />
            </View>
          </View> */}
          <View style={styles.genderTextView}>
            <Image
              source={CustomFields.variables.editGender}
              style={styles.textFieldInput}
            />
            <Text style={{ color: '#fff', marginLeft: 10 }}>Gender</Text>
          </View>
          <View style={styles.genderView}>
            <View style={styles.genderImageView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={maleBtn}>
                {onMale ? (
                  <Image
                    source={maleImage}
                    style={styles.unselectedGender}
                  />
                ) : (
                  <Image
                    source={onClickMale}
                    style={styles.selectedGender}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.genderText}>Male</Text>
            </View>
            <View style={styles.genderImageView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={femalebtn}>
                {onFemale ? (
                  <Image
                    source={femaleImage}
                    style={styles.unselectedGender}
                  />
                ) : (
                  <Image
                    source={onClickFemale}
                    style={styles.selectedGender}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.genderText}>Female</Text>
            </View>
          </View>
          <View style={styles.pickerView}>
            <View style={styles.viewStyles}>
              <Image
                style={styles.iconRight}
                source={require('../../../assets/Calenderr.png')}
              />
              <DatePicker
                style={{ width: 100, height: 43 }}
                date={date}
                mode="date"
                showIcon={false}
                // ref={dateRef => dateRef = dateRef}
                placeholder={users[1]}
                format="DD-MM-YYYY"
                minDate={minDate}
                maxDate={maxDate}
                allowFontScaling={true}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    alignItems: 'flex-start',
                    borderWidth: 0,
                  },
                  placeholderText: {
                    fontSize: 14,
                    color: '#bcbcbc',
                  },
                  dateText: {
                    fontSize: 15,
                    // fontFamily: fonts.PoppinsRegular,
                    color: '#fff',
                  },
                  // ... You can check the source to find the other keys.
                }}
              // onDateChange={(date) => {
              //   setState({date: date});
              // }}
              // ref={(picker) => {
              //   datePicker = picker;
              // }}
              />
            </View>
            {/* <TouchableOpacity onPress={() => datePicker.onPressDate()}>
              <Image
                style={styles.icon}
                source={require('../../../assets/Calenderr.png')}
              />
            </TouchableOpacity> */}
          </View>
          <View style={styles.textFiledView}>
            <View style={styles.viewStyles}>
              <Image
                source={CustomFields.variables.editCountry}
                style={styles.textFieldInput}
              />
              <TextInput
                style={styles.PhoneNumber}
                placeholder={'City'}
                placeholderTextColor="#aaa"
                keyboardType="default"
                value={city}
                onChangeText={(city) => {
                  setCity(city);
                }}
              />
            </View>
          </View>
          <View style={styles.textFiledView}>
            <View style={styles.viewStyles}>
              <Image
                source={CustomFields.variables.editCountry}
                style={styles.textFieldInput}
              />
              <TextInput
                style={styles.PhoneNumber}
                placeholder={'Country'}
                placeholderTextColor="#aaa"
                keyboardType="default"
                value={country}
                onChangeText={(country) => {
                  setCountry(country);
                }}
              />
            </View>
          </View>
          <View style={styles.textFiledView}>
            <View style={styles.viewStyles}>
              <Image
                source={CustomFields.variables.editState}
                style={styles.textFieldInput}
              />
              <TextInput
                style={styles.PhoneNumber}
                placeholder={'State'}
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                value={newState}
                onChangeText={(newState) => {
                  setNewState(newState);
                }}
              />
            </View>
          </View>
          <LinearGradient
            start={{ x: 0, y: 0, z: 1.5 }}
            end={{ x: 1, y: 1, z: 2 }}
            colors={['#FCEE10', '#CB8529', '#FFE600', '#C97E29', '#FCED00']}
            style={styles.PhoneContainer}>
            <TouchableHighlight
              activeOpacity={0.9}
              underlayColor="gold"
              onPress={()=>{
                console.log('name on submit',name);
                if (name == null || name == '') {
                  ToastAndroid.show('Please Enter the name', ToastAndroid.SHORT);
              }else{
                if (name.length >= 3) {
                UpdateUserDetails()
                console.log('name on submit',name.length)
              }else{
                ToastAndroid.show('Please Enter a valid name', ToastAndroid.SHORT);
              }
            }
            }}
              style={styles.PhoneContainer}
            >
              <Text style={styles.signIn}>
                {CustomFields.variables.submit}
              </Text>
            </TouchableHighlight>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
  // }
}
