// ./store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  //userLogoutReducer
} from './src/Redux/userReducer';

import { 
  getallContactsReducer, 
  getchatListReducer,
  createChatTableReducer,
  featchChatReducer
} from './src/Redux/chatReducer'


const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getallContacts:getallContactsReducer,
  getchatList :getchatListReducer,
  createChatTable:createChatTableReducer,
  featchChat:featchChatReducer
  // other reducers...
});

const middleware = [thunk];

// Get user details from AsyncStorage
const getUserDetails = async () => {
  const userDetails = await AsyncStorage.getItem('user');
  return JSON.parse(userDetails) || null;
};

// Async function to get initial state
const getInitialState = async () => ({
  userLogin: { user: await getUserDetails() },
  // other initial state properties...
});

// Create the store using initial state
const initializeStore = async () => {
  const initialState = await getInitialState();
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  return store;
};

export default initializeStore;


