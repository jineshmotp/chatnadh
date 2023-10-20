// src/Redux/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import { auth } from '../config/firebase';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store'; 

import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_DATA_UPDATED,
  USER_LOGIN_FAIL, 

  USER_LOGOIN_BUTTON_LOADING,
  USER_LOGOIN_BUTTON_RESET,
  
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT,
  
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,

  USER_INDIVIDUAL_REQUEST,
  USER_INDIVIDUAL_FAIL,
  USER_INDIVIDUAL_SUCCESS,
  USER_INDIVIDUAL_RESET,

  USER_UPDATE_ONLINE_STATUS,

  OTP_REQUEST,
  OTP_FAIL,
  OTP_SUCCESS,
  OTP_RESET,

  OTP_VALIDATION_REQUEST,
  OTP_VALIDATION_FAIL,
  OTP_VALIDATION_SUCCESS,
  OTP_VALIDATION_RESET,


} from './userConstants';
import { Alert } from 'react-native';


// Define the types for your action and thunk
type UserActions =
  | { type: typeof USER_REGISTER_REQUEST }
  | { type: typeof USER_REGISTER_SUCCESS; payload: UserData }
  | { type: typeof USER_REGISTER_FAIL; payload: string }
  | { type: typeof USER_REGISTER_RESET };

type RegisterAction = ThunkAction<void, RootState, null, UserActions>;

export const initializeUserDataListener = () => async (dispatch, getState) => { 
  const user = getState().userLogin.user;

  if (user) {
    const userRef = database().ref(`/users/${user.id}`);
    
    // Set up a listener for real-time data updates
    userRef.on('value', (snapshot) => {
      const userData = snapshot.val();
      dispatch({ type: 'USER_DATA_UPDATED', payload: userData });
      // Save the updated data to AsyncStorage
      AsyncStorage.setItem('user', JSON.stringify(userData));
    });

    // Return a function to unsubscribe when needed
    return () => userRef.off();
  }
};

//######################### Updateuser Token ################################


export const updateUserToken = (userId: string, token: string) => async (dispatch) => {
  try {
    const userRef = database().ref(`/users/${userId}`);
    userRef.once('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        if (!userData.fcmToken) {
          // If the user does not have an fcmToken, add it
          userRef.update({ fcmToken: token });
        } else if (userData.fcmToken !== token) {
          // If the user's fcmToken is different from the new token, update it
          userRef.update({ fcmToken: token });
        }
      }
    });
  } catch (error) {
    console.error('Error updating user token:', error);
  }
};



//########################################################################
export const updateOnlineStatus = (isOnline: boolean) => async (dispatch, getState) => {
   
  console.log('updateOnlineStatus');
  
  const user = getState().userLogin.user;
  if (user) {
    try {
      console.log('updateOnlineStatus');
      await database().ref(`/users/${user.id}`).update({ onlineStatus: isOnline });

      // Dispatch the action to update the store
      dispatch({ type: USER_UPDATE_ONLINE_STATUS, payload: isOnline });
    } catch (error) {
      console.error('Error updating online status:', error);
    }
  }
};

//###############################################################

export const login = (data) => async (dispatch) => {
  try {
    // Step 1: Authenticate the user with Firebase Authentication
    const userCredential = await auth.signInWithEmailAndPassword(
      data.emailId,
      data.password
    );

    //const userCredential = await auth.signInWithPhoneNumber('+48729667992')


    // Step 2: Get the user's UID from Firebase Authentication
    const userUid = userCredential.user.uid;

    // Step 3: Fetch the user's data from the Realtime Database using the UID
    const userSnapshot = await database()
      .ref(`/users/${userUid}`)
      .once('value');

    const userData = userSnapshot.val();

    if (!userData) {
      throw new Error('User not found');
    }

    // Step 4: Update the user's online status in the Realtime Database
    await database().ref(`/users/${userUid}`).update({ onlineStatus: true });

    // Step 5: Dispatch Redux actions and save user data to AsyncStorage
    dispatch({ type: USER_UPDATE_ONLINE_STATUS, payload: true });
    dispatch({ type: USER_LOGIN_REQUEST });
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: userData });
    dispatch(initializeUserDataListener());
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};


export const loginbuttonload = () => async (dispatch) => {

  dispatch({ type: USER_LOGOIN_BUTTON_LOADING });

};

export const loginbuttonreset = () => async (dispatch) => {

  dispatch({ type: USER_LOGOIN_BUTTON_RESET });

};

//######################## LOGOUT 

