import React, { FunctionComponent,useState } from 'react';
import { View, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../Constants/colors';

interface OTPInputProps {
  value: string;
  setval: (text: string) => void;
  onchangeOTP?: (text: string) => void; // Add this prop
}

const OTPInput: FunctionComponent<OTPInputProps> = ({ value,setval,onchangeOTP }) => {
 
   
  return (
    

      <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        keyboardType="number-pad"
        onChangeText={onchangeOTP}
        textAlign="center" // Center the text horizontally
        maxLength={1} // Allow only one digit per input
      />
      </View>      
     
    
  );
};

const styles = StyleSheet.create({
  
  inputWrapper: {
     flex:1,
    alignItems: 'center',
    justifyContent:'center',
    width: wp('10%'), // Adjust the width to make it larger
    height: hp('7%'),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('0%'), // Add some padding to center the digit
    margin: hp('0.5%'), // Adjust margin as needed
    marginBottom: hp('2%'), // Adjust margin as needed
    backgroundColor: 'transparent',
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: wp('4%'),
    color: colors.primary,
  },

});

export default OTPInput;
