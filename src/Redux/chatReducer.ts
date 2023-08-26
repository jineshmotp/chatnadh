import { 
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_RESET
 } from  './chatConstants'

 const initialState = {
  chatcontacts: [], 
  chatisLoading: false,
  chatbuttonLoading: false,
  chaterror: null,
};

export const getallContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { ...state, chatisLoading: true, chaterror: null };    
    case CONTACT_LIST_SUCCESS:       
      return { ...state, chatcontacts: action.payload, chatisLoading: false, chaterror: null };
    case CONTACT_LIST_FAIL:
      return { ...state, chatcontacts:null, chatisLoading: false, chaterror: action.payload,  };
    
    case CONTACT_LIST_RESET:
      return { ...state, chatbuttonLoading:false, chatcontacts: null,chaterror: null, chatisLoading: false, };
  
    default:
      return state;
  }
};

