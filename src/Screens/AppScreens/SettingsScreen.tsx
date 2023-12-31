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
import { logout } from '../../Redux/userActions';
import { useNavigation } from '@react-navigation/native';

import LoadingScreen from '../../Components/LoadingScreen';
import Toast from 'react-native-simple-toast';


const userImage = require('../../Images/chatnadh_logo.png'); // Replace with your user image asset

const SettingsScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(30));
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch()
    
  const userLogin = useSelector(state => state.userLogin)
  const { user, isLoading, error } = userLogin

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

 
  
  const gotoLogout = async () => {
    try {
      await dispatch(logout());
          
    } catch (error) {
      console.error('Logout failed:', error);

      Toast.showWithGravity(
        error.message, // Access the error message directly from the Redux state
        Toast.LONG,
        Toast.BOTTOM
      );

    }
  };
 
  useEffect(() => {

    //console.log('Settigs isloading :',isLoading);

  });
  
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

  //  if (Logoutloading) {
  //   return <LoadingScreen />;
  // }


  return (
    <BackgroundImage>
      {/* <View style={styles.containerTop}>        
      </View> */}

      <Header openModal={openModal} labeltxt="Settings" pageidx={2} />

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >
        <View style={styles.userInfoContainer}>
          <Image source={{uri : user.img }} style={styles.userImage} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
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
