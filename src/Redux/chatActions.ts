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


export const createChatTable = (moreUserData, moreOpponentData) => async (dispatch) => {
  dispatch({ type: CHAT_TABLE_REQUEST });
  try {
    // Check if a user with the same email already exists
    const userSnapshot = await database().ref('/chats').orderByChild('chatId').equalTo(moreUserData.chatId).once('value');
    const opponentSnapshot = await database().ref('/chats').orderByChild('chatId').equalTo(moreOpponentData.chatId).once('value');

    if (!opponentSnapshot.exists()) {
      await database().ref('/chats/' + moreOpponentData.chatId).set(moreOpponentData);
    } else {      
      // Update moreOpponentData on the same chatId
      await database().ref('/chats/' + moreOpponentData.chatId).update(moreOpponentData);
    }

    if (!userSnapshot.exists()) {
      await database().ref('/chats/' + moreUserData.chatId).set(moreUserData);
      dispatch({ type: CHAT_TABLE_SUCCESS ,payload: null});
    } else {
      await database().ref('/chats/' + moreUserData.chatId).update(moreUserData);

      // Fetch messages using featchChat and return the result
      const featchChatResult = await dispatch(featchChat(moreUserData));

     // Dispatch CHAT_TABLE_SUCCESS along with the featchChatResult
      dispatch({ type: CHAT_TABLE_SUCCESS, payload: featchChatResult });
    }
  } catch (error) {
    dispatch({ type: CHAT_TABLE_FAIL, payload: error.message });
  }
};

export const resetChatTable = () => async (dispatch) => {

  dispatch({ type: CHAT_TABLE_RESET });

};
//######################################################################


export const featchChat = (moreUserData) => async (dispatch) => {
  dispatch({ type: CHAT_FEATCH_REQUEST });
  try {
    // Fetch messages from Firebase based on chatId and time
    const messagesRef = database.ref('messages').orderByChild('chatId').equalTo(moreUserData.chatId).limitToLast(10);
    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messages = Object.values(messagesData);
        // Sort messages by timestamp (assuming timestamp is a valid key in the messages)
        messages.sort((a, b) => a.timestamp - b.timestamp);
        
        // Dispatch action with fetched messages
        dispatch({ type: CHAT_FEATCH_SUCCESS, payload: messages }); // Pass messages as payload
      } else {
        // No messages found
        dispatch({ type: CHAT_FEATCH_SUCCESS, payload: [] });
      }
    });
  } catch (error) {
    dispatch({ type: CHAT_FEATCH_FAIL, payload: error.message });
  }
};

export const resetfeatchChat = () => async (dispatch) => {

  dispatch({ type: CHAT_FEATCH_RESET });

};

//##################################################################

export const createChat = (data) => async (dispatch) => {
  dispatch({ type: CHAT_CREATE_REQUEST });
  try {


    
        dispatch({ type: CHAT_CREATE_SUCCESS });
      
   
  } catch (error) {
    dispatch({ type: CHAT_CREATE_FAIL, payload: error.message });
  }
};


export const resetcreateChat = () => async (dispatch) => {

  dispatch({ type: CHAT_CREATE_RESET });

};