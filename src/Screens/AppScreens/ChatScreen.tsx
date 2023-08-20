import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  FlatList,
  Image 
} from 'react-native';
import ModelPopup from '../../Components/ModelPopup';
import Header  from '../../Components/Header';
import styles from './styles';
import BackgroundImage from '../../Components/BackgroundImage';

import { GiftedChat } from 'react-native-gifted-chat'


const ChatScreen = ({ route }) => {
  const { chatData } = route.params;
  const [messages, setMessages] = useState([])
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [isContainerTopVisible, setContainerTopVisible] = useState(true); // State to manage containerTop visibility

  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Use JavaScript animation driver
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <BackgroundImage>
       {isContainerTopVisible && (
        <View style={styles.containerTop}>
          <Header openModal={openModal} labeltxt={chatData.userName} pageidx={1} chatuserimg={chatData.userImg} />
        </View>
      )}

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim },
        ]}
      >

     
    
      
      </Animated.View> 

    </BackgroundImage>
  );
};

export default ChatScreen;
