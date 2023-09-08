// src/Redux/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

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

  USER_UPDATE_ONLINE_STATUS

} from './userConstants';
import { auth } from '../config/firebase';



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

//#########################################################


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
    const snapshot = await database()
      .ref('/users/')
      .orderByChild('emailId')
      .equalTo(data.emailId)
      .once('value');

    const userArray = snapshot.val();
   
    const userId = Object.keys(userArray)[0];
    const user = userArray[userId];

    if (!userArray) {
      throw new Error('User not found');
          }
    if (user.password !== data.password) 
    {
      throw new Error('Invalid password');     
    }
   

    await database().ref(`/users/${user.id}`).update({ onlineStatus: true });
    await dispatch({ type: USER_UPDATE_ONLINE_STATUS, payload: true });
   
    await dispatch({ type: USER_LOGIN_REQUEST });
        
    await AsyncStorage.setItem('user', JSON.stringify(user));
    
    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
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

//#############################################################

export const register = (data) => async (dispatch) => {
  try {
    // Check if a user with the same email already exists
    const snapshot = await database().ref('/users').orderByChild('emailId').equalTo(data.emailId).once('value');
    
    if (snapshot.exists()) {
      throw new Error('User with the same email already exists');
    }
    else
    {
      dispatch({ type: USER_REGISTER_REQUEST });
      await database().ref('/users/' + data.id).set(data);      
    }
    
    
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    
    
  } catch (error) {
    console.log("Database error:", error);
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};


export const resetdata = () => async (dispatch) => {

  dispatch({ type: USER_REGISTER_RESET });

};


//############################################




