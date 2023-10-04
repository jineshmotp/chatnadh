import React, { useEffect, useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatListScreen from '../Screens/AppScreens/ChatListScreen';
import ContactScreen from '../Screens/AppScreens/ContactScreen';
import TabBarItem from '../Components/TabBarItem';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../Constants/colors';

import { fetchChatList,resetfetchChat,resetcreateChat,resetfetchChatList, resetcreateChatTable } from '../Redux/chatActions';
import { updateUserToken } from '../Redux/userActions'

import { useDispatch, useSelector } from 'react-redux'

import { requestUserPermission,notificationListener,getToken } from '../Utilities/commonUtils';

const Tab = createBottomTabNavigator();

const AppStack = () => {


  interface RootState {
    userLogin: {
      user: {
      id: string;
      about: string;
      accountactivation: number;
      emailId: string;
      hasStory: boolean;
      img: string;
      lastMessage: string;
      name: string;
      notification: number;
      onlineStatus: boolean;      
      time: string;
      fcmToken:string;
      };
      isLoading: boolean;
      error: string | null;
    };   
  }

  const dispatch = useDispatch<Dispatch>();
  const [currentToken, setCurrentToken] = useState('');

  const {user, isLoading, error } = useSelector((state: RootState) => state.userLogin);

  const resetFunction = () => {
   
     dispatch(resetcreateChat())
     dispatch(resetcreateChatTable())
     dispatch(resetfetchChat())  
     dispatch(resetfetchChatList())    
  };

  useEffect(() => {
    const getTokenAndHandle = async () => {
      await requestUserPermission();
      await notificationListener();  
      const token = await getToken();  
     // console.log('user : ',user.name);
      //console.log('\nToken : ',token);
      setCurrentToken(token);
      await dispatch(updateUserToken(user.id, token));  
      
    };  

    getTokenAndHandle();
    
  }, []);

   // Use useEffect with currentToken as a dependency to monitor token changes
  useEffect(() => {
        
    if (user.id && currentToken && user.fcmToken !== currentToken) {
      dispatch(updateUserToken(user.id, currentToken)); // Update the token in the database
    }
  }, [currentToken]);


  
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
