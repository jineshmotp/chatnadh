import React, { useState, useEffect } from 'react';
import {
  View,
  Animated, 
  Text,
  FlatList,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Header from '../../Components/Header';
import ModelPopup from '../../Components/ModelPopup';
import BackgroundImage from '../../Components/BackgroundImage';
import { useDispatch, useSelector } from 'react-redux'
// import data from '../../data/messages';
import ContactList from '../../Components/ContactList';
import ContactScreenHeader from '../../Components/ContactScreenHeader';

import { getallContacts } from '../../Redux/chatActions';
import LoadingScreen from '../../Components/LoadingScreen';

const ContactScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);


  const dispatch = useDispatch()
  const {user, isLoading, error } = useSelector(state => state.userLogin)
  const { chatcontacts, chatisLoading, chaterror } = useSelector(state => state.getallContacts);
  

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

  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const gotoChatScreen = (item) => {
    navigation.navigate('ChatStack', { chatData: item });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  

   
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

  if(chatisLoading)
  {
    <LoadingScreen/>
  }

  return (
    <BackgroundImage>

<ContactScreenHeader openModal={openModal} onSearch={handleSearch} />

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
            <ContactList item={item} gotoChatScreen={gotoChatScreen} />
          )}
          contentContainerStyle={styles.flatListContentContainer}
        />

       
      </Animated.View>
      
    
      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />
    </BackgroundImage>
  );
};


export default ContactScreen;