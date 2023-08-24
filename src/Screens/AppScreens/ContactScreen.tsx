import React, { useState, useEffect } from 'react';
import {
  View,
  Animated, 
  Text
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Header from '../../Components/Header';
import ModelPopup from '../../Components/ModelPopup';
import BackgroundImage from '../../Components/BackgroundImage';
import { useDispatch, useSelector } from 'react-redux'

const ContactScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user, isLoading, error } = userLogin
  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
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

  return (
    <BackgroundImage>
      <View style={styles.containerTop}>

      <Header openModal={openModal}  chatsearch={true} labeltxt={user.name} pageidx={1} chatuserimg={'0'} />
       
      </View>

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >

                      
      <Text style={styles.notificationText}>ContactScreen</Text>

       
      </Animated.View>

      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />
    </BackgroundImage>
  );
};


export default ContactScreen;
