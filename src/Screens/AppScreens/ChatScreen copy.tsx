import React, { useState, useRef, useEffect, } from 'react';
import {
  View,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView, 
  PermissionsAndroid,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

import ChatInput from '../../Components/ChatInput';

import ImagePicker from 'react-native-image-crop-picker';

import { requestImagePickerPermission } from '../../Utilities/requestImagePickerPermission';

type RootStackParamList = {
  ChatStack: {
    chatUser: any; // Replace 'any' with the actual type of chatUser
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
  const { chatUser,moreUserData, moreOpponentData } = route.params;

  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);
 
  const [inputMessage, setInputMessage] = useState('');
  const [faceemotion, setFaceemotion] = useState('happiness');
  const [imagedet, setImagedet] = useState('');
  const scrollViewRef = useRef();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user, isLoading, error } = userLogin;
  const { fetchChatLoading, fetchChaterror, fetchChatData } = useSelector((state) => state.fetchChat);
  
   useEffect(() => {
    dispatch(resetcreateChatTable());    
    callfetchchatdata();
   }, []);

   const callfetchchatdata = async() => {
   
    await dispatch(fetchChat(moreUserData));
    scrollToBottom();
    };
    
 

  useEffect(() => {
    scrollToBottom();
    if (fetchChatData) { 
      setMessages(fetchChatData);
      scrollToBottom();
    }
  }, [dispatch,fetchChatData]);

  
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  const clearInputMessage = () => {
    setInputMessage('');  
    setImagedet('');  
  };

  const handleMessageTextChange = (text) => {
    console.log('onSend called with text:', text);
    scrollToBottom();     
    setInputMessage(text);
  };

  const onAttachmentSend = async () => {
  //   console.log('attachment pressed');
  // const hasPermission = await requestImagePickerPermission();
  // console.log(hasPermission);

  //   if (hasPermission) {
    
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      })
        .then((image) => {
          // Now you can set the imagedet state with the image details
          
          setImagedet(image);
  
          let imgName = image.path.substring(image.path.lastIndexOf('/') + 1);
          let ext = imgName.split('.').pop();
          let name = imgName.split('.')[0];
          let newName = name + Date.now() + '.' + ext;
          
          console.log(image);
          onSend();
        })
        .catch((error) => {
          console.error('Image picker error:', error);
        });
    //}
  };

  const onSend = async() => {
    console.log('onSend called with textttttttttt:',imagedet);
               
    if (inputMessage.trim() === '' && imagedet === '') return;
   // console.log('input message',inputMessage);
    const newMessage = {
      messageId: uuid.v4(),
      chatId: moreUserData.chatId,
      senderId: user.id,
      content: inputMessage,
      timestamp: new Date().toISOString(),
      delivered: false,
      emotion: faceemotion,
      chatimg:image
    };
   
    setMessages([...messages, newMessage]);  
   

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
      chatimg:image
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
      chatimg:image
    };

    await dispatch(
      createChat(moreUserChatData, moreUserMessageData, moreOpponentChatData, moreOpponentMessageData)
    );
     
    callfetchchatdata();
    handleMessageTextChange('');
    scrollToBottom(); // Scroll to the bottom
    
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
          <FaceEmotion emotion={item.emotion} text={item.emotion} />

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

            </View>

            <ChatInput 
            onAttachmentSend={onAttachmentSend} 
            onSend={onSend} 
            handleMessageTextChange={handleMessageTextChange}
            clearInputMessage={clearInputMessage}
             />
                      

      </KeyboardAvoidingView>
    </BackgroundImage>
  );
};

export default ChatScreen;