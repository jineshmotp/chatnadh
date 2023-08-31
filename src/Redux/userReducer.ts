// src/redux-reducer/userReducer.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_DATA_UPDATED,
  USER_LOGIN_FAIL, 

  USER_LOGOIN_BUTTON_LOADING,
  USER_LOGOIN_BUTTON_RESET,
  
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,


  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT

} from './userConstants';

const initialState = {
  user: null,
  isLoading: false,
  buttonLoading:false,
  error: null,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: false, error: null };    
    case USER_LOGIN_SUCCESS:  
    case USER_DATA_UPDATED:      
      return { ...state, user: action.payload, isLoading: false, error: null };
    case USER_LOGIN_FAIL:
      return { ...state, user:null, isLoading: false, error: action.payload,  };
    
    case USER_LOGOIN_BUTTON_LOADING:
      return { ...state, buttonLoading:true  };
    case USER_LOGOIN_BUTTON_RESET:
        return { ...state, buttonLoading:false  };
      
    
    
    
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
          return { isLoading:false}
      
      case USER_REGISTER_SUCCESS:
          return { isLoading:false, user:action.payload}

      case USER_REGISTER_FAIL:
          return { isLoading:false, error:action.payload}

      case USER_REGISTER_RESET:
          return { isLoading:false, error:null, user:null}
      default:
          return state  
  }
}
