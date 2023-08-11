import React,{FC} from 'react'
import { Text,StyleSheet } from 'react-native'

const Button:FC = () => {
  return (
    <Text>Input</Text>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('80%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2%'),
    marginBottom: hp('2%'),
  },  
});

export default Button;