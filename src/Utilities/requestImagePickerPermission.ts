import { Platform } from 'react-native';
import { PERMISSIONS, request, check, RESULTS } from 'react-native-permissions';

const requestImagePickerPermission = async (): Promise<boolean> => {
    try {
        if (Platform.OS === 'android' && Platform.Version && Platform.Version > 22) {
            console.log('Requesting CAMERA permission...');
            const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
            console.log('Camera permission result:', cameraPermission);

            console.log('Requesting WRITE_EXTERNAL_STORAGE permission...');
            const storagePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            console.log('Storage permission result:', storagePermission);

            console.log('Requesting READ_EXTERNAL_STORAGE permission...');
            const readStoragePermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            console.log('Read storage permission result:', readStoragePermission);

            if (
                cameraPermission === RESULTS.GRANTED &&
                storagePermission === RESULTS.GRANTED &&
                readStoragePermission === RESULTS.GRANTED
            ) {
                return true; // All required permissions granted
            }
        }
        return false; // Permissions denied
    } catch (error) {
        console.error('Error requesting permissions:', error);
        return false;
    }
};
