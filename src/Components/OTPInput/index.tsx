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
  inputContainer: {
    
  
  },
 
  inputWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    width: wp('15%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('0%'),
    margin: hp('2%'),   
    marginBottom: hp('4%'),   
    backgroundColor: 'transparent',   
    overflow: 'hidden',
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: wp('4%'),
    color: colors.primary,
    paddingTop: 0, // Reset paddingTop
    paddingBottom: 0, // Reset paddingBottom
  },

});

export default OTPInput;
