import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT } from '../redux-constants/userConstants';
import { auth } from '../config/firebase';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password); // Fix this line
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    };

    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.log("Authentication error:", error);
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  await auth.signOut();

  dispatch({ type: USER_LOGOUT });
};
