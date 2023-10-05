import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
  return authStatus;
}



export const notificationListener = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};

export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  // console.log('#######################################3');
  // console.log(token);
  // console.log('#######################################3');
  return token;
};



export const onDisplayLocalNotification = async(title,body,data) => {

  const authstatus = await requestUserPermission();
  console.log('again status : ',authstatus);
  
  
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'ChatNadh',
  });

  // Required for iOS
  // See https://notifee.app/react-native/docs/ios/permissions
  await notifee.requestPermission();

  const notificationId = await notifee.displayNotification({
    id: '123',
    title: title,
    body: body,
    data:data ? data : null,
    android: {
      channelId,
    },
  });

  // // Sometime later...
  // await notifee.displayNotification({
  //   id: '1234',
  //   title: 'Updated Notification Title',
  //   body: 'Updated main body content of the notification',
  //   android: {
  //     channelId,
  //   },
  // });
  
};
