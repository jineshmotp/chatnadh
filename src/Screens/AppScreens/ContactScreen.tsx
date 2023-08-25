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
import data from '../../data/messages';
import ContactList from '../../Components/ContactList';
import ContactScreenHeader from '../../Components/ContactScreenHeader';

const ContactScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user, isLoading, error } = userLogin
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const gotoChatScreen = (item) => {
    navigation.navigate('ChatStack', { chatData: item });
  };

  const gotoSearch = () => {
    
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
    
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

  return (
    <BackgroundImage>



      {/* <View style={styles.containerTop}> */}

      {/* <KeyboardAvoidingView    
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
  > */}

     
      {/* <View style={styles.containerTop}> 
        <Header openModal={openModal}  chatsearch={true} labeltxt={user.name} pageidx={1}  isKeyboardOpen={isKeyboardOpen} />
      </View> */}

     {/* </KeyboardAvoidingView>
      </View> */}

      
      <ContactScreenHeader openModal={openModal} onSearch={gotoSearch} />

      <Animated.View
        style={[
          styles.containerBottomContact,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >

                      
        <FlatList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (

        <ContactList item={item} gotoChatScreen={gotoChatScreen} />
          )}
          contentContainerStyle={styles.flatListContentContainer} // Add this line
          
        />

       
      </Animated.View>
      
    
      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />
    </BackgroundImage>
  );
};


export default ContactScreen;
