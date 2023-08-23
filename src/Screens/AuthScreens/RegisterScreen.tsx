import React, { useState, useEffect } from 'react';
import { View, Image, Animated, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';
import styles from './styles';


import BackgroundImage from '../../Components/BackgroundImage';

import { register } from '../../redux-actions/userActions';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'

import Toast from 'react-native-simple-toast';
import uuid from 'react-native-uuid';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0
  const [translateYAnim] = useState(new Animated.Value(30)); // Initial value for translateY: 30
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [name,setName]= useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [repassword, setrePassword] = useState(''); 
  const [about, setAbout] = useState(''); 
  const [errorMsg, seterrorMsg] = useState('');


  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegister)
  const {user,isLoading,error } = userRegister



  const handleNameChange = (text) => {
    setName(text);
    seterrorMsg(''); // Clear any previous error messages
  };


  const handleEmailChange = (text) => {
    setEmail(text);
    seterrorMsg(''); // Clear any previous error messages
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    seterrorMsg(''); // Clear any previous error messages
  };

  const handlerePasswordChange = (text) => {
    setrePassword(text);
    seterrorMsg(''); // Clear any previous error messages
  };

  const handleAboutChange = (text) => {
    setAbout(text);
    seterrorMsg(''); // Clear any previous error messages
  };
  
  
  
  const handleButtonPress = async () => {

    if (!name || !email || !password || !repassword || !about) {
      //seterrorMsg('Please fill in all fields.');

      Toast.showWithGravity(
        'Please fill in all fields.', 
        Toast.LONG,
        Toast.BOTTOM,       
      );


    } else if (password !== repassword) {
      //seterrorMsg('Passwords do not match.');
      Toast.showWithGravity(
        'Passwords do not match.', 
        Toast.LONG,
        Toast.BOTTOM,       
      );
    } else if (password.length < 8) {
      //seterrorMsg('Password must be at least 8 characters.');
      Toast.showWithGravity(
        'Password must be at least 8 characters.', 
        Toast.LONG,
        Toast.BOTTOM,       
      );
    }
    else
    {
      
      let data = {
        id: uuid.v4(),
        name: name,
        emailId: email,
        password: password,
        about: about,
        img : "https://t3.ftcdn.net/jpg/00/77/33/88/360_F_77338842_r1TSwo2urwuwEm8n03uCocyg1NkPgoFN.jpg"
      };

      try {
        await dispatch(register(data));

        Toast.showWithGravity(
          'Registration done successfully', 
          Toast.LONG,
          Toast.BOTTOM,       
        );           
        navigation.navigate('LoginScreen');
      } catch (error) {
       // seterrorMsg(error.message);

       Toast.showWithGravity(
        error.message, 
        Toast.LONG,
        Toast.BOTTOM,       
      );


      }      
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
            <Label textval="REGISTER" styless={{ marginTop: hp('0%'), marginBottom: hp('3%') }} />

            <Input label="Name" secure={false} iconName="user" onChangeText={handleNameChange} />
            <Input label="Email" secure={false} iconName="envelope" onChangeText={handleEmailChange} />
            <Input label="Password" secure={true} iconName="lock" onChangeText={handlePasswordChange} />
            <Input label="Re Enter Password" secure={true} iconName="lock" onChangeText={handlerePasswordChange}/>
            <Input label="About" secure={false} iconName="info" onChangeText={handleAboutChange} />

            <ButtonInput
              styless={{ width: wp('80%'), backgroundColor: colors.primary }}
              contentStyle={{ height: hp('7%') }}
              labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight: 'bold' }}
              onPress={handleButtonPress}
              label="REGISTER"
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


export default RegisterScreen;
