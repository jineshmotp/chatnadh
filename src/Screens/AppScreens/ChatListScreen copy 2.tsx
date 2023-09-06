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

import { fetchChatList,resetfetchChat,resetcreateChat,resetfetchChatList,createChatTable,fetchChat, resetcreateChatTable } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';

import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';

import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

const ChatListScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch>();

  type ChatStackRouteProps = RouteProp<ParamListBase, 'ChatStack'>;

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
  
  const [hasNavigatedToChat, setHasNavigatedToChat] = useState(false);
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
    setSelectchat(item.opponent);
    
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

     //console.log(moreUserData1);
     
     updateMoreUserData(moreUserData1);
     updateMoreOpponentData(moreOpponentData1);  

     await dispatch(createChatTable(moreUserData1, moreOpponentData1));
     await dispatch(fetchChat(moreUserData1));   
     
  };

  const isFocused = useIsFocused();

useEffect(() => {
  if (fetchChatData && fetchChatData.length > 0 && !fetchChatLoading) {
    setListclickLoading(false);

    console.log('fetchChatData ChatList Screen 1:', fetchChatData);
    console.log('fetchChatLoading ChatList Screen 1:', fetchChatLoading);
    console.log(selectchat);

    navigation.navigate('ChatStack', {
      chatUser: selectchat,
      loadfetchChatdata: fetchChatData,
      moreUserData: moreUserData,
      moreOpponentData: moreOpponentData,
    } as ChatStackRouteProps);
  }
}, [fetchChatData, fetchChatLoading]);


  const gotoContactScreen = async() => {  
 
      await dispatch(resetfetchChat());

      if(!fetchChatData)
      {

      navigation.reset({
        index: 0, // The index of the screen you want to navigate to in the stack
        routes: [{ name: 'ContactStack' }], // The name of the route you want to navigate to
      });  
    } 
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
  }, [fetchChatListData]);
  

    
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
