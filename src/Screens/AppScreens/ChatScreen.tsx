import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { resetcreateChatTable, createChat, fetchChat } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';

import BackgroundImage from '../../Components/BackgroundImage';
import Header from '../../Components/Header';
import FaceEmotion from '../../Components/FaceEmotion';
import styles from './styles';

import { colors } from '../../Constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ChatScreen = ({ route }) => {
  const { chatUser, fetchChatResult, moreUserData, moreOpponentData } = route.params;

  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [faceemotion, setFaceemotion] = useState('happiness');
  const scrollViewRef = useRef();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user, isLoading, error } = userLogin;
  const { fetchChatLoading, fetchChaterror, fetchChatData } = useSelector(
    (state) => state.fetchChat
  );

  useEffect(() => {
    dispatch(resetcreateChatTable());
    dispatch(fetchChat());
  }, []);

  useEffect(() => {
    if (fetchChatData) {
      setMessages(fetchChatData);
      scrollToBottom();
    }
  }, [dispatch, fetchChatData]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const onSend = () => {
    if (inputMessage.trim() === '') return;

    const newMessage = {
      messageId: uuid.v4(),
      chatId: moreUserData.chatId,
      senderId: user.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      delivered: false,
      emotion: faceemotion,
    };

    let moreUserChatData = {
      chatId: moreUserData.chatId,
      participants: moreUserData.participants,
      lastMessage: inputMessage,
      lastMessageTime: new Date(),
      notification: moreUserData.notification,
      emotion: faceemotion,
    };

    let moreUserMessageData = {
      messageId: uuid.v4(),
      chatId: moreUserData.chatId,
      senderId: user.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      delivered: false,
      emotion: faceemotion,
    };

    let moreOpponentChatData = {
      chatId: moreOpponentData.chatId,
      participants: moreUserData.participants,
      lastMessage: inputMessage,
      lastMessageTime: new Date(),
      notification: moreUserData.notification + 1,
      emotion: faceemotion,
    };

    let moreOpponentMessageData = {
      messageId: uuid.v4(),
      chatId: moreOpponentData.chatId,
      senderId: user.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      delivered: false,
      emotion: faceemotion,
    };

    dispatch(
      createChat(moreUserChatData, moreUserMessageData, moreOpponentChatData, moreOpponentMessageData)
    );

    setInputMessage('');
    scrollToBottom();
  };

  const renderItem = (item) => {
    const isUserMessage = item.senderId === user.id;
    const deliveredIcon = item.delivered ? (
      <Ionicons name="checkmark" size={wp('3%')} color={colors.white} />
    ) : null;

    return (
      <View
        key={item.id}
        style={[
          styles.messageContainer1,
          {
            alignSelf: isUserMessage ? 'flex-end' : 'flex-start',
            backgroundColor: isUserMessage ? colors.primary : colors.secondary,
            borderColor: isUserMessage ? colors.primary : colors.secondary,
          },
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isUserMessage ? colors.primary : colors.secondary,
              borderColor: isUserMessage ? colors.primary : colors.secondary,
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

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
      scrollToBottom();  
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      scrollToBottom();  
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      scrollToBottom();      
    };
  }, []);

  const handleContentSizeChange = () => {
    if (!keyboardVisible) {
      scrollToBottom();     
    }
  };

  return (
    <BackgroundImage>
      <Header
        
        labeltxt={chatUser.name}
        onlinestatus={chatUser.onlineStatus}
        pageidx={3}
        chatuserimg={chatUser.img}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp('10%') : 0} // Adjust the offset as needed
      >

                   
                    
            <View style={styles.Messagecontainer}>

           
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={styles.scrollViewContent}
                        onContentSizeChange={handleContentSizeChange}
                        keyboardShouldPersistTaps="handled" // Add this line
                      >
                        {messages.map(renderItem)}
                      </ScrollView>

              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChangeText={(text) => setInputMessage(text)}
                  onFocus={() => setKeyboardVisible(false)}
                />
                <TouchableOpacity onPress={onSend} style={styles.sendButton}>
                  <Icon name="send" size={wp('5%')} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>



      </KeyboardAvoidingView>
    </BackgroundImage>
  );
};

export default ChatScreen;