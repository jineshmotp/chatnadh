import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '../Screens/AppScreens/ChatListScreen';
import ContactScreen from '../Screens/AppScreens/ContactScreen';
import TabBarItem from '../Components/TabBarItem';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../Constants/colors';

import { fetchChatList,resetfetchChat,resetcreateChat,resetfetchChatList, resetcreateChatTable } from '../Redux/chatActions';
import { useDispatch, useSelector } from 'react-redux'



const Tab = createBottomTabNavigator();

const AppStack = () => {

  const dispatch = useDispatch<Dispatch>();

  const resetFunction = () => {
   
     dispatch(resetcreateChat())
     dispatch(resetcreateChatTable())
     dispatch(resetfetchChat())  
     dispatch(resetfetchChatList()) 
   
  };

 
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
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
              iconName="chat"
              label="Chats"
              isFocused={props.accessibilityState?.selected ?? false}
              onPress={() => {
                // Call your reset function when the tab is pressed
                resetFunction();
                navigation.navigate(route.name);
              }}
            />
          ),
        })}
      />



<Tab.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={({ route, navigation }) => ({
          tabBarButton: (props) => (
            <TabBarItem
              {...props}
              iconName="contact"
              label="Contacts"
              isFocused={props.accessibilityState?.selected ?? false}
              onPress={() => {
                // Call your reset function when the tab is pressed
                resetFunction();
                navigation.navigate(route.name);
              }}
            />
          ),
        })}
      />
    

   




    </Tab.Navigator>
  );
};

export default AppStack;
