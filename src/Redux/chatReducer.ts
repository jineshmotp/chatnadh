import { 
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_RESET,

  CHAT_TABLE_REQUEST,
  CHAT_TABLE_SUCCESS,
  CHAT_TABLE_RESET,
  CHAT_TABLE_FAIL,

  CHAT_CREATE_REQUEST,
  CHAT_CREATE_SUCCESS,
  CHAT_CREATE_RESET,
  CHAT_CREATE_FAIL,

  CHAT_FEATCH_REQUEST,
  CHAT_FEATCH_SUCCESS,
  CHAT_FEATCH_RESET,
  CHAT_FEATCH_FAIL,
  
  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
  CHAT_LIST_RESET,
  CHAT_LIST_FAIL


 } from  './chatConstants'

 const initialState = {
  chatcontacts: [],  
  chatisLoading: false,
  
  chaterror: null,

  createChatTableLoading:false,
  createChatTableerror:null,
  createChatTabledata: [],


  createChatLoading:false,
  createChaterror:null,

  featchChatLoading:false,
  featchChaterror:null,


  chatlist:[],
  chatbuttonLoading: false, 
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

export const createChatTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_TABLE_REQUEST:
      return { ...state, createChatTableLoading: false, createChatTabledata:null,createChatTableerror: null };    
    case CHAT_TABLE_SUCCESS:       
      return { ...state, createChatTableLoading: true,createChatTabledata:action.payload, createChatTableerror: null };
    case CHAT_TABLE_FAIL:
      return { ...state, createChatTableLoading: false,createChatTabledata:null, createChatTableerror: action.payload,  };
    
    case CHAT_TABLE_RESET:
      return { ...state, createChatTableLoading: false,createChatTableerror: null  };
  
    default:
      return state;
  }
};

export const createChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_FEATCH_REQUEST:
      return { ...state, createChatLoading: false, createChaterror: null };    
    case CHAT_FEATCH_SUCCESS:       
      return { ...state, createChatLoading: true, createChaterror: null };
    case CHAT_FEATCH_FAIL:
      return { ...state, createChatLoading: false, createChaterror: action.payload,  };
    
    case CHAT_FEATCH_RESET:
      return { ...state, createChatLoading: false,createChaterror: null  };
  
    default:
      return state;
  }
};



export const featchChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_FEATCH_REQUEST:
      return { ...state, featchChatLoading: false, featchChaterror: null };    
    case CHAT_FEATCH_SUCCESS:       
      return { ...state, featchChatLoading: true, featchChaterror: null };
    case CHAT_FEATCH_FAIL:
      return { ...state, featchChatLoading: false, featchChaterror: action.payload,  };
    
    case CHAT_FEATCH_RESET:
      return { ...state, featchChatLoading: false,featchChaterror: null  };
  
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


