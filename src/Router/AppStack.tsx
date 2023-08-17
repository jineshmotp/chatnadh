import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatListScreen from '../Screens/AppScreens/ChatListScreen';
import NotificationScreen from '../Screens/AppScreens/NotificationScreen';
import AboutStack from './AboutStack'; 
import SettingsStack from './SettingsStack';

import TabBarItem from '../Components/TabBarItem'; // Adjust the import path accordingly
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../Constants/colors';

const Tab = createBottomTabNavigator();

const AppStack = () => {

 
  return (
    <Tab.Navigator
     
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopLeftRadius: wp('8%'),
          borderTopRightRadius: wp('8%'),
          position: 'absolute',
          height: wp('15%'),
        },
        tabBarShowLabel: false, // Hide default labels
      })}
    >
      <Tab.Screen
        name="ChatListScreen"
        component={ChatListScreen}
        options={({ route, navigation }) => ({
          tabBarButton: (props) => (
            <TabBarItem
              {...props}
              iconName="comment"
              label="ChatList"
              isFocused={props.accessibilityState.selected}
              onPress={() => navigation.navigate(route.name)}
            />
          ),
        })}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={({ route, navigation }) => ({
          tabBarButton: (props) => (
            <TabBarItem
              {...props}
              iconName="bell"
              label="Notification"
              isFocused={props.accessibilityState.selected}
              onPress={() => navigation.navigate(route.name)}
            />
          ),
        })}
      />

      <Tab.Screen
        name="AboutStack"
        component={AboutStack}
        options={{ tabBarButton: () => null }} // Hide the tab bar button
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{ tabBarButton: () => null }} // Hide the tab bar button
      />
       
    </Tab.Navigator>
  );
};

export default AppStack;