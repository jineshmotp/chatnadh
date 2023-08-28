import { 
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_RESET,

  CHAT_TABLE_REQUEST,
  CHAT_TABLE_SUCCESS,
  CHAT_TABLE_RESET,
  CHAT_TABLE_FAIL,
  
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
  CHAT_LIST_RESET,
  CHAT_LIST_FAIL


 } from  './chatConstants'

 const initialState = {
  chatcontacts: [],
  chatlist:[], 
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

export const createChatTableReducer = (state={}, action) => {
  switch (action.type) {
    case CHAT_TABLE_REQUEST:
      return { ...state, chatisLoading: true, chaterror: null };    
    case CHAT_TABLE_SUCCESS:       
      return { ...state, chatisLoading: false, chaterror: null };
    case CHAT_TABLE_FAIL:
      return { ...state, chatisLoading: false, chaterror: action.payload,  };
    
    case CHAT_TABLE_RESET:
      return { ...state, chatisLoading: false,chaterror: null  };
  
    default:
      return state;
  }
};



export const getchatListReducer = (state={}, action) => {
  switch (action.type) {
    case CHAT_LIST_REQUEST:
      return { ...state, chatisLoading: true, chaterror: null };    
    case CHAT_LIST_SUCCESS:       
      return { ...state, chatlist: action.payload, chatisLoading: false, chaterror: null };
    case CHAT_LIST_FAIL:
      return { ...state, chatlist:null, chatisLoading: false, chaterror: action.payload,  };
    
    case CHAT_LIST_RESET:
      return { ...state, chatbuttonLoading:false, chatlist: null,chaterror: null, chatisLoading: false, };
  
    default:
      return state;
  }
};


