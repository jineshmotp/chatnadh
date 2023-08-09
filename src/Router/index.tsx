import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import BottomTabNav from './BottomTabNav';

const RouterStack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <RouterStack.Navigator initialRouteName="Login">
        <RouterStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false, // Hide the header for this screen
          }}
        />
      </RouterStack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
