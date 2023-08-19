import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../Components/LoadingScreen';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import SettingsStack from './SettingsStack'; 
import AboutStack from './AboutStack'; 
import ChatStack from './ChatStack';

import { checkLoginStatus } from '../redux-actions/userActions';

import { useDispatch, useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Router = () => {
  const dispatch = useDispatch();

  const [logstatus, setLogstatus] = useState(false);
  const [loadinstack, setLoadinstack] = useState(false);

  const userLogin = useSelector(state => state.userLogin);
  const { user } = userLogin;

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, []);

  useEffect(() => {
    dispatch(checkLoginStatus())
      .then(isLoggedIn => {
        if (isLoggedIn) {
          setLogstatus(true);
          setLoadinstack(true);
        } else {
          setLogstatus(false);
          setLoadinstack(true);
        }
      })
      .catch(error => {
        console.log('Error checking login status:', error);
      });
  }, [dispatch]);

  if (loadinstack === false) {
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
