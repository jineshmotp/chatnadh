import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { Provider } from 'react-redux';
import initializeStore from './store'; // Import the modified initializeStore function
import Router from './src/Router';
import { LogBox } from 'react-native';
import { onDisplayLocalNotification } from './src/Utilities/commonUtils';

LogBox.ignoreAllLogs(); // Ignore all log notifications

const App: React.FC = () => {
  const [resolvedStore, setResolvedStore] = useState(null);

  useEffect(() => {
    const resolveStore = async () => {
      const storeInstance = await initializeStore();
      setResolvedStore(storeInstance);
    };

    resolveStore();
  }, []);



  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
         
      onDisplayLocalNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        { key1: 'value1', key2: 'value2' } // Replace with your desired data
      );
    });   
    return unsubscribe;
  }, []);
  
  
  if (!resolvedStore) {
    // Return null or an empty component while the store is being resolved
    return null;
  }

  return (
    <Provider store={resolvedStore}>
      <Router />
    </Provider>
  );
};


export default App;