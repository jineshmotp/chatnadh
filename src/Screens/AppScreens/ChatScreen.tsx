import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  ScrollView,
  FlatList,
  Image 
} from 'react-native';
import ModelPopup from '../../Components/ModelPopup';
import Header  from '../../Components/Header';
import styles from './styles';
import BackgroundImage from '../../Components/BackgroundImage';


const ChatScreen = ({ route }) => {
  const { chatData } = route.params;
  const [fadeAnim] = useState(new Animated.Value(0));
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  const [isContainerTopVisible, setContainerTopVisible] = useState(true); // State to manage containerTop visibility

  
  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Use JavaScript animation driver
    }).start();
  }, [fadeAnim]);

  
  return (
    <BackgroundImage>
       {isContainerTopVisible && (
        <View style={styles.containerTop}>
          <Header openModal={openModal} labeltxt={chatData.userName} pageidx={1} chatuserimg={chatData.userImg} />
        </View>
      )}

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim },
        ]}
      >

     
     
      <Text style={styles.notificationText}>Chat Screen</Text>
      </Animated.View>   

      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />

    </BackgroundImage>
  );
};

export default ChatScreen;
