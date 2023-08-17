import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../Screens/AppScreens/SettingsScreen';

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        tabBarVisible: false,
      }}
    >
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
