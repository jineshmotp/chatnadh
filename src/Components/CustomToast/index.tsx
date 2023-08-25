import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-simple-toast';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Constants/colors';

// Define the styles outside of the function
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: wp('2%'), // Responsive border radius
    padding: hp('2%'), // Responsive padding
    marginHorizontal: wp('5%'), // Responsive horizontal margin
    marginBottom: hp('2%'), // Responsive vertical margin
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: hp('2%'), // Responsive font size
    textAlign: 'center',
  },
});

interface CustomToastProps {
  message: string;
}

const CustomToast: React.FC<CustomToastProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export const showToast = (message: string) => {
  Toast.showWithGravity(
    <CustomToast message={message} />,
    Toast.LONG,
    Toast.BOTTOM
  );
};
