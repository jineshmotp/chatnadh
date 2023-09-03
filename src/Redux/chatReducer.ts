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

  CHAT_FETCH_REQUEST,
  CHAT_FETCH_SUCCESS,
  CHAT_FETCH_RESET,
  CHAT_FETCH_FAIL,
  
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

  fetchChatData : [],
  fetchChatLoading:false,
  fetchChaterror:null,


  chatList:[],
  chatListLoading:false,
  chatListerror:false,
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
    case CHAT_CREATE_REQUEST:
      return { ...state, createChatLoading: false, createChaterror: null };    
    case CHAT_CREATE_SUCCESS:       
      return { ...state, createChatLoading: true, createChaterror: null };
    case CHAT_CREATE_FAIL:
      return { ...state, createChatLoading: false, createChaterror: action.payload,  };
    
    case CHAT_CREATE_RESET:
      return { ...state, createChatLoading: false,createChaterror: null  };
  
    default:
      return state;
  }
};



export const fetchChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_FETCH_REQUEST:
      return { ...state, fetchChatLoading: true,fetchChatData:null, fetchChaterror: null };    
    case CHAT_FETCH_SUCCESS:       
      return { ...state, fetchChatLoading: false, fetchChatData:action.payload, fetchChaterror: null };
    case CHAT_FETCH_FAIL:
      return { ...state, fetchChatLoading: false, fetchChatData:null, fetchChaterror: action.payload,  };
    
    case CHAT_FETCH_RESET:
      return { ...state, fetchChatLoading: false,fetchChatData:null, fetchChaterror: null  };
  
    default:
      return state;
  }
};


export const fetchChatListReducer = (state={}, action) => {
  switch (action.type) {
    case CHAT_LIST_REQUEST:
      return { ...state, chatListLoading: true, chatListerror: null };    
    case CHAT_LIST_SUCCESS:       
      return { ...state, chatList: action.payload, chatListLoading: false, chatListerror: null };
    case CHAT_LIST_FAIL:
      return { ...state, chatList:null, chatListLoading: false, chatListerror: action.payload,  };
    
    case CHAT_LIST_RESET:
      return { ...state, chatbuttonLoading:false, chatList: null,chatListerror: null, chatListLoading: false, };
  
    default:
      return state;
  }
};


