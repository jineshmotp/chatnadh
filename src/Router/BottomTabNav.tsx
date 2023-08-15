import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatListScreen from '../Screens/ChatListScreen';
import NotificationScreen from '../Screens/NotificationScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
    screenOptions={{headerShown: false}}>
      <Tab.Screen
        component={ChatListScreen}
        name="ChatListScreen"
        options={{
          headerShown:false,
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={25} />
          ),
        }}
      />
      <Tab.Screen
        component={NotificationScreen}
        name="NotificationScreen"
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="user" color={color} size={25} />
          ),
        }}
      />     
    </Tab.Navigator>
  );
};

export default BottomTabNav;