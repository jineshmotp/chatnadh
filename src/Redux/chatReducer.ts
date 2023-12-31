import { 
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_RESET,

  CHAT_TABLE_REQUEST,
  CHAT_TABLE_SUCCESS,
  CHAT_TABLE_RESET,
  CHAT_TABLE_FAIL,

  CHAT_UPLOADIMG_REQUEST,
  CHAT_UPLOADIMG_SUCCESS,
  CHAT_UPLOADIMG_RESET,
  CHAT_UPLOADIMG_FAIL,

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
  CHAT_LIST_FAIL,

  UPDATE_OPPONENT_DATA


 } from  './chatConstants'

 const initialState = {
  
  getallContactsData:[],
  getallContactsLoading: false,  
  getallContactserror: null,

  createChatTableData: [],
  createChatTableLoading:false,
  createChatTableerror:null, 

  createChatData:[],
  createChatLoading:false,
  createChaterror:null,

  uploadImageLoading:false,
  uploadImageerror:null,

  fetchChatData : [],
  fetchChatLoading:false,
  fetchChaterror:null,

  fetchChatListData:[],
  fetchChatListLoading:false,
  fetchChatListerror:false,
 
};


type ContactActionTypes = {
  type:
    | typeof CONTACT_LIST_REQUEST
    | typeof CONTACT_LIST_SUCCESS
    | typeof CONTACT_LIST_FAIL
    | typeof CONTACT_LIST_RESET;
    payload: (string[] | null); // You should replace 'any' with the actual payload type
};

type ChatActionTypes =
  | {
      type:
        | typeof CHAT_TABLE_REQUEST
        | typeof CHAT_TABLE_SUCCESS
        | typeof CHAT_TABLE_RESET
        | typeof CHAT_TABLE_FAIL;
        payload: (string[] | null); // Replace with actual payload type
    }
  | {
      type:
        | typeof CHAT_CREATE_REQUEST
        | typeof CHAT_CREATE_SUCCESS
        | typeof CHAT_CREATE_RESET
        | typeof CHAT_CREATE_FAIL;
    }
  | {
      type:
        | typeof CHAT_FETCH_REQUEST
        | typeof CHAT_FETCH_SUCCESS
        | typeof CHAT_FETCH_RESET
        | typeof CHAT_FETCH_FAIL;
        payload: (string[] | null); // Replace with actual payload type
    }
  | {
      type:
        | typeof CHAT_UPLOADIMG_REQUEST
        | typeof CHAT_UPLOADIMG_SUCCESS
        | typeof CHAT_UPLOADIMG_RESET
        | typeof CHAT_UPLOADIMG_FAIL;       
    }
  | {
      type:
        | typeof CHAT_LIST_REQUEST
        | typeof CHAT_LIST_SUCCESS
        | typeof UPDATE_OPPONENT_DATA
        | typeof CHAT_LIST_RESET
        | typeof CHAT_LIST_FAIL;
        payload: (string[] | null); // Replace with actual payload type
    };





export const getallContactsReducer = (state = initialState, action: ContactActionTypes) => {
  switch (action.type) {
    case CONTACT_LIST_REQUEST:
      return { ...state, getallContactsLoading: true, getallContactserror: null };    
    case CONTACT_LIST_SUCCESS:       
      return { ...state, getallContactsData: action.payload, getallContactsLoading: false, getallContactserror: null };
    case CONTACT_LIST_FAIL:
      return { ...state, getallContactsData:null, getallContactsLoading: false, getallContactserror: action.payload,  };
    
    case CONTACT_LIST_RESET:
      return { ...state, getallContactsData: null,getallContactserror: null, getallContactsLoading: false, };
  
    default:
      return state;
  }
};

export const createChatTableReducer = (state = initialState,action: ChatActionTypes) => {
  switch (action.type) {
    case CHAT_TABLE_REQUEST:
      return { ...state, createChatTableLoading: false, createChatTableerror: null };    
    case CHAT_TABLE_SUCCESS:       
      return { ...state, createChatTableLoading: true,createChatTableData:action.payload, createChatTableerror: null };
    case CHAT_TABLE_FAIL:
      return { ...state, createChatTableLoading: false,createChatTableData:null, createChatTableerror: action.payload,  };
    
    case CHAT_TABLE_RESET:
      return { ...state, createChatTableLoading: false,createChatTableData:null,createChatTableerror: null  };
  
    default:
      return state;
  }
};

export const createChatReducer = ( state = initialState,action: ChatActionTypes) => {
  switch (action.type) {
    case CHAT_CREATE_REQUEST:
      return { ...state, createChatLoading: false, createChaterror: null };    
    case CHAT_CREATE_SUCCESS:       
      return { ...state, createChatLoading: true, createChaterror: null };
    case CHAT_CREATE_FAIL:
      return { ...state, createChatLoading: false, createChaterror: action.payload  };
    
    case CHAT_CREATE_RESET:
      return { ...state, createChatLoading: false, createChaterror: null  };
  
   //############################### UPLOAD IMAGE ###################################

      case CHAT_UPLOADIMG_REQUEST:
        return { ...state, uploadImageLoading: true, uploadImageerror: null };    
      case CHAT_UPLOADIMG_SUCCESS:       
        return { ...state, uploadImageLoading: false, uploadImageerror: null };
      case CHAT_UPLOADIMG_FAIL:
        return { ...state, uploadImageLoading: false, uploadImageerror: action.payload  };
      
      case CHAT_UPLOADIMG_RESET:
        return { ...state, uploadImageLoading: false, uploadImageerror: null  };
    
  
    //#############################################################
  
  
  
      default:
      return state;
  }
};



//#########################################################################

export const fetchChatReducer = ( state = initialState,action: ChatActionTypes) => {
  switch (action.type) {
    case CHAT_FETCH_REQUEST:
      return { ...state, fetchChatLoading: true, fetchChaterror: null };    
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


export const fetchChatListReducer = ( state = initialState,action: ChatActionTypes) => {
  switch (action.type) {
    case CHAT_LIST_REQUEST:
      return { ...state, fetchChatListLoading: true, fetchChatListerror: null };    
    case CHAT_LIST_SUCCESS:         
      return { ...state, fetchChatListData: action.payload, fetchChatListLoading: false, fetchChatListerror: null };
    
      case UPDATE_OPPONENT_DATA:
        // Check if fetchChatListData is not null before updating opponent data
        if (state.fetchChatListData && state.fetchChatListData.opponentDatas) {
          // Update opponent data based on opponent ID
          const updatedOpponentDatas = state.fetchChatListData.opponentDatas.map((opponentData) => {
            if (opponentData.id === action.payload.opponentData.id) {
              return action.payload.opponentData;
            }
            return opponentData;
          });
  
          // Return updated state
          return {
            ...state,
            fetchChatListData: {
              ...state.fetchChatListData,
              opponentDatas: updatedOpponentDatas,
            },
          };
        };

    case CHAT_LIST_FAIL:
      return { ...state, fetchChatListData:null, fetchChatListLoading: false, fetchChatListerror: action.payload,  };
    
    case CHAT_LIST_RESET:
      return { ...state, fetchChatListData: null,fetchChatListerror: null, fetchChatListLoading: false, };
  
    default:
      return state;
  }
};