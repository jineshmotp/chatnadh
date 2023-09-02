import React, { useState, useEffect } from 'react';
import {
  View,
  Animated, 
  Text,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Header from '../../Components/Header';
import ModelPopup from '../../Components/ModelPopup';
import BackgroundImage from '../../Components/BackgroundImage';
import { useDispatch, useSelector } from 'react-redux'
import ContactList from '../../Components/ContactList';
import ContactScreenHeader from '../../Components/ContactScreenHeader';

import { getallContacts,createChatTable } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';

const ContactScreen = () => {

  const navigation = useNavigation();

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [selectchat, setSelectchat] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
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


  const dispatch = useDispatch()
  const {user, isLoading, error } = useSelector(state => state.userLogin)
  const { createChatTableLoading, createChatTabledata,createChatTableerror } = useSelector(state => state.createChatTable)
  const { chatcontacts, chatisLoading, chaterror } = useSelector(state => state.getallContacts);
   
  // Function to update moreUserData
  const updateMoreUserData = (newData) => {
    setMoreUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

 
  const updateMoreOpponentData = (newData) => {
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

  const gotoChatScreen = async (item) => {
    setListclickLoading(true);
    setSelectchat(item);

    let participants = [];
  
    participants.push(user.id);
    participants.push(item.id);
    
    const chatIdFromUser = `${user.id}_${item.id}`;
    const chatIdFromOpponent = `${item.id}_${user.id}`;

    let moreUserData1 = {
      chatId : chatIdFromUser,
      participants:participants,
      lastMessage: "",
      lastMessageTime: "",
      notification:0,
      emotion:""
     }

     let moreOpponentData1 = {
      chatId : chatIdFromOpponent,
      participants: participants,
      lastMessage: "",
      lastMessageTime: "",
      notification:0,
      emotion:""
     }  

     updateMoreUserData(moreUserData1);
     updateMoreOpponentData(moreOpponentData1);
  
  dispatch(createChatTable(moreUserData1, moreOpponentData1));
 
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    dispatch(getallContacts(user));
  }, [dispatch, user]);

  useEffect(() => {
    // Filter the original contacts based on the search query
    const filtered = chatcontacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchQuery, chatcontacts]);



  useEffect(() => {
    if (createChatTableLoading) {
      setListclickLoading(false);

      console.log('value returned');
                
      navigation.navigate('ChatStack', {
        chatUser: selectchat,
        fetchChatResult: createChatTabledata,
        moreUserData:moreUserData,
        moreOpponentData:moreOpponentData
      });
    
    }


  }, [dispatch, createChatTableLoading]);

    
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
  

<ContactScreenHeader openModal={openModal} onSearch={handleSearch} />

   {/* { listclickLoading ? ( <ActivityIndicator />): null } */}

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
            <ContactList item={item} gotoChatScreen={gotoChatScreen}  />
          )}
          contentContainerStyle={styles.flatListContentContainer}
        />

       
      </Animated.View>
      
    
      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />
    </BackgroundImage>
  );
};


export default ContactScreen;