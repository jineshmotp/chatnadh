// src/redux-reducer/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
// src/redux-actions/userActions.js
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT,
  
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,

} from '../redux-constants/userConstants';
import { auth } from '../config/firebase';

// Async action creator using Redux Thunk
export const login = (data) => async (dispatch) => {

    
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    // Query the Firebase Realtime Database to get user details
    const snapshot = await database()
      .ref('/users/')
      .orderByChild('emailId')
      .equalTo(data.emailId)
      .once('value');

    const userArray = snapshot.val();

    if (!userArray) {
      throw new Error('User not found');
    }

    // Find the user based on email
    const userId = Object.keys(userArray)[0]; // Assuming there's only one user with this email

    const user = userArray[userId];

    // Check if the password matches
    if (user.password !== data.password) {
      throw new Error('Invalid password');
    }
    
    // Store the user data in AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(user));
       
    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.log('Authentication error:', error);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });

    // Rethrow the error to be caught by the calling code (e.g., login screen)
    throw error;
  }
};


export const logout = () => async (dispatch) => {
  
  try {
   
    //await auth.signOut();
    dispatch({ type: USER_LOGOUT });
    await AsyncStorage.removeItem('user');

    return Promise.resolve(); // Resolve the promise if logout is successful
  } catch (error) {
    return Promise.reject(error); // Reject the promise if logout fails
  }

};

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



export const register = (data) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    await database()
      .ref('/users/' + data.id)
      .set(data);
    
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.log("Database error:", error);
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};