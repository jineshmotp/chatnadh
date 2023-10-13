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

import { OTPPhoneAuth } from '../../Redux/userActions';

import PhoneNumberInput from '../../Components/PhoneNumberInput';

const PhoneNumberScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [errorMsg, seterrorMsg] = useState('');

  const [value, setValue] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState('+91'); // Default country code

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const {user,isLoading,error } = userRegister
  const userOTP = useSelector(state => state.userOTP)
  const {otpRequestData,otpRequestLoading,otpRequesterror } = userOTP;
   
  
  const handleButtonPress = async () => {

    let val = selectedCountryCode+value
    console.log('phone number ',val);
    
   // let phonenumber = '+1 650-555-3434';
    dispatch(OTPPhoneAuth(val)); 
  };

  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  

  useEffect(() => {

    if(otpRequestData !== null)
    {
      console.log('logvalue : ',otpRequestData)
    }
   //navigation.navigate('OTPScreen');
  

  }, [otpRequestData,otpRequestLoading]);


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
            <Label textval="PHONE NUMBER" styless={{ marginTop: hp('0%'), marginBottom: hp('3%') }} />

            <PhoneNumberInput 
            value={value}
            setValue={setValue}
            setSelectedCountryCode={setSelectedCountryCode}
            />
            
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


export default PhoneNumberScreen;
