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

import { fetchChatList,resetfetchChat,resetcreateChat,resetfetchChatList,resetcreateChatTable } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';

import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';

const ChatListScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch>();

  type ChatStackRouteProps = RouteProp<ParamListBase, 'ChatStack'>;

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility

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
   
  }
  
  const {user, isLoading, error } = useSelector((state: RootState) => state.userLogin);
  const {fetchChatListData, fetchChatListLoading, fetchChatListerror } = useSelector((state: RootState) =>  state.fetchChatLists)
   
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
      // Reset all relevant state variables here
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
      // Reset any other state variables if needed
    });
    return unsubscribe;
  }, [navigation]);


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
       
    const participants: string[] = [user.id, item.opponent.id];
    const chatIdFromUser = `${user.id}_${item.opponent.id}`;
    const chatIdFromOpponent = `${item.opponent.id}_${user.id}`;
      
    const moreUserData1: Partial<typeof moreUserData> = {
      chatId : chatIdFromUser,
      participants: participants as string[],
      lastMessage: item.lastMessage,
      lastMessageTime: item.lastMessageTime,
      notification:item.notification,
      emotion:item.emotion
     }

     const moreOpponentData1: Partial<typeof moreOpponentData> = {
      chatId : chatIdFromOpponent,
      participants: participants as string[],
      lastMessage: item.lastMessage,
      lastMessageTime: item.lastMessageTime,
      notification:item.notification,
      emotion:item.emotion
     }        

     navigation.navigate('ChatStack', {
      chatUser: item.opponent,    
      moreUserData: moreUserData1,
      moreOpponentData: moreOpponentData1,
    } as ChatStackRouteProps);
     
  };
  

  const gotoContactScreen = async() => { 

      await dispatch(resetfetchChat());    

      navigation.reset({
        index: 0, // The index of the screen you want to navigate to in the stack
        routes: [{ name: 'ContactScreen' }], // The name of the route you want to navigate to
      });     
  };

  useEffect(() => {
    const callchatList = async () => {
      await dispatch(resetcreateChat());
      await dispatch(resetcreateChatTable());
      await dispatch(resetfetchChat());
      await dispatch(resetfetchChatList());
      await dispatch(fetchChatList(user));
    };
    callchatList();
  }, [dispatch, user]);



  useEffect(() => {
    if (fetchChatListData && fetchChatListData.chatListDatas) {
  
      const mergedData = fetchChatListData.chatListDatas.map((chatItem) => {
        const opponentItem = fetchChatListData.opponentDatas.find((opponent) => {
          return chatItem.chatId.includes(opponent.id);
        });
  
       
        if (!chatItem.lastMessage) {
          return null; 
        }
  
        return {
          ...chatItem,
          opponent: opponentItem,
        };
      }).filter(Boolean); // Remove null items
  
      setChatListData(mergedData);
    }
  }, [fetchChatListData]);
  

    
   if(fetchChatListLoading)
  {
    return (
      <LoadingScreen />
    )
  }
 
  return (
    <BackgroundImage>
     
      <Header openModal={openModal} gotoContactScreen={gotoContactScreen} chatsearch={true} labeltxt={user.name} pageidx={0}  />

      <Animated.View style={styles.containerBottomContact} >
              
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
