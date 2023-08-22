// src/redux-reducer/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
// src/redux-actions/userActions.js
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT 
} from '../redux-constants/userConstants';
import { auth } from '../config/firebase';

// Async action creator using Redux Thunk
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };
    await AsyncStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.log("Authentication error:", error);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('user');
  try {
   
    await auth.signOut();
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
