import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Constants/colors';

const emotionImages = {
  anger: require('../../Images/expression/anger.png'),
  contempt: require('../../Images/expression/contempt.png'),
  disgust: require('../../Images/expression/contempt.png'),
  fear: require('../../Images/expression/fear.png'),
  happiness: require('../../Images/expression/happiness.png'),
  noreaction: require('../../Images/expression/noreaction.png'),
  sadness: require('../../Images/expression/sadness.png'),
  surprise: require('../../Images/expression/surprise.png'),
};

const FaceEmotion = ({ emotion, text }) => {

  
  const imageSource = emotionImages[emotion];

  if (!imageSource) {
    return null;
  }

  return (
    <View style={styles.emotionView}>
      <Image source={imageSource} style={styles.emotionEmoji} />
      < Text style={styles.messageText}>{text}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  emotionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  emotionEmoji: {
    marginRight: wp('2%'),
    width: wp('10%'),
    height: hp('4%'),
    resizeMode: 'contain',
  },
  messageText: {
    color: colors.white,
    fontSize: hp('2%'),
  },
});

export default FaceEmotion;
