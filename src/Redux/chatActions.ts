// src/redux-reducer/userActions.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import { SERVER_KEY } from '../config/constants';
import axios from 'axios';

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

  CHAT_UPLOADIMG_REQUEST,
  CHAT_UPLOADIMG_SUCCESS,
  CHAT_UPLOADIMG_RESET,
  CHAT_UPLOADIMG_FAIL,

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

//########################################################################

type User = {
  id: string; 
};
// Async action creator using Redux Thunk
export const getallContacts = (user: User) => async (dispatch: Dispatch) => {
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

//###########################################################################


export const createChatTable = (moreUserData, moreOpponentData) => async (dispatch: Dispatch) => {
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
      dispatch({ type: CHAT_TABLE_SUCCESS, payload: null });
    }
  } catch (error) {
    dispatch({ type: CHAT_TABLE_FAIL, payload: error.message });
  }
};

export const resetcreateChatTable = () => async (dispatch: Dispatch) => {

  dispatch({ type: CHAT_TABLE_RESET });

};


//######################################################################


export const fetchChat = (moreUserData) => (dispatch: Dispatch) => {
  dispatch({ type: CHAT_FETCH_REQUEST });

  try {
    const messagesRef = database()
    .ref('messages')
    .orderByChild('chatId')
    .equalTo(moreUserData.chatId);
    //.limitToLast(5); 

    messagesRef.on('value', (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const messagesArray = Object.values(messagesData);

        // Sort messages by timestamp in descending order (newest to oldest)
        messagesArray.sort((a, b) => {
          const timestampA = a.timestamp;
          const timestampB = b.timestamp;
          return timestampA.localeCompare(timestampB);
        });

        //console.log('fetchChat value:', messagesArray);

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


export const resetfetchChat = () => async (dispatch: Dispatch) => {

  dispatch({ type: CHAT_FETCH_RESET });

};

//##################################################################

export const createChat = (moreUserChatData,moreUserMessageData,moreOpponentChatData,moreOpponentMessageData,chatUser,user) => async (dispatch: Dispatch) => {
  dispatch({ type: CHAT_CREATE_REQUEST });
  
 
  try {

    let lastmsgg = moreUserChatData.lastMessage;
    let contents = moreUserMessageData.content;
    if(moreUserMessageData.messagetype === 'image')
    {    
    let image = moreUserMessageData.content;    
    let imgName = image.substring(image.lastIndexOf('/')+1);
    let ext = imgName.split('.').pop();
    let name = imgName.split('.')[0];
    let newName = name + Date.now()+'.'+ext;   
    const reference =storage().ref('ChatMedia/'+newName);
    await reference.putFile(image);
    const url = await storage()
                .ref('ChatMedia/'+newName)
                .getDownloadURL();
    console.log(url);
    contents=url;
    lastmsgg = 'image'
    }

    

    const userChatRef = database().ref('/chats/' + moreUserChatData.chatId);
    const userChatSnapshot = await userChatRef.once('value');
    if (userChatSnapshot.exists()) {
      await userChatRef.update({
        lastMessage: lastmsgg,
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
         lastMessage: lastmsgg,
         lastMessageTime: (moreOpponentChatData.lastMessageTime).toISOString(), 
         emotion:moreOpponentChatData.emotion,
         notification:moreOpponentChatData.notification,
       });
     }   
    
    await database().ref('/messages/'+moreUserMessageData.messageId)
                      .set({
                        messageId: moreUserMessageData.messageId,
                        chatId: moreUserMessageData.chatId,
                        senderId: moreUserMessageData.senderId,
                        content: contents,
                        timestamp: moreUserMessageData.timestamp,
                        delivered: moreUserMessageData.delivered,
                        emotion: moreUserMessageData.emotion,      
                        messagetype:moreUserMessageData.messagetype                        
                      });
                      
    await database().ref('/messages/'+moreOpponentMessageData.messageId)
                      .set({
                        messageId: moreOpponentMessageData.messageId,
                        chatId: moreOpponentMessageData.chatId,
                        senderId:moreOpponentMessageData.senderId,
                        content: contents,
                        timestamp: moreOpponentMessageData.timestamp,
                        delivered: moreOpponentMessageData.delivered,
                        emotion: moreOpponentMessageData.emotion,     
                        messagetype:moreOpponentMessageData.messagetype                      
                        
                        });

    
                        const opponentFCMToken = chatUser.fcmToken; // Get the opponent's FCM token from your database
                        //console.log('usertoken on chat :',opponentFCMToken)
                        // Send the push notification
                        sendPushNotification(opponentFCMToken,user,lastmsgg);
                                           
          
    dispatch({ type: CHAT_CREATE_SUCCESS });    
   
  } catch (error) {
    dispatch({ type: CHAT_CREATE_FAIL, payload: error.message });
  }
};


export const resetcreateChat = () => async (dispatch: Dispatch) => {

  dispatch({ type: CHAT_CREATE_RESET });

};


//########################### push  notification ###########################

export const sendPushNotification = async (opponentFCMToken,user,lastmsgg) => {
 
  try {
    const serverKey = 'AAAAHKgQF7Q:APA91bHkYq0g_njItbWl4BTPnGiFbLpdJsYwoD9V6H-EcEGBvjb-gaY1rjU45zeawQRo8AEwuT-L_t_gL8-2jSF_ycUepzbJREv2auOE3zRAJ81Yy3Y41V-EUZ2fLL0F9upMtkIDGcaM'; // Replace with your Firebase Server Key

    // Create the message payload
    const message = {
      to: opponentFCMToken,
      notification: {
        title: user.name,
        body: lastmsgg,
      },
      data: {
        key1: 'value1',
        key2: 'value2',
      },
    };

    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Successfully sent FCM message:', responseData);
    } else {
      console.error('Error sending FCM message:', response.statusText);
    }

  } catch (error) {
    console.error('Error sending FCM message:', error);
  }
 };

//#########################################################################


export const fetchChatList = (user) => async (dispatch: Dispatch) => {
  dispatch({ type: CHAT_LIST_REQUEST });
  try {
    const chatsRef = database().ref('/chats/');

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

        // Here, you can call the real-time listener for opponent data
        const opponentDatas = await fetchOpponentDataRealtime(opponentIds, dispatch);
        
        //console.log('updated opponent name : ',opponentDatas[0].name)
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

// Function to fetch opponent data with real-time updates
const fetchOpponentDataRealtime = async (opponentIds, dispatch) => {
  const opponentDatas = await Promise.all(
    opponentIds.map(async (opponentId) => {
      const opponentRef = database().ref(`/users/${opponentId}`);

      // Set up a listener for real-time data updates on the opponent user
      opponentRef.on('value', (opponentSnapshot) => {
        const opponentData = opponentSnapshot.val();
        //console.log('Received new data for opponent :',opponentData.name);

        // Handle the updated opponent data, e.g., dispatch an action to update the state
        dispatch({
          type: UPDATE_OPPONENT_DATA,
          payload: { opponentData },
        });
      });

      // Fetch the initial data (once) and return it immediately
      const opponentSnapshot = await opponentRef.once('value');
      //console.log('Initial data for opponent', opponentId, opponentSnapshot.val());

      return opponentSnapshot.val();
    })
  );

  return opponentDatas;
};



export const resetfetchChatList = () => async (dispatch: Dispatch) => {

  dispatch({ type:  CHAT_LIST_RESET });

};