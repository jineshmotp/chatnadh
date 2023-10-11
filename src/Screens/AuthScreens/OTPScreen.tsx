import React, { useState, useEffect } from 'react';
import { View, Image, Animated, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform,Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Label from '../../Components/Label';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';
import styles from './styles';

import BackgroundImage from '../../Components/BackgroundImage';

import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';

import PhoneNumberInput from '../../Components/PhoneNumberInput';
import OTPInput from '../../Components/OTPInput';

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [errorMsg, seterrorMsg] = useState('');

  const [first_value, setFirst_value] = useState('');
  const [second_value, setSecond_value] = useState('');
  const [third_value, setThird_value] = useState('');
  const [fourth_value, setFourth_value] = useState('');
  
  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const {user,isLoading,error } = userRegister


  const onOTPchange = async (txt,otpnum) => {

     if(otpnum == 1)
     {
      setFirst_value(txt);
     }
     if(otpnum == 2)
     {
      setSecond_value(txt);
     }
     if(otpnum == 3)
     {
      setThird_value(txt);
     }
     if(otpnum == 4)
     {
      setFourth_value(txt);
     }
       
  
 };
     
  
  const handleButtonPress = async () => {
    
    console.log(first_value+second_value+third_value+fourth_value)
    Keyboard.dismiss();

    navigation.navigate('RegisterScreen');

  };

  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  

  useEffect(() => {

  

  }, []);


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
            <Label textval="OTP VERIFICATION" styless={{ marginTop: hp('0%'), marginBottom: hp('3%') }} />
            
            <View style={{ flexDirection: 'row', }}>
             
             <OTPInput 
             value={first_value}             
             onchangeOTP={(txt)=> onOTPchange(txt,1)}
             />
              <OTPInput 
             value={second_value}             
             onchangeOTP={(txt)=> onOTPchange(txt,2)}
             />

            <OTPInput 
             value={third_value}             
             onchangeOTP={(txt)=> onOTPchange(txt,3)}
             />

            <OTPInput 
             value={fourth_value}             
             onchangeOTP={(txt)=> onOTPchange(txt,4)}
             />

            </View>
          
            
            <ButtonInput
              styless={{ width: wp('80%'), backgroundColor: colors.primary }}
              contentStyle={{ height: hp('7%') }}
              labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight: 'bold' }}
              onPress={handleButtonPress}
              label="NUMBER VERIFY"
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


export default OTPScreen;
