// src/redux-reducer/userReducer.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,

} from '../redux-constants/userConstants';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userLoginReducer = (state = initialState, action) => {
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

export const userRegisterReducer = (state = { }, action) => {

  switch (action.type){
      case USER_REGISTER_REQUEST:
          return { isLoading:true}
      
      case USER_REGISTER_SUCCESS:
          return { isLoading:false, user:action.payload}

      case USER_REGISTER_FAIL:
          return { isLoading:false, error:action.payload}
      default:
          return state  
  }
}
