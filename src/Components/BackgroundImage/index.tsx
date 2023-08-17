import React from 'react';
import { StyleSheet,ImageBackground } from 'react-native';

const BackgroundImage = ({ children }) => {
  return (
    <ImageBackground
      source={require('../../Images/background.jpg')} // Adjust the path to your image
      style={styles.imageBackground}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default BackgroundImage;
