import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Navigator from './src/Navigator/Navigator';
import SignOutNavigator from './src/Navigator/SignOutNavigator';
import { useAuth } from './src/hooks/Auth';
import { addUser } from './src/utils/api';


const App = () => {
  const auth = useAuth();
  const addUserToDB = async (data) => {
    try {      
      return await addUser(data);
    } catch (error) {
      console.log('Error while adding user app js', error);
    }
  };

  // console.log('======================');
  // console.log('userr', auth);
  // console.log('userr', auth?.user);
  // console.log('======================');
  if (auth?.user != null) {
    console.log('APP Js file user json', auth?.user.user);
    const response = addUserToDB(auth?.user);
  }
  // const addUserToDB = async () => {
  //   try {
  //     await addUser({
  //       uid:uid,
  //       phone:phoneNumber,
  //     });
  //   } catch (error) {
  //     console.log('Error while adding user', error);
  //   }
  // };
 
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);
  GLOBAL.XMLHttpRequest =
    GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  //if (initializing) return null;
  if (auth?.user != null)    
    return <Navigator user={auth?.user} />;
  return <SignOutNavigator />;
 
};
export default App;
