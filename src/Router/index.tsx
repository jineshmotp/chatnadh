import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../Components/LoadingScreen';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import SettingsStack from './SettingsStack'; 
import AboutStack from './AboutStack'; 
import ChatStack from './ChatStack';

import { checkLoginStatus,initializeUserDataListener  } from '../Redux/userActions';
import {resetfetchChat,resetcreateChat, resetcreateChatTable} from '../Redux/chatActions'

import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Router = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { user, isLoading } = userLogin;

  useEffect(() => {
    dispatch(checkLoginStatus())
    dispatch(resetcreateChat())
    dispatch(resetcreateChatTable())
    dispatch(resetfetchChat())

    if (user) {
      dispatch(initializeUserDataListener()); // Set up the listener if user is logged in
    }


  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="AppStack" component={AppStack}  options={{ headerShown: false }}/>
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
