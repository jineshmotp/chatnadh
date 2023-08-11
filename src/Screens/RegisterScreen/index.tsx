import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Animated,ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Input from '../../Components/Input';
import Label from '../../Components/Label';
import ButtonInput from '../../Components/ButtonInput';
import { colors } from '../../Constants/colors';

const RegisterScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  const handleButtonPress = () => {
    // Logic to execute when the button is pressed
    console.log('Button pressed!');
  };

  
  
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000, // Adjust the duration as needed
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  return (
    <ImageBackground source={require('../../Images/background.jpg')} style={styles.main_container}>
      <View style={styles.containerTop}>
      <Image source={require('../../Images/chatnadh_logo_white.png')} style={styles.TopLogo} />
     </View>

    <KeyboardAvoidingView >
    <Animated.View style={[styles.containerBottom, { transform: [{ scale: fadeAnim }] }]}>

          <Label textval= "WELCOME TO CHATNADH" styless={{marginTop: hp('0%'),marginBottom: hp('3%')}} />
         

          <Input label="Email" secure={false} iconName="envelope" />
          <Input label="Password" secure={true} iconName="lock" />
         

          <TouchableOpacity>
          <Label textval= "I don't remember my password" styless={{ color: 'blue', marginBottom: hp('2%'),fontSize: wp('3.8%') }} />
          </TouchableOpacity>

          <ButtonInput
              styless={{ width: wp('80%') , backgroundColor:colors.primary}}
              contentStyle={{ height: hp('7%') }}
              labelStyle={{ fontSize: hp('2.5%'), color: colors.white, fontWeight:'bold' }}
              onPress={handleButtonPress}
              label="LOGIN"
            />
          

          <View style={styles.registerContainer}>
          <Label textval= "Don't have an account?" styless={{  color: colors.tertiary,marginRight: wp('1%'),fontSize: hp('2.5%'),flexShrink: 1,marginTop: hp('3%'),marginBottom: hp('3%'), }} />  
          
          <TouchableOpacity style={styles.registerLink}>
          <Label textval= "Register" styless={{   color: 'blue',marginRight: wp('1%'),fontSize: hp('2.5%'),flexShrink: 1, marginTop: hp('3%'),marginBottom: hp('3%'),  }} />  
           </TouchableOpacity>
        </View>

      </Animated.View>
      </KeyboardAvoidingView>
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
    flex: 2,
    width: wp('100%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: 'white',    
  },

  scrollViewContent: {
    flexGrow: 1, // Allow content to be scrollable
    justifyContent: 'space-between', // Distribute content evenly vertically
  },  
    
  registerContainer: {
    flexDirection: 'row',   
    alignItems: 'center',
    justifyContent: 'center',   
    flexWrap: 'wrap', // Allow text to wrap to next line
  }, 
  registerLink: {
    marginLeft: wp('1%'),
  },
});

export default RegisterScreen;
