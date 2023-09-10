import React, { FunctionComponent, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../Constants/colors';

interface InputProps {
  handleMessageTextChange: (text: string) => void; // Corrected prop definition
  onSend: () => void;
  onAttachmentSend: () => void;
  clearInputMessage: () => void; 
}

const ChatInput: FunctionComponent<InputProps> = ({ onAttachmentSend, onSend, handleMessageTextChange,clearInputMessage }) => {

  const [text, setText] = useState(''); // Define the text state

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text);
    clearInputMessage();
    setText(''); // Clear the input text
  };

  return (
    <View style={styles.inputOuterContainer}>

      <View style={styles.inputContainer}>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Type a message"
            style={styles.input}           
            theme={{ colors: { primary: 'transparent' } }}           
            onChangeText={(newText) => {
              setText(newText); // Update the text state when the user types
              handleMessageTextChange(newText);
            }}      
            textAlignVertical="center"
            value={text}
          />
        </View>

        <TouchableOpacity style={styles.iconContainer} onPress={onAttachmentSend} >
          <MaterialIcons name='attach-file' size={wp('5%')} color={colors.secondary} style={styles.icon} />
        </TouchableOpacity>

      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={handleSend}>
        <Icon name='send' size={wp('5%')} color={colors.secondary} style={[styles.icon, { color: colors.white }]} />
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
    backgroundColor: colors.white
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
    paddingTop: 0,
    paddingBottom: 0,
  },

});

export default ChatInput;
