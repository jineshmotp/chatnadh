import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ModelPopup from '../../Components/ModelPopup';
import Header from '../../Components/Header';
import BackgroundImage from '../../Components/BackgroundImage';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux-actions/userActions';


const userImage = require('../../Images/chatnadh_logo.png'); // Replace with your user image asset

const SettingsScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(30));
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user,isLoading,error } = userLogin


  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

 
  
  const gotoLogout = async () => {
    try {
      await dispatch(logout()); // Await the logout action   
        
    } catch (error) {
      console.error('Logout failed:', error);
      if (error.message === 'No user currently signed in.') {
        // Handle the case where no user is signed in
        console.log('User is not currently signed in.');
      }
    }
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
        <Header openModal={openModal} labeltxt="Settings" pageidx={1} chatuserimg={'0'}  />
      </View>

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >
        <View style={styles.userInfoContainer}>
          <Image source={userImage} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.id}</Text>
            <Text style={styles.userEmail}>{user.emailId}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.detailLabel}>Date of Joining:</Text>
          <Text style={styles.detailText}>Jan 1, 2023</Text>
          <Text style={styles.detailLabel}>Date of Last Sign-In:</Text>
          <Text style={styles.detailText}>Aug 15, 2023</Text>
        </View>

        <ButtonInput
          styless={{ width: wp('80%'), backgroundColor: colors.primary, marginBottom: hp('3%') }}
          contentStyle={{ height: hp('7%') }}
          labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight: 'bold' }}
          onPress={gotoLogout}
          label="Logout"
        />
      </Animated.View>

      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />
    </BackgroundImage>
  );
};

export default SettingsScreen;
