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

