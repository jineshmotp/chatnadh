import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Image, TouchableOpacity } from 'react-native';
import ModelPopup from '../../Components/ModelPopup';
import Header from '../../Components/Header';
import styles from './styles';
import BackgroundImage from '../../Components/BackgroundImage';

const AboutScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateYAnim] = useState(new Animated.Value(30));
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateYAnim]);

  return (
    <BackgroundImage>
      <View style={styles.containerTop}>
        <Header openModal={openModal} labeltxt="About Us" pageidx={0} />
      </View>

      <Animated.View
        style={[
          styles.containerBottom,
          { opacity: fadeAnim, transform: [{ translateY: translateYAnim }] },
        ]}
      >
        <Image
          source={require('../../Images/chatnadh_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Welcome to ChatNadh !</Text>
        <Text style={styles.description}>
          Our chat application brings a unique experience by incorporating AI and emotional
          transactions based on facial expressions. With cutting-edge technology, we ensure
          meaningful and engaging conversations that go beyond words.
        </Text>
       
        {/* <TouchableOpacity
          style={styles.button}
          onPress={openModal}
        >
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity> */}
        <Text style={styles.NameText}>www.jineshmotp.com</Text>
      </Animated.View>

      <ModelPopup isModalVisible={isModalVisible} closeModal={closeModal} />

    </BackgroundImage>
  );
};

export default AboutScreen;
