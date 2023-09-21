import { PermissionsAndroid, Platform } from "react-native";

export const requestImagePickerPermission = () => new Promise<boolean>(async (resolve, reject) => {
    try {
        if (Platform.OS === 'android' && Platform.Version && Platform.Version > 22) {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
            ]);
            console.log(granted, 'granted response');
            if (
                granted['android.permission.CAMERA'] !== 'granted' ||
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted' ||
                granted['android.permission.READ_EXTERNAL_STORAGE'] !== 'granted'
            ) {
                // You should define or import the showError function here
                // For example, if showError is from a library or utility, make sure to import it.
                // showError("Don't have required permission. Please allow permissions");
                console.error("Don't have required permission. Please allow permissions"); // Log an error message instead
                return resolve(false);
            }
            return resolve(true);
        }
        return resolve(true);
    } catch (error) {
        console.error('Error requesting permissions:', error);
        return resolve(false);
    }
});
