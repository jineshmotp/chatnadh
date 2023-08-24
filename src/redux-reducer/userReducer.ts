// src/redux-reducer/userReducer.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL, 
  
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,

  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT

} from '../redux-constants/userConstants';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: false, error: null };
    case USER_LOGIN_SUCCESS:       
      return { ...state, user: action.payload, isLoading: false, error: null };
    case USER_LOGIN_FAIL:
      return { ...state, user:null, isLoading: false, error: action.payload,  };
    case USER_LOGOUT_REQUEST:      
      return { ...state, isLoading: true };
    case USER_LOGOUT_SUCCESS:       
      return { ...state, isLoading: false };
      case USER_LOGOUT:       
      return { ...state, isLoading: false, user: null };
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
