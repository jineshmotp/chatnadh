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

  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch>();

  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(0)); // Adjust the initial value
  const [scrollOffset, setScrollOffset] = useState(0); // Track scroll offset
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [isContainerTopVisible, setContainerTopVisible] = useState(true); // State to manage containerTop visibility
  
  const [chatListData, setChatListData] = useState([]); // Merged chat list data
  

  interface RootState {
    userLogin: {
      user: {
      id: string;
      about: string;
      accountactivation: number;
      emailId: string;
      hasStory: boolean;
      img: string;
      lastMessage: string;
      name: string;
      notification: number;
      onlineStatus: boolean;
      password: string;
      time: string;
      };
      isLoading: boolean;
      error: string | null;
    };
    fetchChatLists:{
      fetchChatListData:any[];
      fetchChatListLoading:boolean;
      fetchChatListerror:string | null;

    };
    createChatTable: {
      createChatTableData: any[]; // Replace with the actual type
      createChatTableLoading: boolean;
      createChatTableerror: string | null;
    };   
    fetchChat: {
      fetchChatData: any[]; // Replace with the actual type
      fetchChatLoading: boolean;
      fetchChaterror: string | null;
    };
  }
  
  const {user, isLoading, error } = useSelector((state: RootState) => state.userLogin);
  const {fetchChatListData, fetchChatListLoading, fetchChatListerror } = useSelector((state: RootState) =>  state.fetchChatLists)
  const { createChatTableData, createChatTableLoading, createChatTableerror } = useSelector((state: RootState) => state.createChatTable);
  const { fetchChatData, fetchChatLoading, fetchChaterror } = useSelector((state: RootState) => state.fetchChat);
  
  const [listclickLoading, setListclickLoading] = useState(false);
  const [selectchat, setSelectchat] = useState({
    id: '',
    about: '',   
    emailId: '',
    hasStory: false,
    img: '',
    name: '',
    onlineStatus: false,
  });
  
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
      // Reset the state variables when navigating away from ChatListScreen
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
  const updateMoreUserData = (newData: Partial<typeof moreUserData>) => {
    setMoreUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

 
  const updateMoreOpponentData = (newData: Partial<typeof moreOpponentData>) => {
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

  interface ContactItem {

    chatId:string;
    emotion:string;
    lastMessage: string;
    lastMessageTime:string; 
    notification: number;
    opponent:{
        id: string;
        about: string;
        accountactivation: number;
        emailId: string;
        hasStory: boolean;
        img: string;    
        name: string;    
        onlineStatus: boolean;
        password: string;
        time: string;
    };
    participants:any[];    
    // Add any other properties as needed
  }

  const gotoChatScreen = async (item: ContactItem) => {
    setListclickLoading(true);
     
    console.log('item val :',item)
      
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

     dispatch(resetcreateChat())
     dispatch(resetcreateChatTable())
     dispatch(resetfetchChat())

     //console.log(moreUserData1);
     setSelectchat(item.opponent);
     updateMoreUserData(moreUserData1);
     updateMoreOpponentData(moreOpponentData1);  

     await dispatch(createChatTable(moreUserData1, moreOpponentData1));
     await dispatch(fetchChat(moreUserData1));   
     
  };

  useEffect(() => {
   
    if (createChatTableLoading) {

       console.log('fetchChatData :',fetchChatData);
      setListclickLoading(false);     
      
      
      
      console.log(createChatTableData);
      //console.log(moreUserData);

    navigation.navigate('ChatStack', {
      chatUser: selectchat,   
      loadfetchChatdata:fetchChatData,      
      moreUserData:moreUserData,
      moreOpponentData:moreOpponentData
    });      
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
    if (fetchChatListData && fetchChatListData.chatListDatas) {

     // console.log('fetchChatListData :',fetchChatListData);

      const mergedData = fetchChatListData.chatListDatas.map((chatItem) => {
        const opponentItem = fetchChatListData.opponentDatas.find((opponent) => {
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
  }, [dispatch, fetchChatListData]);
  

    
   if(fetchChatListLoading)
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
