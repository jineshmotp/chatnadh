import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TabBarItem = ({ iconName, label, isFocused, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Icon name={iconName} color={isFocused ? 'blue' : 'gray'} size={wp('6%')} />
    <Text style={{ fontSize: wp('3%'), color: isFocused ? 'blue' : 'gray', marginTop: hp('1%') }}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default TabBarItem;