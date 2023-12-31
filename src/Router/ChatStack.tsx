import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../Screens/AppScreens/ChatScreen';

const Stack = createNativeStackNavigator();

const ChatStack = ({ route }) => {

  const { chatUser,moreUserData, moreOpponentData } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} initialParams={{ chatUser,moreUserData, moreOpponentData }} />
   
    </Stack.Navigator>
  );
};

export default ChatStack;
