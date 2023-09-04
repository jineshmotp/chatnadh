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

  CHAT_FETCH_REQUEST,
  CHAT_FETCH_SUCCESS,
  CHAT_FETCH_RESET,
  CHAT_FETCH_FAIL,


  CHAT_LIST_REQUEST,
  CHAT_LIST_SUCCESS,
  CHAT_LIST_RESET,
  CHAT_LIST_FAIL,

 } from  './chatConstants'


// Async action creator using Redux Thunk
export const getallContacts = (user) => async (dispatch) => {
  dispatch({ type: CONTACT_LIST_REQUEST });
  try {
    const contactsRef = database().ref('/users/');
    
    // Set up a listener for real-time data updates
    contactsRef.on('value', (snapshot) => {
      const userObject = snapshot.val();

      // Convert the user object into an array of users
      const userArray = Object.values(userObject);

      // Filter out the user with the specific id
      const filteredUsers = userArray.filter(u => u.id !== user.id);

      // Store the filtered user array in AsyncStorage
      AsyncStorage.setItem('chatcontacts', JSON.stringify(filteredUsers));

      // Dispatch the updated contacts array
      dispatch({ type: CONTACT_LIST_SUCCESS, payload: filteredUsers });
    });

    // Return a function to unsubscribe when needed
    return () => contactsRef.off();
  } catch (error) {
    dispatch({ type: CONTACT_LIST_FAIL, payload: error.message });
  }
};


export const createChatTable = (moreUserData, moreOpponentData) => async (dispatch) => {
  //console.log('createChatTable action started', moreUserData, moreOpponentData);
  dispatch({ type: CHAT_TABLE_REQUEST });
  try {
    const userSnapshot = await database()
      .ref('/chats')
      .orderByChild('chatId')
      .equalTo(moreUserData.chatId)
      .once('value');
    const opponentSnapshot = await database()
      .ref('/chats')
      .orderByChild('chatId')
      .equalTo(moreOpponentData.chatId)
      .once('value');

    if (!opponentSnapshot.exists()) {
      //console.log('opponent if check works');
      await database().ref('/chats/' + moreOpponentData.chatId).set(moreOpponentData);
    }

    if (!userSnapshot.exists()) {
     // console.log('user if check works');
      await database().ref('/chats/' + moreUserData.chatId).set(moreUserData);
      dispatch({ type: CHAT_TABLE_SUCCESS, payload: null });
    } else {
      //console.log('user else check works', moreUserData.chatId);
      const fetchChatResult = await dispatch(fetchChat(moreUserData));
      //console.log(fetchChatResult); 
      dispatch({ type: CHAT_TABLE_SUCCESS, payload: fetchChatResult });
    }
  } catch (error) {
    dispatch({ type: CHAT_TABLE_FAIL, payload: error.message });
  }
};

export const resetcreateChatTable = () => async (dispatch) => {

  dispatch({ type: CHAT_TABLE_RESET });

};


//######################################################################


export const fetchChat = (moreUserData) => async (dispatch) => {
  dispatch({ type: CHAT_FETCH_REQUEST });

  try {
    const messagesRef = database()
      .ref('messages')
      .orderByChild('chatId')
      .equalTo(moreUserData.chatId)
      .limitToLast(10);

    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);

        // Sort messages by timestamp in ascending order (oldest to newest)
        messagesArray.sort((a, b) => {
          const timestampA = a.timestamp;
          const timestampB = b.timestamp;
          return timestampA.localeCompare(timestampB);
        });

        dispatch({ type: CHAT_FETCH_SUCCESS, payload: messagesArray });
      } else {
        // If no messages are found, set an empty array
        dispatch({ type: CHAT_FETCH_SUCCESS, payload: [] });
      }
    });
  } catch (error) {
    dispatch({ type: CHAT_FETCH_FAIL, payload: error.message });
  }
};


export const resetfetchChat = () => async (dispatch) => {

  dispatch({ type: CHAT_FETCH_RESET });

};

//##################################################################

export const createChat = (moreUserChatData,moreUserMessageData,moreOpponentChatData,moreOpponentMessageData) => async (dispatch) => {
  dispatch({ type: CHAT_CREATE_REQUEST });
  
 
  try {

    const userChatRef = database().ref('/chats/' + moreUserChatData.chatId);
    const userChatSnapshot = await userChatRef.once('value');
    if (userChatSnapshot.exists()) {
      await userChatRef.update({
        lastMessage: moreUserChatData.lastMessage,
        lastMessageTime: (moreUserChatData.lastMessageTime).toISOString(), 
        emotion:moreUserChatData.emotion,
        notification:moreUserChatData.notification
      });
    }

     // Update last message and last message time for the opponent's chat
     const opponentChatRef = database().ref('/chats/' + moreOpponentChatData.chatId);
     const opponentChatSnapshot = await opponentChatRef.once('value');
     if (opponentChatSnapshot.exists()) {
       await opponentChatRef.update({
         lastMessage: moreOpponentChatData.lastMessage,
         lastMessageTime: (moreOpponentChatData.lastMessageTime).toISOString(), 
         emotion:moreOpponentChatData.emotion,
         notification:moreOpponentChatData.notification,
       });
     }   
    
    await database().ref('/messages/'+moreUserMessageData.messageId).set(moreUserMessageData);
    await database().ref('/messages/'+moreOpponentMessageData.messageId).set(moreOpponentMessageData);
    dispatch({ type: CHAT_CREATE_SUCCESS });      
   
  } catch (error) {
    dispatch({ type: CHAT_CREATE_FAIL, payload: error.message });
  }
};


export const resetcreateChat = () => async (dispatch) => {

  dispatch({ type: CHAT_CREATE_RESET });

};

//#########################################################################


export const fetchChatList = (user) => async (dispatch) => {
  dispatch({ type: CHAT_LIST_REQUEST });
  try {
    const chatsRef = database().ref('/chats');

    // Set up a listener for real-time data updates
    chatsRef
      .orderByChild('chatId')
      .startAt(`${user.id}_`)
      .endAt(`${user.id}_\uf8ff`)
      .on('value', async (snapshot) => {
        const chatsData = snapshot.val();

        if (!chatsData) {
          dispatch({
            type: CHAT_LIST_SUCCESS,
            payload: { chatListDatas: [], opponentDatas: [] },
          });
          return;
        }

        const chatListDatas = Object.values(chatsData);

        // Extract opponent IDs from chat IDs
        const opponentIds = chatListDatas.map((chat) => {
          const chatIdParts = chat.chatId.split('_');
          return chatIdParts.find((id) => id !== user.id);
        });

        // Fetch opponent details from the user table based on opponent IDs
        const opponentDatas = await Promise.all(
          opponentIds.map(async (opponentId) => {
            const opponentSnapshot = await database()
              .ref(`/users/${opponentId}`)
              .once('value');
            return opponentSnapshot.val();
          })
        );

        dispatch({
          type: CHAT_LIST_SUCCESS,
          payload: { chatListDatas, opponentDatas },
        });
      });

    // Return a function to unsubscribe when needed
    return () => chatsRef.off();
  } catch (error) {
    dispatch({ type: CHAT_LIST_FAIL, payload: error.message });
  }
};