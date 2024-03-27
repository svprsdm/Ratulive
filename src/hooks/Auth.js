import React, { useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Navigator from '../Navigator/Navigator';
import SignOutNavigator from '../Navigator/SignOutNavigator';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { addUser } from '../utils/api';
// import { AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  // Vinod Firebase
  // webClientId: '814187142808-n7tr56f1tpd3s44lbqlc6fl8bho0e5vt.apps.googleusercontent.com',
  // Ratu Firebase
  webClientId: '1091287163056-365rkd9nvrel70ahsdagbfeh55n9mjk1.apps.googleusercontent.com',
  // client ID of type WEB for your server(needed to verify user ID and offline access)
  offlineAccess: true,
  // if you want to access Google API on behalf of the user FROM YOUR SERVER
  forceCodeForRefreshToken: true,
  // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '',
  // [Android] specifies an account name on the device that should be used
});
//Import Facebook Login
// import {
//   LoginManager,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
// } from 'react-native-fbsdk';
const DEFAULT_AUTH = {
  user: null,
  isInitialized: false,
};
// export const userId=   auth?.().currentUser.uid;

const AuthContext = React.createContext(DEFAULT_AUTH);
export function useAuth() {
  return React.useContext(AuthContext);
}
export const useSignOut = () => {
  return auth().signOut();
};
const addUserToDB = async (data) => {
  console.log('Authentication data AUTH js',data.user)
  try {
    console.log('Authentication data AUTH js try block',data)
    return await addUser(data);
  } catch (error) {
    // console.log('Error while adding user', error);
  }
};
// export const facebookLogIn = async () => {
//   // LoginManager.logOut();
//   LoginManager.logInWithPermissions(['public_profile', 'email']).then(
//     (result) => {
//       if (result.isCancelled) {
//         // console.log('login Cancelled');
//       } else {
//         AccessToken.getCurrentAccessToken().then(async (data) => {
//           // console.log('fb response call', data.accessToken);
//           // Adding the facebook data into firebase
//           const facebookCredential = await auth.FacebookAuthProvider.credential(
//             data.accessToken,
//           );
//           const userData = await auth().signInWithCredential(
//             facebookCredential,
//           );
//           // console.log({userData});
//           let accesToken = data.accessToken;
//           const responseInfoCallback = (error, result) => {
//             if (error) {
//               // console.log('fb response call', error);
//             } else {
//               //auth().signInWithCredential(facebookCredential);
//               // console.log('fb response call', result);
//             }
//           };
//           const infoRequest = new GraphRequest(
//             '/me',
//             {
//               accessToken: accesToken,
//               parameters: {
//                 fields: {
//                   string: 'email,name,first_name,middle_name,last_name',
//                 },
//               },
//             },
//             responseInfoCallback,
//           );
//           new GraphRequestManager().addRequest(infoRequest).start();
//         });
//       }
//     },
//     (error) => {
//       // console.log('Login fail with error:', error);
//     },
//   );
// };
export const db = firestore();
export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [userId, setUserId] = React.useState(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  React.useEffect(() => {
    let done = false;
    const unsubscribe = auth().onAuthStateChanged(async (usr) => {``
      if (usr) {
        window.FIREBASE_AUTH_TOKEN = await usr.getIdToken();
        if (!done) {
          const id = userId ;
          // || (await AsyncStorage.getItem('userId'));
          setUser(usr);
          setUserId(id);
        }
      } else {
        window.FIREBASE_AUTH_TOKEN = undefined;
        if (!done) {
          setUser(null);
        }
      }
      if (!done) {
        setIsInitialized(true);
      }
    });
    return () => {
      done = true;
      unsubscribe()
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    const unsubscribe = auth?.().onIdTokenChanged(async (usr) => {
      if (usr) {
        window.FIREBASE_AUTH_TOKEN = await usr.getIdToken();
      } else {
        window.FIREBASE_AUTH_TOKEN = undefined;
      }
    });
    return () => unsubscribe();
  }, []);
  const googleSignIn = async () => {
    // console.log('welcome ');
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      //console.log({userInfo: info});
      // Create a Google credential with the token
     
      const googleCredential = auth.GoogleAuthProvider.credential(info.idToken);
      
      const result = await auth().signInWithCredential(googleCredential);
      // console.log('welcome test');
      // console.log({
      //   User: result.additionalUserInfo.isNewUser ? 'New User' : 'Old User',
      // });
      // console.log('welcome test');
      
      //addd user to database
      const response = await addUserToDB(result?.user);
      
      if (response) {
        setUserId(response?.id);
        // await AsyncStorage.setItem('userId', response?.id);
      }
      //setUserInfo(info);
    } catch (error) {
      // console.log({"error": error});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const googleSignOut = async () => {
    // console.log('inside signout');
    try {
      // await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      setUser(null);
      setUserId(null);
      // AsyncStorage.clear();
      //setUserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      // console.error(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...DEFAULT_AUTH,
        user,
        userId,
        isInitialized,
        googleSignOut,
        googleSignIn,
      }}>
      {isInitialized ? children : <SignOutNavigator />}
    </AuthContext.Provider>
  );
}
