import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';

import { useDispatch, useSelector } from 'react-redux'
import { logout,checkLoginStatus } from '../../redux-actions/userActions';
import { useRoute, useNavigation } from '@react-navigation/native';

import styles from './styles';
import Header from '../../Components/Header';
import ModelPopup from '../../Components/ModelPopup';

import LoadingScreen from '../../Components/LoadingScreen';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isModalVisible, setModalVisible] = useState(false); // State to manage modal visibility
  
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user,isLoading,error } = userLogin

  
  const gotoLogout = async () => {
    try {
      await dispatch(logout()); // Await the logout action     
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, you could display an error message to the user
    }
  };

  const gotosettings = async () => {
    navigation.navigate('SettingsStack');
  };

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
    <ImageBackground source={require('../../Images/background.jpg')} style={styles.main_container}>
      <View style={styles.containerTop}>

      <Header openModal={openModal}  labeltxt="Conversations" pageidx={0}/>
       
      </View>

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >

            <ButtonInput
              styless={{ width: wp('80%'), backgroundColor: colors.primary }}
              contentStyle={{ height: hp('7%') }}
              labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight: 'bold' }}
              onPress={gotoLogout}
              label="LOGOUT"
            />

              <ButtonInput
              styless={{ width: wp('80%'), backgroundColor: colors.primary }}
              contentStyle={{ height: hp('7%') }}
              labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight: 'bold' }}
              onPress={gotosettings}
              label="Settings"
            />


       
      </Animated.View>

      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />
    </ImageBackground>
  );
};


export default NotificationScreen;
