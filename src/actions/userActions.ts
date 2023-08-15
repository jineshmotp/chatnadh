// src/store/authActions.ts
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT } from '../redux-constants/userConstants';
import { getAuth, signInWithEmailAndPassword, signOut } from '@react-native-firebase/auth';
import { auth } from '../config/firebase'; // Import the auth object from your Firebase configuration


export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };

    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.log("Authentication error:", error); // Log the actual error here
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  await signOut(auth);

  dispatch({ type: USER_LOGOUT });
};