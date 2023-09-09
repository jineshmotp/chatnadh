import React, { FunctionComponent,useState } from 'react';
import { View, StyleSheet,TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../Constants/colors';

interface InputProps {
  label: string;
  emailtype:boolean;
  secure?: boolean; // Make secure prop optional
  iconName: string; // Corrected prop name to camelCase
  iconNametwo: string; // Corrected prop name to camelCase
  onChangeText?: (text: string) => void; // Add this prop
}

const ChatInput: FunctionComponent<InputProps> = ({ onAttachmentSend,onSend,onChangeMessageText }) => {
 
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  
  return (
    <View style={styles.inputOuterContainer}>

    <View style={styles.inputContainer}>

      
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Type a message"               
          style={styles.input}
          secureTextEntry={false}
          theme={{ colors: { primary: 'transparent' } }}
          onChangeText={onChangeMessageText}
          textAlignVertical="center" // Add this line
        />
      </View>      
      
        <TouchableOpacity style={styles.iconContainer} >
          <MaterialIcons name='attach-file'  size={wp('5%')} color={colors.secondary} style={styles.icon} />
        </TouchableOpacity>
     
    </View>

        <TouchableOpacity style={styles.iconContainer} onPress={onSend}>
          <Icon name='send'  size={wp('5%')} color={colors.secondary} style={[styles.icon,{color:colors.white}]} />
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  inputOuterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('7%'),    
    paddingHorizontal: wp('0%'),
   // backgroundColor:colors.white
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('90%'),
    height: hp('6%'),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('0%'),
    backgroundColor:colors.white
  },
  iconContainer: {
    backgroundColor: colors.transparent,
    borderRadius: wp('2%'),
    padding: wp('2%'),
  },
  icon: {
    color: colors.secondary,
  },
  inputWrapper: {
    flex: 1,
    marginLeft: wp('1%'),
    backgroundColor: 'transparent',
    borderRadius: wp('2%'),
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

export default ChatInput;
