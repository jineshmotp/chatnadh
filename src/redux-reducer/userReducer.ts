// src/redux-reducer/userReducer.ts
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
      return { ...state, user: action.payload, isLoading: false, error: null };
    case USER_LOGIN_FAIL:
      return { ...state, user:null, isLoading: false, error: action.payload,  };
    case USER_LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userLoginReducer;
