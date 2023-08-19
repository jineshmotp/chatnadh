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
      userName: 'Nikhila Vimal',
      userImg: require('../../Images/user/user-1.jpg'),
      messageTime: '4 mins ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '2',
      userName: 'Meenakshi Thambi',
      userImg: require('../../Images/user/user-2.jpg'),
      messageTime: '2 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '3',
      userName: 'Aparna Balamurali',
      userImg: require('../../Images/user/user-3.jpg'),
      messageTime: '1 hours ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '4',
      userName: 'Aparna Babu',
      userImg: require('../../Images/user/user-4.jpg'),
      messageTime: '1 day ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '5',
      userName: 'Aditi Ravi',
      userImg: require('../../Images/user/user-5.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '6',
      userName: 'Anu Sithara',
      userImg: require('../../Images/user/user-6.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },

    {
      id: '7',
      userName: 'Jasnaya Jayadeesh',
      userImg: require('../../Images/user/user-4.jpg'),
      messageTime: '2 days ago',
      messageText:'Hey there, this is my test for a post of my social app in React Native.',
    },

    {
      id: '8',
      userName: 'Hima R',
      userImg: require('../../Images/user/user-3.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },


    {
      id: '9',
      userName: 'Deepthi D',
      userImg: require('../../Images/user/user-2.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
      id: '10',
      userName: 'Sharanya Sharu',
      userImg: require('../../Images/user/user-1.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },

    {
      id: '11',
      userName: 'Mariben',
      userImg: require('../../Images/user/user-2.jpg'),
      messageTime: '2 days ago',
      messageText:
        'Hey there, this is my test for a post of my social app in React Native.',
    },
  ];
  
   
  
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

  
  return (
    <BackgroundImage>
       {isContainerTopVisible && (
        <View style={styles.containerTop}>
          <Header openModal={openModal} labeltxt="Conversations" pageidx={0} chatuserimg={'0'} />
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
            <TouchableOpacity  style={styles.ChatListCard} 
            onPress={() => {
              console.log('Navigating with item:', item);
              navigation.navigate('ChatStack', { chatData: item });
            }}
            >
              <View style={styles.ChatListUserInfo}>
                <View >
                  <Image source={item.userImg} style={styles.ChatListUserImg} />
                </View>
                <View style={styles.ChatListTextSection}>
                  <View style={styles.ChatListUserInfoText}>
                    <Text style={styles.ChatListUserName}>{item.userName}</Text>
                    <Text style={styles.ChatListPostTime}>{item.messageTime}</Text>
                  </View>
                              <Text
                      style={styles.ChatListMessageText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.messageText}
                    </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContentContainer} // Add this line
          
        />

     
     
      </Animated.View>   

      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />

    </BackgroundImage>
  );
};

export default ChatListScreen;
