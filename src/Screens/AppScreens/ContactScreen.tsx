import React, { useState, useEffect } from 'react';
import {
  Animated, 
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import ModelPopup from '../../Components/ModelPopup';
import BackgroundImage from '../../Components/BackgroundImage';
import { useDispatch, useSelector } from 'react-redux'
import ContactList from '../../Components/ContactList';
import ContactScreenHeader from '../../Components/ContactScreenHeader';

import { getallContacts,createChatTable,fetchChat,
  fetchChatList,resetfetchChat,resetcreateChat,resetfetchChatList,resetcreateChatTable
} from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';

import { RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/routers';

const ContactScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch<Dispatch>();

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectchat, setSelectchat] = useState<ContactItem | null>(null);
  const [filteredContacts, setFilteredContacts] = useState<ContactItem[]>([]);
  const [listclickLoading, setListclickLoading] = useState(false);

  
  const [moreUserData, setMoreUserData] = useState({
    chatId: "",
    participants: [],
    lastMessage: "",
    lastMessageTime: "",
    notification: 0,
    emotion: ""
  });

  const [moreOpponentData, setMoreOpponentData] = useState({
    chatId: "",
    participants: [],
    lastMessage: "",
    lastMessageTime: "",
    notification: 0,
    emotion: ""
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      // Reset the state variables when navigating away from ChatListScreen
      setMoreUserData({
        chatId: "",
        participants: [],
        lastMessage: "",
        lastMessageTime: "",
        notification: 0,
        emotion: ""
      });
      setMoreOpponentData({
        chatId: "",
        participants: [],
        lastMessage: "",
        lastMessageTime: "",
        notification: 0,
        emotion: ""
      });
    });
  
    return unsubscribe;
  }, [navigation]);


  interface RootState {
  userLogin: {
    user: {
    id: string;
    about: string;
    accountactivation: number;
    emailId: string;
    hasStory: boolean;
    img: string;
    lastMessage: string;
    name: string;
    notification: number;
    onlineStatus: boolean;
    password: string;
    time: string;
    };
    isLoading: boolean;
    error: string | null;
  };
  createChatTable: {
    createChatTableData: any[]; // Replace with the actual type
    createChatTableLoading: boolean;
    createChatTableerror: string | null;
  };
  getallContacts: {
    getallContactsData: any[]; // Replace with the actual type
    getallContactsLoading: boolean;
    getallContactserror: string | null;
  };
  fetchChat: {
    fetchChatData: any[]; // Replace with the actual type
    fetchChatLoading: boolean;
    fetchChaterror: string | null;
  };
}

type ChatStackRouteProps = RouteProp<ParamListBase, 'ChatStack'>;

// Use the RootState type with useSelector
const { user, isLoading, error } = useSelector((state: RootState) => state.userLogin);
const { createChatTableData, createChatTableLoading, createChatTableerror } = useSelector((state: RootState) => state.createChatTable);
const { getallContactsData, getallContactsLoading, getallContactserror } = useSelector((state: RootState) => state.getallContacts);
const { fetchChatData, fetchChatLoading, fetchChaterror } = useSelector((state: RootState) => state.fetchChat);
  


// Function to update moreUserData
  const updateMoreUserData = (newData: Partial<typeof moreUserData>) => {
    setMoreUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

 
  const updateMoreOpponentData = (newData: Partial<typeof moreOpponentData>) => {
    setMoreOpponentData(prevData => ({
      ...prevData,
      ...newData
    }));
  };




  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  interface ContactItem {
    id: string;
    about: string;
    accountactivation: number;
    emailId: string;
    hasStory: boolean;
    img: string;
    lastMessage: string;
    name: string;
    notification: number;
    onlineStatus: boolean;
    password: string;
    time: string;
    // Add any other properties as needed
  }

  const gotoChatScreen = async (item: ContactItem) => {
    setListclickLoading(true);
    setSelectchat(item);
  
    // Explicitly define participants as an array of strings
    const participants: string[] = [user.id, item.id];
      
    const chatIdFromUser = `${user.id}_${item.id}`;
    const chatIdFromOpponent = `${item.id}_${user.id}`;
  
    const moreUserData1: Partial<typeof moreUserData> = {
      chatId: chatIdFromUser,
      participants: participants as string[], // Correctly typed as string[]
      lastMessage: "",
      lastMessageTime: "",
      notification: 0,
      emotion: ""
    };
    
    const moreOpponentData1: Partial<typeof moreOpponentData> = {
      chatId: chatIdFromOpponent,
      participants: participants as string[], // Correctly typed as string[]
      lastMessage: "",
      lastMessageTime: "",
      notification: 0,
      emotion: ""
    };
  
    updateMoreUserData(moreUserData1);
    updateMoreOpponentData(moreOpponentData1);
  
    await dispatch(createChatTable(moreUserData1, moreOpponentData1));
    await dispatch(fetchChat(moreUserData1));
  };


  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const callContacts = async() => {
      await dispatch(resetcreateChat());
      await dispatch(resetcreateChatTable());
      await dispatch(resetfetchChat());
      await dispatch(resetfetchChatList());
      await dispatch(getallContacts(user));
    };
    callContacts();    

  }, [dispatch, user,navigation]);


  useEffect(() => {
    // Filter the original contacts based on the search query
    const filtered = getallContactsData.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchQuery, getallContactsData]);


  useEffect(() => {
    if (fetchChatData && !fetchChatLoading) {
      setListclickLoading(false);
      
      //console.log('fetchChatData Contact Screen 1 :', fetchChatData);

      console.log('fetchChatData Contact Screen 1');
                  
       navigation.navigate('ChatStack', {
        chatUser: selectchat,
        loadfetchChatdata: createChatTableData,
        moreUserData: moreUserData,
        moreOpponentData: moreOpponentData
      } as ChatStackRouteProps);

    }

  }, [fetchChatData,fetchChatLoading]);

    
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);


  if(listclickLoading)
  {
    return (
      <LoadingScreen />
    )
  }

   return (
    <BackgroundImage>
  

<ContactScreenHeader onSearch={handleSearch} />

  
      <Animated.View
        style={[
          styles.containerBottomContact,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >

                      
<FlatList 
          data={filteredContacts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ContactList item={item}  gotoChatScreen={gotoChatScreen}  />
          )}
          contentContainerStyle={styles.flatListContentContainer}
        />

       
      </Animated.View>
      
    
      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />
    </BackgroundImage>
  );
};


export default ContactScreen;