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

import { featchChatList } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';


const ChatListScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(0)); // Adjust the initial value
  const [scrollOffset, setScrollOffset] = useState(0); // Track scroll offset
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [isContainerTopVisible, setContainerTopVisible] = useState(true); // State to manage containerTop visibility
  const navigation = useNavigation();

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user, isLoading, error } = userLogin
  
  const featchChatLists = useSelector(state => state.featchChatLists)
  const {chatList, chatListLoading, chatListerror } = featchChatLists


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
       dispatch(featchChatList(user));   
  }, []);

  useEffect(() => {
   if(chatList)
   {
    console.log('\n\n ',chatList)
    console.log('\n\nchatswithopponents :',chatList.chatsWithOpponents[0])
    console.log('\n\nchatswithopponents img :',chatList.chatsWithOpponents[0].opponent.img)
    console.log('\n\nfilteredChats :',chatList.filteredChats)
   }
}, [dispatch,chatList]);

    
  if(chatListLoading)
  {
    return(
      <LoadingScreen />
    )
  }
  
  return (
    <BackgroundImage>
       {/* {isContainerTopVisible && (
        <View style={styles.containerTop}>
          
        </View>
      )} */}


      <Header openModal={openModal} gotoContactScreen={gotoContactScreen} chatsearch={true} labeltxt={user.name} pageidx={0}  />

      <Animated.View style={styles.containerBottomContact}  >
              
      <FlatList 
          data={chatList}
          keyExtractor={item => item.id}
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
