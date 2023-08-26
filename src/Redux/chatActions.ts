// src/redux-reducer/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import { 
  CONTACT_LIST_REQUEST,
  CONTACT_LIST_SUCCESS,
  CONTACT_LIST_FAIL,
  CONTACT_LIST_RESET
 } from  './chatConstants'


// Async action creator using Redux Thunk
export const getallContacts = (user) => async (dispatch) => {
  
  try {
    const snapshot = await database()
      .ref('/users/')   
      .once('value');

    const userArray = snapshot.val();
    dispatch({ type: CONTACT_LIST_REQUEST });
    
    const userId = Object.keys(userArray)[0];
    const user = userArray[userId];
       
    await AsyncStorage.setItem('chatcontacts', JSON.stringify(user));
    dispatch({ type: CONTACT_LIST_SUCCESS, payload:  chatcontacts });
  } catch (error) {
    dispatch({ type: CONTACT_LIST_FAIL, payload: error.message });
  }
};

