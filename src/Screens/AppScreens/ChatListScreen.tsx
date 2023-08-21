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

const ChatListScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(0)); // Adjust the initial value
  const [scrollOffset, setScrollOffset] = useState(0); // Track scroll offset
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [isContainerTopVisible, setContainerTopVisible] = useState(true); // State to manage containerTop visibility
  const navigation = useNavigation();

  const Messages = [
    {
      id: '1',
      picture:require('../../Images/user/user-1.jpg'),
      username:"Nikhila Vimal",
      bio: "My life",
      lastMessage:"Hello How are you?",
      time:"4:00 PM",
      notification:3,
      isBlocked:false,
      isMuted:false,
      hasStory:false,
      onlineStatus:true,
     },    
    {
      id: '2',

      picture:require('../../Images/user/user-2.jpg'),
      username:"Meenakshi Thambi",
      bio: "My life",
      lastMessage:"Hello How are you?",
      time:"5:00 PM",
      notification:10,
      isBlocked:false,
      isMuted:false,
      hasStory:true,
      onlineStatus:true,
     },
    {
      id: '3',

      picture:require('../../Images/user/user-3.jpg'),
      username:"Aparna Balamurali",
      bio: "My life",
      lastMessage:"Hello How are you?",
      time:"6:00 PM",
      notification:1,
      isBlocked:false,
      isMuted:false,
      hasStory:false,
      onlineStatus:true,
     },
    {
      id: '4',

      picture:require('../../Images/user/user-4.jpg'),
      username:"Aparna Babu",
      bio: "My life",
      lastMessage:"Hello How are you?",
      time:"6:00 PM",
      notification:1,
      isBlocked:false,
      isMuted:false,
      hasStory:false,
      onlineStatus:false,
    },
    {
      id: '5',
      picture:require('../../Images/user/user-5.jpg'),
      username:"Aditi Ravi",
      bio: "My life",
      lastMessage:"Hello How are you?",
      time:"6:00 PM",
      notification:0,
      isBlocked:false,
      isMuted:false,
      hasStory:false,
      onlineStatus:true,
    },
    {
      id: '6',
      picture:require('../../Images/user/user-6.jpg'),
      username:"Anu Sithara",
      bio: "My life",
      lastMessage:"Hello How are you? hdsjksa adkadk as askdkasdk  asjdkaskdjasd kdkadk asj",
      time:"6:00 PM",
      notification:1,
      isBlocked:false,
      isMuted:false,
      hasStory:false,
      onlineStatus:true,
    }
  ];
  
   
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const gotoChatScreen = (item) => {
    navigation.navigate('ChatStack', { chatData: item });
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Use JavaScript animation driver
    }).start();
  }, [fadeAnim]);

  
  return (
    <BackgroundImage>
       {isContainerTopVisible && (
        <View style={styles.containerTop}>
          <Header openModal={openModal} labeltxt="Conversations" pageidx={0} chatuserimg={'0'}  />
        </View>
      )}

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim },
        ]}
      >
              

      <FlatList 
          data={Messages}
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
