// src/redux-reducer/userReducer.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT 
} from '../redux-constants/userConstants';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };
    case USER_LOGIN_SUCCESS:
      AsyncStorage.setItem('user', JSON.stringify(action.payload)); // Store user data
      return { ...state, user: action.payload, isLoading: false, error: null };
    case USER_LOGIN_FAIL:
      return { ...state, user:null, isLoading: false, error: action.payload,  };
    case USER_LOGOUT:
      AsyncStorage.removeItem('user'); // Remove user data
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userLoginReducer;
