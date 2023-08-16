// src/Screens/LoginScreen/index.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet,ActivityIndicator, ImageBackground, Image, Animated, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';

import { TextInput } from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux-actions/userActions';
import { useRoute, useNavigation } from '@react-navigation/native';


import Icon from 'react-native-vector-icons/FontAwesome';

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

  // useEffect(() => {
  //   if (user) {
  //     navigation.navigate('AppStack'); // Navigate to BottomTabNav when user is authenticated
  //   }
  // }, [user, navigation]);
    

  
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

  const gotoRegister = () => {
    navigation.navigate('RegisterScreen');
  };

  const gotoForgotPassword = () => {
    navigation.navigate('ForgotPasswordScreen');
  };

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
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <ImageBackground source={require('../../Images/background.jpg')} style={styles.main_container}>
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
            <Label textval="WELCOME TO CHATNADH" styless={{ marginTop: hp('0%'), marginBottom: hp('3%') }} />

             <Input 
            label="Email" 
            secure={false} 
            iconName="envelope"
            onChangeText={handleEmailChange}
             /> 

            <Input 
            label="Password" 
            secure={true} 
            iconName="lock" 
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
  TopLogo: {
    width: wp('40%'),
    height: hp('15%'),
    resizeMode: 'contain',
  },
  containerBottom: {
    flex: 3,
    justifyContent: 'center',
    width: wp('100%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: 'white',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  registerLink: {
    marginLeft: wp('1%'),
  },
  
});

export default LoginScreen;