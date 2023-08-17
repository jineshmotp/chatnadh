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
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../Images/logo_white.png')} style={styles.logo} />
          <Text style={styles.headerText}>Conversations</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => setModalVisible(true)} // Show the modal on button press
          >
            <Icon name="ellipsis-v" size={hp('4%')} color="white" />
          </TouchableOpacity>
        </View>
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




       
      </Animated.View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide" // Use slide animation for modal
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)} // Hide the modal on overlay press
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalOption}>Settings</Text>
            <Text style={styles.modalOption}>About</Text>
            {/* Add more options as needed */}
          </View>
        </TouchableOpacity>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    padding: wp('5%'),
  },
  logo: {
    width: wp('10%'), // Responsive logo width
    height: wp('10%'), // Responsive logo height
  },
  headerText: {
    color: 'white',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
  },
  containerBottom: {
    flex: 6,
    justifyContent: 'center',
    width: wp('100%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: 'white',
  },
  notificationText: {
    fontSize: hp('2.5%'),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'flex-end', // Display modal at the bottom
  },
  modalContent: {
    backgroundColor: 'white',
    width: wp('100%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    alignItems: 'center',
    paddingVertical: wp('2%'),
  },
  modalOption: {
    fontSize: hp('2%'),
    paddingVertical: wp('3%'),
  },
});

export default NotificationScreen;
