import React, { useState, useRef, useEffect, } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';


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

import { formatDate } from '../../Utilities/dateUtils';
import { resetcreateChatTable, createChat, fetchChat,resetcreateChat,resetfetchChat, } from '../../Redux/chatActions';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useFocusEffect } from '@react-navigation/native';


type RootStackParamList = {
  ChatStack: {
    chatUser: any; // Replace 'any' with the actual type of chatUser
    loadfetchChatdata: any; // Replace 'any' with the actual type of loadfetchChatdata
    moreUserData: any; // Replace 'any' with the actual type of moreUserData
    moreOpponentData: any; // Replace 'any' with the actual type of moreOpponentData
  };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatStack'>;
type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ChatStack'>;

type Props = {
  route: ChatScreenRouteProp;
  navigation: ChatScreenNavigationProp;
};

const ChatScreen: React.FC<Props> = ({ route }) => {
  const { chatUser,loadfetchChatdata, moreUserData, moreOpponentData } = route.params;

  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
  const [chatUsers, setChatUser] = useState(chatUser);
  const [moreUserDatas, setMoreUserDatas] = useState(moreUserData);
  const [moreOpponentDatas, setMoreOpponentDatas] = useState(moreOpponentData);

  const [inputMessage, setInputMessage] = useState('');
  const [faceemotion, setFaceemotion] = useState('happiness');
  const scrollViewRef = useRef();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user, isLoading, error } = userLogin;
  const { fetchChatLoading, fetchChaterror, fetchChatData } = useSelector((state) => state.fetchChat);
  
  useEffect(() => {

    setChatUser(chatUser);
    setMoreUserDatas(moreUserData);
    setMoreOpponentDatas(moreOpponentData);
   
  }, [chatUser,moreUserData,moreOpponentData]);




  useEffect(() => {
    if(chatUsers && moreUserDatas && moreOpponentDatas)
    {
      //console.log(chatUsers.name);
      dispatch(resetcreateChatTable());
      dispatch(fetchChat(moreUserDatas));
    }    
  }, [dispatch,chatUsers,moreUserDatas,moreOpponentDatas]);


  useEffect(() => {
    scrollToBottom();
    if (fetchChatData) {
      //console.log(fetchChatData);
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
      chatId: moreUserDatas.chatId,
      senderId: user.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      delivered: false,
      emotion: faceemotion,
    };

    let moreUserChatData = {
      chatId: moreUserDatas.chatId,
      participants: moreUserDatas.participants,
      lastMessage: inputMessage,
      lastMessageTime: new Date(),
      notification: moreUserDatas.notification,
      emotion: faceemotion,
    };

    let moreUserMessageData = {
      messageId: uuid.v4(),
      chatId: moreUserDatas.chatId,
      senderId: user.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      delivered: false,
      emotion: faceemotion,
    };

    let moreOpponentChatData = {
      chatId: moreOpponentDatas.chatId,
      participants: moreUserDatas.participants,
      lastMessage: inputMessage,
      lastMessageTime: new Date(),
      notification: moreUserDatas.notification + 1,
      emotion: faceemotion,
    };

    let moreOpponentMessageData = {
      messageId: uuid.v4(),
      chatId: moreOpponentDatas.chatId,
      senderId: user.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      delivered: false,
      emotion: faceemotion,
    };

    dispatch(
      createChat(moreUserChatData, moreUserMessageData, moreOpponentChatData, moreOpponentMessageData)
    );

    setInputMessage(newMessage);
    scrollToBottom();
  };

  const renderItem = (item) => {
    const isUserMessage = item.senderId === user.id;
    const deliveredIcon = item.delivered ? (
      <Ionicons name="checkmark" size={wp('3%')} color={colors.white} />
    ) : null;

    return (
      <View
      key={item.messageId}
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
               {formatDate(item.timestamp)}
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
        
        labeltxt={chatUsers.name}
        onlinestatus={chatUsers.onlineStatus}
        pageidx={3}
        chatuserimg={chatUsers.img}
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

            </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChangeText={(text) => setInputMessage(text)}
                  onFocus={() => setKeyboardVisible(false)}
                />
                <TouchableOpacity onPress={onSend} style={[styles.sendButton,{backgroundColor:colors.transparent}]}>
                  <Icon name="send" size={wp('5%')} color={colors.white} />
                </TouchableOpacity>
              
            </View>



      </KeyboardAvoidingView>
    </BackgroundImage>
  );
};

export default ChatScreen;