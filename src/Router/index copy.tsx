// src/Router/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import BottomTabNav from './BottomTabNav';

import { useDispatch, useSelector } from 'react-redux'

const RouterStack = createNativeStackNavigator();

const Router = () => {

  const userLogin = useSelector(state => state.userLogin);
  const {user,isloading,error } = userLogin

  return (
   
    <NavigationContainer>
    <RouterStack.Navigator>
      {user ? ( // Check if the user is authenticated
        <>
          <RouterStack.Screen
            name="BottomTabNav"
            component={BottomTabNav}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <RouterStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <RouterStack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <RouterStack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />

          
<RouterStack.Screen
            name="BottomTabNav"
            component={BottomTabNav}
            options={{ headerShown: false }}
          />
          
          
          
          
          
        </>
      )}
    </RouterStack.Navigator>
  </NavigationContainer>
   
  );
};

export default Router;
