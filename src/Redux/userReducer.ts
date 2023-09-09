// src/Redux/userReducer.ts
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
  USER_LOGOUT,

  USER_INDIVIDUAL_REQUEST,
  USER_INDIVIDUAL_FAIL,
  USER_INDIVIDUAL_SUCCESS,
  USER_INDIVIDUAL_RESET,

  
  USER_UPDATE_ONLINE_STATUS

} from './userConstants';

interface UserState {
  user: User | null;
  isLoading: boolean;
  buttonLoading: boolean;
  error: string | null;
  isOnline: boolean; // Add this field

  userIndividualLoading:boolean;
  userIndividualerror:string | null;
  userIndividualData:[],
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  buttonLoading: false,
  error: null,
  isOnline: false, 

  userIndividualLoading:false,
  userIndividualerror:null,
  userIndividualData:null,

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
      
    
    case USER_UPDATE_ONLINE_STATUS:
        return { ...state, isOnline: action.payload}
    
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

export const userIndividualReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INDIVIDUAL_REQUEST:
      return { ...state, userIndividualLoading: true, userIndividualerror: null };
    case USER_INDIVIDUAL_SUCCESS:
      return { ...state, userIndividualData: action.payload, userIndividualLoading: false };
    case USER_INDIVIDUAL_FAIL:
      return { ...state, userIndividualData: null, userIndividualLoading: false, userIndividualerror: action.payload };
    case USER_INDIVIDUAL_RESET:
      return { ...state, userIndividualData: null, userIndividualLoading: false, userIndividualerror: null };
    default:
      return state; // Return the initial state here
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

