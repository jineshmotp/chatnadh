import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatScreen from '../Screens/AppScreens/ChatScreen';

const Stack = createNativeStackNavigator();

const ChatStack = ({ route }) => {
  const { chatUser, fetchChatResult , moreUserData, moreOpponentData } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} initialParams={{ chatUser, fetchChatResult, moreUserData, moreOpponentData }} />
   
    </Stack.Navigator>
  );
};

export default ChatStack;
