import React, { useState, useEffect } from 'react';
import { Text } from 'react-native'
import ButtonInput from '../../Components/ButtonInput';

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux-actions/userActions';
import { useRoute, useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user,isLoading,error } = userLogin
  
  useEffect(() => {
    if (user) {
      navigation.navigate('LoginScreen'); // Navigate to BottomTabNav when user is authenticated
    }
  }, [user, navigation]);
    

  
  const gotoLogin = () => {
   
    console.log(email+' '+password);
    seterrorMsg('');
    if (email === "" || password === "") {
      seterrorMsg('Please Enter valid Email/Password');
    } else if (!isValidEmail(email)) {
      seterrorMsg('Please Enter a valid Email');
    } else if (password.length < 8) {
      seterrorMsg('Password must be at least 8 characters');
    } else {
      seterrorMsg(''); // Clear error message if everything is valid
      dispatch(login(email, password));
      console.log(error)
    }

  };

  return (
    <Text>NotificationScreen</Text>
  )
}

export default NotificationScreen