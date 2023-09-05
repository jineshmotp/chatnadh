import React, { useState, useEffect } from 'react';
import {
  Animated,
  FlatList,  
} from 'react-native';
import ModelPopup from '../../Components/ModelPopup';
import Header  from '../../Components/Header';
import styles from './styles';
import BackgroundImage from '../../Components/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import ChatList from '../../Components/ChatList';

import { useDispatch, useSelector } from 'react-redux'

import { fetchChatList,resetfetchChat,resetcreateChat,createChatTable,fetchChat, resetcreateChatTable } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';

const ChatListScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(0)); // Adjust the initial value
  const [scrollOffset, setScrollOffset] = useState(0); // Track scroll offset
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [isContainerTopVisible, setContainerTopVisible] = useState(true); // State to manage containerTop visibility
  
  const [chatListData, setChatListData] = useState([]); // Merged chat list data
  
  const navigation = useNavigation();

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user, isLoading, error } = userLogin
  
  const fetchChatLists = useSelector(state => state.fetchChatLists)
  const {chatList, chatListLoading, chatListerror } = fetchChatLists
  const [listclickLoading, setListclickLoading] = useState(false);
  const [selectchat, setSelectchat] = useState('');
  
  
  const { createChatTableLoading, createChatTabledata,createChatTableerror } = useSelector(state => state.createChatTable)
  const { fetchChatLoading, fetchChaterror, fetchChatData } = useSelector((state) => state.fetchChat);


  const [moreUserData, setMoreUserData] = useState({
    chatId: "",
    participants: [],
    lastMessage: "",
    lastMessageTime: "",
    notification: 0,
    emotion: ""
  });

  const [moreOpponentData, setMoreOpponentData] = useState({
    chatId: "",
    participants: [],
    lastMessage: "",
    lastMessageTime: "",
    notification: 0,
    emotion: ""
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
     
      
     dispatch(resetcreateChat())
     dispatch(resetcreateChatTable())
     dispatch(resetfetchChat())  


      setMoreUserData({
        chatId: "",
        participants: [],
        lastMessage: "",
        lastMessageTime: "",
        notification: 0,
        emotion: ""
      });
      setMoreOpponentData({
        chatId: "",
        participants: [],
        lastMessage: "",
        lastMessageTime: "",
        notification: 0,
        emotion: ""
      });
    });
  
    return unsubscribe;
  }, [navigation]);

  // Function to update moreUserData
  const updateMoreUserData = (newData) => {
    setMoreUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

 
  const updateMoreOpponentData = (newData) => {
    setMoreOpponentData(prevData => ({
      ...prevData,
      ...newData
    }));
  };


  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const gotoChatScreen = async (item) => {  
    setListclickLoading(true);
    
      
    let moreUserData1 = {
      chatId : user.id,
      participants:item.participants,
      lastMessage: item.lastMessage,
      lastMessageTime: item.lastMessageTime,
      notification:item.notification,
      emotion:item.emotion
     }

     let moreOpponentData1 = {
      chatId : item.opponent.id,
      participants:item.participants,
      lastMessage: item.lastMessage,
      lastMessageTime: item.lastMessageTime,
      notification:item.notification,
      emotion:item.emotion
     }  

     //console.log(moreUserData1);
     setSelectchat(item.opponent);
     updateMoreUserData(moreUserData1);
     updateMoreOpponentData(moreOpponentData1); 
     
   
         
     await dispatch(createChatTable(moreUserData1, moreOpponentData1));
     await dispatch(fetchChat(moreUserData1));

     
     
     
  };

  useEffect(() => {
   
    if (createChatTableLoading) {

      console.log('createChatTableLoading ', createChatTableLoading)
      setListclickLoading(false);     
      
      dispatch(resetcreateChat())
     dispatch(resetcreateChatTable())
     dispatch(resetfetchChat())
      
      console.log(createChatTabledata);
      //console.log(moreUserData);

    // navigation.navigate('ChatStack', {
    //   chatUser: selectchat,   
    //   loadfetchChatdata:fetchChatData,      
    //   moreUserData:moreUserData,
    //   moreOpponentData:moreOpponentData
    // });      
  }   
}, [dispatch, createChatTableLoading,fetchChatData]);






  const gotoContactScreen = () => {
    navigation.navigate('ContactScreen');
  };

  useEffect(() => { 
    const callchatList = async() => {
      await dispatch(fetchChatList(user));   
    };
    callchatList();        
  }, [dispatch,user]);


  useEffect(() => {
    if (chatList) {
      //console.log('my chatlist:', chatList);
  
      const mergedData = chatList.chatListDatas.map((chatItem) => {
        const opponentItem = chatList.opponentDatas.find((opponent) => {
          return chatItem.chatId.includes(opponent.id);
        });
  
        // Filter out items with empty or falsy lastMessage
        if (!chatItem.lastMessage) {
          return null; // Exclude this item
        }
  
        return {
          ...chatItem,
          opponent: opponentItem,
        };
      }).filter(Boolean); // Remove null items
  
      setChatListData(mergedData);
    }
  }, [dispatch, chatList]);
  

    
   if(chatListLoading)
  {
    return (
      <LoadingScreen />
    )
  }

  if(listclickLoading)
  {
    return (
      <LoadingScreen />
    )
  }
  
  return (
    <BackgroundImage>
     
      <Header openModal={openModal} gotoContactScreen={gotoContactScreen} chatsearch={true} labeltxt={user.name} pageidx={0}  />

      <Animated.View style={styles.containerBottomContact}  >
              
       <FlatList 
          data={chatListData}
          keyExtractor={item => item.chatId}
          renderItem={({ item }) => (

        <ChatList item={item} gotoChatScreen={gotoChatScreen} />
          )}
          contentContainerStyle={styles.flatListContentContainer} // Add this line
          
        />
      
     
      </Animated.View>   

      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />

    </BackgroundImage>
  );
};

export default ChatListScreen;
