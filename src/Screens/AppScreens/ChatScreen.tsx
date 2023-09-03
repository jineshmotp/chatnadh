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

import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';
import FaceEmotion from '../../Components/FaceEmotion';
import uuid from 'react-native-uuid';

import { resetcreateChatTable,createChat,fetchChat } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';


const ChatScreen = ({ route }) => {


  const { chatUser, fetchChatResult, moreUserData, moreOpponentData } = route.params;
  //const { chatData } = route.params;

  const navigation = useNavigation();

  
   const [messages, setMessages] = useState([]);
   const [inputMessage, setInputMessage] = useState('');
   const [faceemotion, setFaceemotion] = useState('happiness');
   const flatListRef = useRef();

   const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user, isLoading, error } = userLogin
  const { fetchChatLoading, fetchChaterror, fetchChatData } = useSelector(state => state.fetchChat);
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };



  useEffect(() => {
    // console.log(fetchChatResult);
    // if (fetchChatResult) {
    //   setMessages(fetchChatResult);
    // }
       dispatch(resetcreateChatTable());   
       dispatch(fetchChat());        
  }, []);

  useEffect(() => {
    if(fetchChatData)
    {
      console.log(fetchChatData)
     setMessages(fetchChatData);
     scrollToBottom();   
    }
   }, [dispatch, fetchChatData]);


  const onSend = () => {


    if (inputMessage.trim() === '') return;

    const newMessage = {  
      messageId:uuid.v4(),
      chatId : moreUserData.chatId, 
      senderId:user.id,
      content:inputMessage,
      timestamp:(new Date()).toISOString(),
      delivered:false,
      emotion:  faceemotion 
    };

    


    let moreUserChatData = {      
      chatId : moreUserData.chatId,
      participants:moreUserData.participants,
      lastMessage: inputMessage,
      lastMessageTime: new Date(),
      notification:moreUserData.notification,
      emotion:faceemotion
     }

     let moreUserMessageData = {
      messageId:uuid.v4(),
      chatId : moreUserData.chatId, 
      senderId:user.id,
      content:inputMessage,
      timestamp:(new Date()).toISOString(),
      delivered:false,
      emotion:  faceemotion 
     }

     let moreOpponentChatData = {     
      chatId : moreOpponentData.chatId,
      participants: moreUserData.participants,
      lastMessage: inputMessage,
      lastMessageTime: new Date(),
      notification:(moreUserData.notification + 1),
      emotion:faceemotion
     }  
    

     let moreOpponentMessageData = {
      messageId:uuid.v4(),
      chatId : moreOpponentData.chatId,
      senderId:user.id,
      content:inputMessage,
      timestamp:(new Date()).toISOString(),
      delivered:false,
      emotion:  faceemotion 
     }  
     
     dispatch(createChat(moreUserChatData,moreUserMessageData,moreOpponentChatData,moreOpponentMessageData));   
    //setMessages([...messages, newMessage]);
    setInputMessage('');
    scrollToBottom();
     
    };

   
    


  
  const renderItem = ({ item }) => {
    const isUserMessage = item.senderId === user.id;
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

            <FaceEmotion emotion={item.emotion} text={item.faceemotion} />
          
          
          <Text style={styles.messageText}>{item.content}</Text>
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
      
        {/* <View style={styles.containerTop}>
          
        </View>   */}

<Header openModal={openModal} labeltxt={chatUser.name} onlinestatus={chatUser.onlineStatus} pageidx={3} chatuserimg={chatUser.img} />

  
<KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : null}
  keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -150} // Adjust the offset as needed
>
          <View style={styles.containerBottomChat}>
            <Text style={{ color: 'black' }}>{moreUserData.chatId}</Text>

            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
              onContentSizeChange={() => scrollToBottom()}
            />

            <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={inputMessage}
                onChangeText={text => setInputMessage(text)}
                onFocus={() => scrollToBottom()} // Scroll to bottom when input is focused
              />

              <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                {/* Replace the "Send" button with a send icon */}
                <Icon name="send" size={wp('5%')} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

    </BackgroundImage>
  );
};

export default ChatScreen;
