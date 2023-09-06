import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from '../Screens/AppScreens/ChatListScreen';

const Stack = createNativeStackNavigator();

const ChatListStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatListScreen" component={ChatListScreen} />      
    </Stack.Navigator>
  );
};

export default ChatListStack;
