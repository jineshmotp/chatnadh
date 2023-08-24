// src/redux-reducer/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
// src/redux-actions/userActions.js
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT,
  
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,

} from '../redux-constants/userConstants';
import { auth } from '../config/firebase';

// Async action creator using Redux Thunk
export const login = (data) => async (dispatch) => {
  
  try {
    const snapshot = await database()
      .ref('/users/')
      .orderByChild('emailId')
      .equalTo(data.emailId)
      .once('value');

    const userArray = snapshot.val();
    dispatch({ type: USER_LOGIN_REQUEST });
    

    const userId = Object.keys(userArray)[0];
    const user = userArray[userId];

    if (!userArray) {
      throw new Error('User not found');
    }
    else if (user.password !== data.password) 
    {
      throw new Error('Invalid password');
    }

    else
    {
      dispatch({ type: USER_LOGIN_REQUEST });
    }

    
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};


export const logout = () => async (dispatch) => {
  //dispatch({ type: USER_LOGOUT_REQUEST });
  console.log('USER_LOGOUT_REQUEST');
  try {
    await AsyncStorage.removeItem('user');
    //dispatch({ type: USER_LOGOUT_SUCCESS });
    dispatch({ type: USER_LOGOUT });
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



// export const register = (data) => async (dispatch) => {
//   try {
//     await database()
//       .ref('/users/' + data.id)
//       .set(data);
//     dispatch({ type: USER_REGISTER_REQUEST });
//     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
//   } catch (error) {
//     console.log("Database error:", error);
//     dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
//   }
// };


export const register = (data) => async (dispatch) => {
  try {
    // Check if a user with the same email already exists
    const snapshot = await database().ref('/users').orderByChild('email').equalTo(data.emailId).once('value');
    if (snapshot.exists()) {
      // User with the same email already exists
      dispatch({ type: USER_REGISTER_FAIL, payload: 'User with the same email already exists' });
    } else {
      // User does not exist, proceed with registration
      dispatch({ type: USER_REGISTER_REQUEST });
      await database().ref('/users/' + data.id).set(data);      
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    }
  } catch (error) {
    console.log("Database error:", error);
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
};