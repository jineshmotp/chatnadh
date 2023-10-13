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

  
  USER_UPDATE_ONLINE_STATUS,


  OTP_REQUEST,
  OTP_FAIL,
  OTP_SUCCESS,
  OTP_RESET,

  OTP_VALIDATION_REQUEST,
  OTP_VALIDATION_FAIL,
  OTP_VALIDATION_SUCCESS,
  OTP_VALIDATION_RESET,


} from './userConstants';

interface UserState {
  user: User | null;
  isLoading: boolean;
  buttonLoading: boolean;
  error: string | null;
  isOnline: boolean; // Add this field

  otpRequestLoading:boolean;
  otpRequesterror: string | null;
  otpRequestData:null | [],

  otpValidationLoading:boolean;
  otpValidationerror:string | null;
  otpValidationData:null | [],

  userIndividualLoading:boolean;
  userIndividualerror:string | null;
  userIndividualData:null | [],
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  buttonLoading: false,
  error: null,
  isOnline: false, 

  
  otpRequestLoading:false,
  otpRequesterror:null,
  otpRequestData:null,

  otpValidationLoading:false,
  otpValidationerror:null,
  otpValidationData:null,



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

//###################### userOTPReducer #############################

export const userOTPReducer = (state = initialState, action) => {


  switch (action.type) {

    case OTP_REQUEST:
      return { ...state, otpRequestLoading: false, otpRequesterror: null };    
    case OTP_SUCCESS: 
      return { ...state, otpRequestData: action.payload, otpRequestLoading: false, otpRequesterror: null };
    case OTP_FAIL:
     return { ...state, otpRequestData:null, otpRequestLoading: false, otpRequesterror: action.payload  };
    case OTP_RESET:
        return { ...state, otpRequestData:null, otpRequestLoading: false, otpRequesterror: null  };
      
    case OTP_VALIDATION_REQUEST:
        return { ...state, otpValidationLoading: false, otpValidationerror: null };    
    case OTP_VALIDATION_SUCCESS: 
        return { ...state, otpValidationData: action.payload, otpValidationLoading: false, otpValidationerror: null };
    case OTP_VALIDATION_FAIL:
        return { ...state, otpValidationData:null, otpValidationLoading: false, otpValidationerror: action.payload  };
    case OTP_VALIDATION_RESET:
        return { ...state, otpValidationData:null, otpValidationLoading: false, otpValidationerror: null  };
    
    default:
      return state;
  }

};

//######################### User Register ########################################

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

