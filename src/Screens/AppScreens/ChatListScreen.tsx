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

const ChatListScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(0)); // Adjust the initial value
  const [scrollOffset, setScrollOffset] = useState(0); // Track scroll offset
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [isContainerTopVisible, setContainerTopVisible] = useState(true); // State to manage containerTop visibility
  const navigation = useNavigation();
  
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
          <Header openModal={openModal} chatsearch={true} labeltxt="Conversations" pageidx={0} chatuserimg={'0'}  />
        </View>
      )}

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim },
        ]}
      >
              

      <FlatList 
          data={data}
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
