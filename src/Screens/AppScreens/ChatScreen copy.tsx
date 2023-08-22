import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity
} from 'react-native';
import ModelPopup from '../../Components/ModelPopup';
import Header  from '../../Components/Header';
import styles from './styles';
import BackgroundImage from '../../Components/BackgroundImage';
import { colors } from '../../Constants/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


import moment from 'moment';


const ChatScreen = ({ route }) => {
  const { chatData } = route.params;
  
   const [messages, setMessages] = useState([]);
   const [inputMessage, setInputMessage] = useState('');
   const flatListRef = useRef();
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    // Sample messages for the user and the opponent
    const initialMessages = [
      {
        id: 1,
        text: "Hello! How's it going?",
        timestamp: new Date('2023-08-21T10:30:00Z'),
        user: { id: 2, name: 'Opponent' },
        delivered: true,
        faceemotion:'sad'
      },
      {
        id: 2,
        text: 'Hey, I am doing well. How about you?',
        timestamp: new Date('2023-08-21T10:35:00Z'),
        user: { id: 1, name: 'You' },
        delivered: true,
        faceemotion:'happy'
      },

      {
        id: 3,
        text: 'Hey, I am doing well. How about you?',
        timestamp: new Date('2023-08-21T10:35:00Z'),
        user: { id: 1, name: 'You' },
        delivered: true,
        faceemotion:'happy'
      },
      // Add more sample messages here
    ];

    setMessages(initialMessages);
  }, []);


  const onSend = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      timestamp: new Date(),
      user: { id: 1, name: 'You' },
      delivered: false,
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd();
    }
  };

  const renderItem = ({ item }) => {
    const isUserMessage = item.user.id === 1;
    const deliveredIcon = item.delivered ? (
      <Ionicons name="checkmark" size={wp('3%')} color={colors.white} />
    ) : null;
  
    return (
      <View
        style={[
          styles.messageContainer,
          { alignSelf: isUserMessage ? 'flex-end' : 'flex-start' ,
          backgroundColor: isUserMessage ?  colors.primary :  colors.secondary,
          borderColor: isUserMessage ?  colors.primary :  colors.secondary, 
        },
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isUserMessage ? colors.primary : colors.secondary,
              borderColor:isUserMessage ? colors.primary : colors.secondary,
              borderBottomRightRadius: isUserMessage ? 0 : 10,
              borderBottomLeftRadius: isUserMessage ? 10 : 0,
            },
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.timestampText}>
            {moment(item.timestamp).format('h:mm A')}
            {deliveredIcon}
          </Text>
        </View>
      </View>
    );
  };



  return (
    <BackgroundImage>
      
        <View style={styles.containerTop}>
          <Header openModal={openModal} labeltxt={chatData.username} onlinestatus={chatData.onlineStatus} pageidx={1} chatuserimg={chatData.picture} />
        </View>  

         <View style={styles.containerBottomChat} >


        
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
            />

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChangeText={(text) => setInputMessage(text)}
                  />

                  <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                    {/* Replace the "Send" button with a send icon */}
                    <Icon name="send" size={wp('5%')} color={colors.white} />
                  </TouchableOpacity>
                </View>
                    
        
         </View>

    </BackgroundImage>
  );
};

export default ChatScreen;