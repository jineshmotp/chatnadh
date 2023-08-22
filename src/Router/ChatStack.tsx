import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../Screens/AppScreens/ChatScreen';

const Stack = createNativeStackNavigator();

const ChatStack = ({ route }) => {
  const { chatData } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} initialParams={{ chatData }} />
   
    </Stack.Navigator>
  );
};

export default ChatStack;