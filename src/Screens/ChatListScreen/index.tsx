import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,ActivityIndicator, ImageBackground, Image, Animated, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChatListScreen = () => {


  return (
    <ImageBackground source={require('../../Images/background.jpg')} style={styles.main_container}>
    
    <Text>NotificationScreen</Text>
    </ImageBackground>
   
  )
}

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
  containerBottom: {
    flex: 4,
    justifyContent: 'center',
    width: wp('100%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: 'white',
  }
});


export default ChatListScreen