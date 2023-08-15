import React, { FunctionComponent } from 'react';
import { View, StyleSheet,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../Constants/colors';

interface InputProps {
  label: string;
  secure?: boolean; // Make secure prop optional
  iconName: string; // Corrected prop name to camelCase
  onChangeText?: (text: string) => void; // Add this prop
}

const Input: FunctionComponent<InputProps> = ({ label, secure, iconName,onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} size={wp('5%')} color={colors.secondary} style={styles.icon} />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={label}          
          style={styles.input}
          secureTextEntry={secure} // Use the secure prop here
          theme={{ colors: { primary: 'transparent' } }}
          onChangeText={onChangeText}
          textAlignVertical="center" // Add this line
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    marginBottom: hp('2%'),
  },
  iconContainer: {
    backgroundColor: colors.white,
    borderRadius: wp('2%'),
    padding: wp('2%'),
  },
  icon: {
    color: colors.secondary,
  },
  inputWrapper: {
    flex: 1,
    marginLeft: wp('2%'),
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

export default Input;
