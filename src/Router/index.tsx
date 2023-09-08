import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppState } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../Components/LoadingScreen';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import SettingsStack from './SettingsStack'; 
import AboutStack from './AboutStack'; 
import ChatStack from './ChatStack';
import ContactStack from './ContactStack';
import ChatListStack from './ChatListStack';

import { checkLoginStatus,initializeUserDataListener,updateOnlineStatus  } from '../Redux/userActions';
import {resetfetchChat,resetcreateChat, resetcreateChatTable} from '../Redux/chatActions'

import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Router = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { user, isLoading } = userLogin;

  useEffect(() => {   
    if (user) {
      dispatch(initializeUserDataListener()); // Set up the listener if user is logged in
    }

  }, [dispatch]);



  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        //dispatch(updateOnlineStatus(true)); // App is active, so user is considered online
         console.log('active')
      } else {
        //dispatch(updateOnlineStatus(false)); // App is in the background, so user is considered offline
        console.log('not active')
      }
    };
    AppState.addEventListener('change', handleAppStateChange);
  
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [dispatch]);



  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AppStack" component={AppStack}  options={{ headerShown: false }}/>
          {/* <Stack.Screen name="ChatListStack" component={ChatListStack}  options={{ headerShown: false }}/>
          <Stack.Screen name="ContactStack" component={ContactStack}  options={{ headerShown: false }}/> */}
          <Stack.Screen name="SettingsStack" component={SettingsStack}  options={{ headerShown: false }}/>
          <Stack.Screen name="AboutStack" component={AboutStack}  options={{ headerShown: false }} />
          <Stack.Screen name="ChatStack" component={ChatStack}  options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Router;
