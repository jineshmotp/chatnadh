// src/Router/index.tsx
import React, {useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from '../Components/LoadingScreen';

import AppStack from './AppStack';
import AuthStack from './AuthStack';

import { checkLoginStatus } from '../redux-actions/userActions';

import { useDispatch, useSelector } from 'react-redux'


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
    // Dispatch the action using the dispatch function
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
  }, [dispatch]); // Make sure to include dispatch in the dependency array


  if(loadinstack == false)
  {
    return (
      <LoadingScreen/>

    )

  }


  return (
    <NavigationContainer >
      {user ? (
        <AppStack  />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Router;