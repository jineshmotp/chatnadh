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
    <TouchableOpacity onPress={onPress} style={[styles.button, styless, contentStyle]}>
      <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonLabel: {
    color: 'white',
    fontSize: 16,
  },
});

export default ButtonInput;
