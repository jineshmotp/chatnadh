import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Image, Animated,ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../Constants/colors';

const LoginScreen = () => {
  const [scaleAnim] = useState(new Animated.Value(0)); // Initial value for scale: 0

  useEffect(() => {
    Animated.spring(
      scaleAnim,
      {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }
    ).start();
  }, []);

  return (
    <ImageBackground source={require('../../Images/background.jpg')} style={styles.main_container}>
      <View style={styles.containerTop}>
      <Image source={require('../../Images/chatnadh_logo_white.png')} style={styles.TopLogo} />
     </View>

    <KeyboardAvoidingView >
    <Animated.View style={[styles.containerBottom, { transform: [{ scale: scaleAnim }] }]}>
          <Text adjustsFontSizeToFit style={styles.title}>Welcome to ChatNadh</Text>

        <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="envelope" size={wp('5%')} color="#0252e4" style={styles.icon} />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Email"
                style={styles.input}
                theme={{ colors: { primary: 'transparent' } }} // Remove underline
                underlineColorAndroid="transparent" // Add this line
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={wp('5%')} color="#0252e4" style={styles.icon} />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                label="Password"
                secureTextEntry
                style={styles.input}
                theme={{ colors: { primary: 'transparent' } }} // Remove underline
                underlineColorAndroid="transparent" // Add this line
              />
            </View>
          </View>

          <TouchableOpacity>
              <Text style={styles.forgotPassword}>I don't remember my password</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
            <Button mode="contained" style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </Button>
          </View>

          <View style={styles.registerContainer}>
          <Text style={[styles.registerText, { color: 'black' }]}>Don't have an account?</Text>
          <TouchableOpacity style={styles.registerLink}>
            <Text style={styles.registerText}>Register</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    marginBottom: hp('2%'),
  },
  inputWrapper: {
    flex: 1,
    marginLeft: wp('2%'),
    backgroundColor: 'transparent', // Set input background to transparent
    borderRadius: wp('2%'),
    overflow: 'hidden', // To prevent child element (TextInput) from overflowing
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: wp('2%'),
  },
  icon: {
    color: '#0252e4',
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: hp('3%'), // Adjust margin to fit better
  },
  input: {
    backgroundColor: 'transparent', // Set input background to transparent
    flex: 1,
    fontSize: wp('4%'),
    color: 'blue',
  },



  buttonContainer: {
    width: wp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  button: {
    width: '100%',
    backgroundColor: '#0252e4',
    borderRadius: 5,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    height: hp('7%'), // Set the height using responsive height
  },
  buttonText: {
    fontSize: hp('2.5%'), // Adjust font size using responsive height
    color: 'white',
  },

   
  forgotPassword: {
    color: 'blue',
    marginBottom: hp('2%'),
    fontSize: wp('3%'),
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('3%'), // Increase margin bottom for better spacing
    flexWrap: 'wrap', // Allow text to wrap to next line
  },
  registerText: {
    color: 'blue',
    marginRight: wp('1%'),
    fontSize: hp('2.5%'), // Adjust font size according to your preference
    flexShrink: 1, // Allow text to shrink if space is limited
  },
  registerLink: {
    marginLeft: wp('1%'),
  },
});

export default LoginScreen;
