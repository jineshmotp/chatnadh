import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutScreen from '../Screens/AppScreens/AboutScreen'

const Stack = createNativeStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AboutScreen" component={AboutScreen} />      
    </Stack.Navigator>
  );
};

export default AboutStack;
