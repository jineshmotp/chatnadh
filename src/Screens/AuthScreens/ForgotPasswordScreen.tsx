import React, { useState, useEffect } from 'react';
import { View, Image, Animated, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';

import styles from './styles';

import { useRoute, useNavigation } from '@react-navigation/native';
import BackgroundImage from '../../Components/BackgroundImage';

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  const [password, setPassword] = useState(''); 
  const [repassword, setrePassword] = useState('');   
  const [errorMsg, seterrorMsg] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text);
    seterrorMsg(''); // Clear any previous error messages
  };

  const handlerePasswordChange = (text) => {
    setrePassword(text);
    seterrorMsg(''); // Clear any previous error messages
  };


  const handleButtonPress = () => {

    if (!password || !repassword) {
      seterrorMsg('Please fill in all fields.');
    } else if (password !== repassword) {
      seterrorMsg('Passwords do not match.');
    } else if (password.length < 8) {
      seterrorMsg('Password must be at least 8 characters.');
    }
    else
    {
      navigation.navigate('LoginScreen');
    }
   
  };

  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const gotoForgotPassword = () => {
    // Logic to execute when the button is pressed
    console.log('Button pressed!');
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
            <Label textval="FORGOT PASSWORD" styless={{ marginTop: hp('0%'), marginBottom: hp('3%') }} />
            
            
            <Input label="New Password" secure={true} iconName="lock" onChangeText={handlePasswordChange} iconNametwo="eye"  />
            <Input label="Re Enter New Password" secure={true} iconName="lock" onChangeText={handlerePasswordChange} iconNametwo="eye"  />

            <ButtonInput
              styless={{ width: wp('80%'), backgroundColor: colors.primary }}
              contentStyle={{ height: hp('7%') }}
              labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight: 'bold' }}
              onPress={handleButtonPress}
              label="UPDATE PASSWORD"
            />

          {errorMsg && (
            <View >
              <Label textval={errorMsg} styless={{ color: 'red', marginBottom: hp('2%'), marginTop: hp('2%'),fontSize: wp('3.8%') }} />
            </View>
          )}

            <View style={styles.registerContainer}>
              <Label
                textval="Already have an account?"
                styless={{ color: colors.tertiary, marginRight: wp('1%'), fontSize: hp('2.5%'), flexShrink: 1, marginTop: hp('3%'), marginBottom: hp('3%') }}
              />

              <TouchableOpacity style={styles.registerLink} onPress={gotoLogin}>
                <Label textval="Login" styless={{ color: 'blue', marginRight: wp('1%'), fontSize: hp('2.5%'), flexShrink: 1, marginTop: hp('3%'), marginBottom: hp('3%') }} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </Animated.View>
    </BackgroundImage>
  );
};

 
export default ForgotPasswordScreen;
