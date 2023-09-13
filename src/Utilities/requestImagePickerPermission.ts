import { Alert } from 'react-native';
import { Platform } from 'react-native';
import { check, PERMISSIONS, openSettings } from 'react-native-permissions';

const requestImagePickerPermission = async (): Promise<boolean> => {
  try {
    let permissionStatus;

    if (Platform.OS === 'android') {
      permissionStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } else if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }

    console.log(permissionStatus); // Log the permission status here

    if (permissionStatus === 'granted') {
      return true;
    } else if (permissionStatus === 'denied') {
      // Permission denied, prompt the user to grant permission
      Alert.alert(
        'Permission Required',
        'To use this feature, please grant permission to access photos in your device settings.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Open app settings to let the user manually grant permission
              openSettings();
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              // Permission denied, handle accordingly
            },
            style: 'cancel',
          },
        ]
      );
    } else if (permissionStatus === 'unavailable') {
      // The permission is not available on this device/platform
      // Handle accordingly (e.g., inform the user)
    }

    return false; // Permission denied
  } catch (error) {
    console.error('Error checking permission:', error);
    return false;
  }
};

export default requestImagePickerPermission;
