// src/Router/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import BottomTabNav from './AppStack';

import { useDispatch, useSelector } from 'react-redux'

const RouterStack = createNativeStackNavigator();

import { checkLoginStatus } from '../redux-actions/userActions';

const Router = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Use the useNavigation hook

  useEffect(() => {
    checkLoginStatus()
      .then((loggedIn) => {
        if (loggedIn) {
          navigation.navigate('BottomTabNav'); // Navigate to the main app screen
        }
      })
      .catch((error) => {
        console.log('Error checking login status:', error);
      });
  }, [navigation]); // Make sure to include navigation in the dependency array


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
          
          
        </>
      )}
    </RouterStack.Navigator>
  </NavigationContainer>
   
  );
};

export default Router;
