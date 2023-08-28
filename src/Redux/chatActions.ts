// src/redux-reducer/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

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
  CHAT_LIST_FAIL,

 } from  './chatConstants'


// Async action creator using Redux Thunk
export const getallContacts = (user) => async (dispatch) => {
  dispatch({ type: CONTACT_LIST_REQUEST });
  try {
    const snapshot = await database()
      .ref('/users/')
      .once('value');

    const userObject = snapshot.val();

    // Convert the user object into an array of users
    const userArray = Object.values(userObject);

    // Filter out the user with the specific id
    const filteredUsers = userArray.filter(u => u.id !== user.id);

    // Store the filtered user array in AsyncStorage
    await AsyncStorage.setItem('chatcontacts', JSON.stringify(filteredUsers));

    dispatch({ type: CONTACT_LIST_SUCCESS, payload: filteredUsers });
  } catch (error) {
    dispatch({ type: CONTACT_LIST_FAIL, payload: error.message });
  }
};


export const createChatTable = (data) => async (dispatch) => {
  dispatch({ type: CHAT_TABLE_REQUEST });
  try {

    
  

    // Store the filtered user array in AsyncStorage
    //await AsyncStorage.setItem('chatcontacts', JSON.stringify(filteredUsers));

    dispatch({ type: CHAT_TABLE_SUCCESS });
  } catch (error) {
    dispatch({ type: CHAT_TABLE_FAIL, payload: error.message });
  }
};





export const getchatList = (data) => async (dispatch) => {
  dispatch({ type: CHAT_LIST_REQUEST });
  try {
    const snapshot = await database()
      .ref('/chats/')
      .once('value');

    const userObject = snapshot.val();

    // Convert the user object into an array of users
    const userArray = Object.values(userObject);

    // Filter out the user with the specific id
    const filteredUsers = userArray.filter(u => u.id !== user.id);

    // Store the filtered user array in AsyncStorage
    await AsyncStorage.setItem('chatcontacts', JSON.stringify(filteredUsers));

    dispatch({ type: CHAT_LIST_SUCCESS, payload: filteredUsers });
  } catch (error) {
    dispatch({ type: CHAT_LIST_FAIL, payload: error.message });
  }
};