export const logout = () => async (dispatch) => {
  
  try {
   
   
    await dispatch(updateOnlineStatus(false)); 
    await AsyncStorage.removeItem('user');
     
    await auth.signOut(); 
    dispatch({ type: USER_LOGOUT });
    return Promise.resolve(); // Resolve the promise if logout is successful
  } catch (error) {
    return Promise.reject(error); // Reject the promise if logout fails
  }
};

//#################################################################

export const checkLoginStatus = () => async (dispatch) => { // Wrap the action creator in an async function
  try {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user }); // Dispatch the action directly
      return true; // User is logged in
    } else {
      return false; // User is not logged in
    }
  } catch (error) {
    console.log('Error reading user data from AsyncStorage:', error);
    throw error;
  }
};
//######################### OPT LOGIN/ REGISTER ####################

export const OTPPhoneAuth = (Phonenumber) => async (dispatch) => {
  
try {
  //console.log('phone number is : ',Phonenumber);
    dispatch({ type: OTP_REQUEST });
    const confirmation = await auth.signInWithPhoneNumber(Phonenumber);

    dispatch({ type: OTP_SUCCESS, payload: confirmation });

    //console.log(confirmation)
  } catch (error) {
    console.log(error);
    dispatch({ type: OTP_FAIL, payload: error.message });
  }


};

export const OTPValidation = (confirmation,otpval) => async (dispatch) => {

      dispatch({ type: OTP_VALIDATION_REQUEST });

      confirmation
          .confirm(otpval)
          .then((userCredential) => {
            // Phone number verified successfully
            const user = userCredential.user;
            console.log(userCredential);
            console.log('\nuser :',user);
            //Alert('\nuser uid :',user);
            dispatch({ type: OTP_VALIDATION_SUCCESS, payload: user });

          })
          .catch((error) => {
            dispatch({ type: OTP_VALIDATION_FAIL, payload: error.message });
          });
  
};

//#############################################################
interface UserData {
  name: string;
  emailId: string;
  password: string;
  about: string;
  notification: string;
  hasStory: boolean;
  onlineStatus: boolean;
  accountactivation: string;
  img: string;
}

export const register = (data: UserData): RegisterAction => async (dispatch) => {
  try {

    dispatch({ type: USER_REGISTER_REQUEST });
    // Attempt to sign in with the user's email and password to check if the user exists
    //await auth.signInWithEmailAndPassword(data.emailId, data.password);
   
    await auth.signInWithEmailAndPassword(data.emailId, data.password);
    //await auth.signInWithPhoneNumber('+1 650-555-3434');

    // If the sign-in succeeds, it means the user already exists
    throw new Error('User with the same email already exists');

  } catch (signInError) {
    if (signInError.code === 'auth/user-not-found') {
      // If the error is 'auth/user-not-found', it means the user doesn't exist, so proceed with user creation
      const userRecord = await auth.createUserWithEmailAndPassword(
        data.emailId,
        data.password
      );

      // Get the UID of the newly created user
      const userUid = userRecord.user.uid;
      console.log(userUid)
     

      // Store user data in the Realtime Database
      await database()
        .ref(`/users/${userUid}`)
        .set({
          id: userUid,
          name: data.name,
          emailId: data.emailId,
          password: data.password,
          about: data.about,
          notification: data.notification,
          hasStory: data.hasStory,
          onlineStatus: data.onlineStatus,
          accountactivation: data.accountactivation,
          img: data.img,
          fcmToken: "", 
        });

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } else {
      // Handle other sign-in errors (e.g., invalid email or password) here
      console.error('Sign-in error:', signInError);
      //throw signInError;
      dispatch({ type: USER_REGISTER_FAIL, payload: signInError });
    }
  }
};




export const resetdata = () => async (dispatch) => {

  dispatch({ type: USER_REGISTER_RESET });

};


//############################################




export const userIndividual = (individualId) => async (dispatch) => {
  dispatch({ type: USER_INDIVIDUAL_REQUEST });
  
  try {
    // Set up a listener for real-time updates on the user with the specified ID
    const userRef = database().ref(`/users/${individualId}`);
    
    userRef.on('value', (snapshot) => {
      const userData = snapshot.val();
      
      if (userData) {
        dispatch({ type: USER_INDIVIDUAL_SUCCESS, payload: userData });
      } else {
        // Handle the case where the user with the specified ID does not exist
        dispatch({ type: USER_INDIVIDUAL_FAIL, payload: 'User not found' });
      }
    });
    
    // Return a function to unsubscribe from the real-time listener when needed
    return () => userRef.off();
  } catch (error) {
    console.log("Database error:", error);
    dispatch({ type: USER_INDIVIDUAL_FAIL, payload: error.message });
  }
};