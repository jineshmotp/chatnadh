import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '../Screens/AppScreens/ChatListScreen';
import NotificationScreen from '../Screens/AppScreens/NotificationScreen';
import { View, Animated, Easing, Image } from 'react-native'; // Add Image import
import TabBarItem from '../Components/TabBarItem';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../Constants/colors';

const Tab = createBottomTabNavigator();
  
const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        //console.log('Route Name:', route.name); // Add this line
        return {
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.primary,
            borderTopLeftRadius: wp('8%'),
            borderTopRightRadius: wp('8%'),
            position: 'absolute',
            height: wp('15%'),
          },
          tabBarShowLabel: false,
        };
      }}
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
    </Tab.Navigator>
  );
};

export default AppStack;
