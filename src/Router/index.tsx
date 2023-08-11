import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen'
import RegisterScreen from '../Screens/RegisterScreen'
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';

import BottomTabNav from './BottomTabNav';

const RouterStack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <RouterStack.Navigator initialRouteName="LoginScreen">
        <RouterStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false, // Hide the header for this screen
          }}
        />

       

        <RouterStack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false, // Hide the header for this screen
          }}
        />

      <RouterStack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false, // Hide the header for this screen
          }}
        />

      </RouterStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
