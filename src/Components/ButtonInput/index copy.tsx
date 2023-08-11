import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Constants/colors';

interface ButtonInputProps {
  styless?: object; // Custom styles for the button container
  contentStyle?: object; // Custom styles for the button content
  labelStyle?: object; // Custom styles for the button label
  onPress: () => void; // Function to execute on button press
  label: string; // Button label
}

const ButtonInput: React.FC<ButtonInputProps> = ({ styless, contentStyle, labelStyle, onPress, label }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, styless]} onPress={onPress}>
      <Button
        style={[styles.button, contentStyle]}
        labelStyle={() => <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>}
        mode="contained"
        onPress={onPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: wp('80%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    alignSelf: 'center',
  },
  buttonLabel: {
    fontSize: hp('2.5%'),
    color: colors.white,
  },
});

export default ButtonInput;
