// src/Screens/LoginScreen/index.tsx

import React, { useState, useEffect } from 'react';
import { View, Image, Animated, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';
import styles from './styles';

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux-actions/userActions';
import { useRoute, useNavigation } from '@react-navigation/native';

import LoadingScreen from '../../Components/LoadingScreen';
import BackgroundImage from '../../Components/BackgroundImage';

import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LoginScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, seterrorMsg] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
 
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user,isLoading,error } = userLogin


  const handleEmailChange = (text) => {
    setEmail(text);
    seterrorMsg(''); // Clear any previous error messages
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    seterrorMsg(''); // Clear any previous error messages
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

   
    
  const gotoLogin = async() => {   
  
    if (!email || !password) {
      //seterrorMsg('Please Enter valid Email/Password');
      
      Toast.showWithGravity(
        'Please Enter valid Email/Password', 
        Toast.LONG,
        Toast.BOTTOM,       
      );   

    } 
    else if (!isValidEmail(email)) 
    {
      //seterrorMsg('Please Enter a valid Email');
      Toast.showWithGravity(
        'Please Enter a valid Email', 
        Toast.LONG,
        Toast.BOTTOM,       
      );
    } 
    else if (password.length < 8) 
    {
      //seterrorMsg('Password must be at least 8 characters');
      Toast.showWithGravity(
        'Password must be at least 8 characters', 
        Toast.LONG,
        Toast.BOTTOM,       
      );
    } 
    
    else {


      let data = {
        id: uuid.v4(),       
        emailId: email,
        password: password,
      };
     
      try {       
        await dispatch(login(data));

                                       
      } catch (error) {
       
          Toast.showWithGravity(
            error.message,
            Toast.LONG,
            Toast.BOTTOM,
          );
          
      }
    }
  };

  const gotoRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const gotoForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

  // const restoreCredentials = async () => {
  //   try {
  //     const savedEmail = await AsyncStorage.getItem('savedEmail');
  //     const savedPassword = await AsyncStorage.getItem('savedPassword');

  //     console.log('values :' + savedEmail + ' ' + savedPassword);

  //     setEmail(savedEmail || '');       // Set email state
  //     setPassword(savedPassword || ''); // Set password state
  //   } catch (error) {
  //     console.log('Error reading saved credentials from AsyncStorage:', error);
  //   }
  // };

  // useEffect(() => {
  //   restoreCredentials();
  // }, []);

    
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <BackgroundImage>
      {!isKeyboardVisible && (
        <View style={styles.containerTop}>
          <Image source={require('../../Images/chatnadh_logo_white.png')} style={styles.TopLogo} />
        </View>
      )}

      <Animated.View style={[styles.containerBottom, { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] }]}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Label textval="LOGIN" styless={{ marginTop: hp('0%'), marginBottom: hp('3%') }} />

             <Input 
            label="Email" 
            emailtype={true}
            secure={false} 
            iconName="envelope"
            onChangeText={handleEmailChange}
             /> 

            <Input 
            label="Password" 
            secure={true} 
            iconName="lock" 
            iconNametwo="eye" 
            onChangeText={handlePasswordChange}
            />

            <TouchableOpacity onPress={gotoForgotPassword}>
              <Label textval="I don't remember my password" styless={{ color: 'blue', marginBottom: hp('2%'), fontSize: wp('3.8%') }} />
            </TouchableOpacity>

            <ButtonInput
              styless={{ width: wp('80%'), backgroundColor: colors.primary }}
              contentStyle={{ height: hp('7%') }}
              labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight: 'bold' }}
              onPress={gotoLogin}
              label="LOGIN"
            />

          {errorMsg && (
            <View >
              <Label textval={errorMsg} styless={{ color: 'red', marginBottom: hp('2%'), marginTop: hp('2%'),fontSize: wp('3.8%') }} />
            </View>
          )}

            <View style={styles.registerContainer}>
              <Label
                textval="Don't have an account?"
                styless={{ color: colors.tertiary, marginRight: wp('1%'), fontSize: hp('2.5%'), flexShrink: 1, marginTop: hp('3%'), marginBottom: hp('3%') }}
              />

              <TouchableOpacity style={styles.registerLink} onPress={gotoRegister}>
                <Label textval="Register" styless={{ color: 'blue', marginRight: wp('1%'), fontSize: hp('2.5%'), flexShrink: 1, marginTop: hp('3%'), marginBottom: hp('3%') }} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Animated.View>
    </BackgroundImage>
  );
};

export default LoginScreen;
