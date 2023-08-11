import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Constants/colors';

interface InputProps {
  textval: string;  
  styless?: object; // Prop to pass custom styles
}

const Label: FunctionComponent<InputProps> = ({ textval, styless }) => {
  return (
    <Text adjustsFontSizeToFit style={[styles.title,styless]}>{textval}</Text>
  );
};

const styles = StyleSheet.create({
    title: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        color: colors.primary,
        textAlign:'center',
        
     },
});

export default Label;
