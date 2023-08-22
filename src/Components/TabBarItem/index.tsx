import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Constants/colors';

interface ButtonInputProps {
  iconName: string;
  label: string;
  isFocused?: boolean;
  onPress: () => void;
}

const TabBarItem = ({ iconName, label, isFocused, onPress }) => {
  const imageSource = isFocused ? emotionImages[`${iconName}_white`] : emotionImages[`${iconName}_gray`];

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={imageSource} style={{ width: wp('6%'), height: wp('6%') }} />
      <Text style={{ fontSize: wp('3%'), color: isFocused ? colors.white : 'gray', marginTop: hp('1%') }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const emotionImages = {
  chat_white: require('../../Images/tabicons/chat_white.png'),
  chat_gray: require('../../Images/tabicons/chat_gray.png'),
  contact_white: require('../../Images/tabicons/contact_white.png'),
  contact_gray: require('../../Images/tabicons/contact_gray.png'), 
};

export default TabBarItem;
