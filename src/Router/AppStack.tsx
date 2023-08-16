import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatListScreen from '../Screens/ChatListScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const AppStackScreen = createBottomTabNavigator();

const AppStack = () => {
  return (
    <AppStackScreen.Navigator
    screenOptions={{headerShown: false}}>
      <AppStackScreen.Screen
        component={ChatListScreen}
        name="ChatListScreen"
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={25} />
          ),
        }}
      />
      <AppStackScreen.Screen
        component={NotificationScreen}
        name="NotificationScreen"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="user" color={color} size={25} />
          ),
        }}
      />     
    </AppStackScreen.Navigator>
  );
};

export default AppStack;