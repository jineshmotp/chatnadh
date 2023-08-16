// src/Router/index.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/AuthScreens/LoginScreen';
import RegisterScreen from '../Screens/AuthScreens/RegisterScreen';
import ForgotPasswordScreen from '../Screens/AuthScreens/ForgotPasswordScreen';

const AuthScreenStack = createNativeStackNavigator();


const AuthStack = () => {

 
  return (
       <AuthScreenStack.Navigator>
      
          <AuthScreenStack.Screen
            name="LoginScreen" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <AuthScreenStack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <AuthScreenStack.Screen
            name="ForgotPasswordScreen"
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />  
       
    </AuthScreenStack.Navigator>
 
   
  );
};

export default AuthStack;
