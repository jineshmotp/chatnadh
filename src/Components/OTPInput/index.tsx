import React, { FunctionComponent,useRef,useEffect } from 'react';
import { View, StyleSheet,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Constants/colors';

interface OTPInputProps {
  value: string; 
  onchangeOTP?: (text: string) => void; // Add this prop
  autoFocus?: boolean; // Add autoFocus prop
  onSubmitEditing?: () => void;

}

const OTPInput: FunctionComponent<OTPInputProps> = ({ value,onchangeOTP,autoFocus,onSubmitEditing }) => {
 
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
   
  return (
    

      <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.placeholdercolor}
        value={value}
        keyboardType="number-pad"
        onChangeText={onchangeOTP}
        textAlign="center" // Center the text horizontally
        maxLength={1} // Allow only one digit per input
        autoFocus={autoFocus} // Use the autoFocus prop
        onSubmitEditing={() => {
          if (onSubmitEditing) {
            onSubmitEditing();
          }
          focusNextInput();
        }}
        ref={inputRef}
        returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'} // Customize return key based on platform
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
