import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  FlatList,
  Image, 
  TouchableOpacity
} from 'react-native';
import ModelPopup from '../../Components/ModelPopup';
import Header  from '../../Components/Header';
import styles from './styles';
import BackgroundImage from '../../Components/BackgroundImage';
import { useNavigation } from '@react-navigation/native';
import ChatList from '../../Components/ChatList';

import data from '../../data/messages';
import { useDispatch, useSelector } from 'react-redux'

import { fetchChatList } from '../../Redux/chatActions';
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


  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const gotoChatScreen = (item) => {
    navigation.navigate('ChatStack', { chatData: item });
  };

  const gotoContactScreen = () => {
    navigation.navigate('ContactScreen');
  };

  useEffect(() => {
       dispatch(fetchChatList(user));   
  }, []);

  useEffect(() => {
    if (chatList) {
      //console.log('\n\n', chatList);
      // Merge opponent details with filtered chats
      const mergedChatList = chatList.filteredChats.map((chat) => {
        const opponent = chatList.opponentDetails.find(
          (opponent) => opponent.id !== user.id
        );
        return { ...chat, opponent };
      });
      setChatListData(mergedChatList);
      //console.log('value : ',mergedChatList);
    }
  }, [dispatch, chatList]);
  

    
  if(chatListLoading)
  {
    return(
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
