import React from 'react';
import { View, Image, Modal,Text, TouchableOpacity, StyleSheet,
  Linking, 
  Platform,
  PermissionsAndroid,
  Alert
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CameraRoll from "@react-native-camera-roll/camera-roll";
//import RNFetchBlob from 'react-native-fetch-blob';
import RNFetchBlob from 'rn-fetch-blob';

interface ImageFullScreenProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageFullScreen: React.FC<ImageFullScreenProps> = ({ imageUrl, onClose }) => {
    const modalWidth = wp('80%'); // Adjust as needed
    const modalHeight = hp('80%'); // Adjust as needed

   

    const handleDownloadImages = async () => {
      let response; // Declare the response variable
    
      try {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7); // Generates a random alphanumeric string
        const filename = `${timestamp}_${randomString}.jpg`;
    
        response = await RNFetchBlob.config({
          path: RNFetchBlob.fs.dirs.DCIMDir + filename, // Specify the file path where you want to save the image
        }).fetch('GET', imageUrl);
    
        if (response.respInfo.status === 200) {
          response.flush();
          Alert.alert('Image Downloaded', 'The image has been saved to your gallery.');
        } else {
          response.flush();
          Alert.alert('Download Failed', 'Failed to download the image.');
        }
      } catch (error) {
      
        console.error('An error occurred while saving the image:', error);
        Alert.alert('Error', 'An error occurred while saving the image.');
      }
    };

     // const openAppSettings = () => {
    //   if (Platform.OS === 'android') {
    //     Linking.openSettings();
    //   } else {
    //     Linking.openURL('app-settings:');
    //   }
    // };
  
    // const handleDownloadImage = async () => {
    //   if (Platform.OS === 'android') {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       {
    //         title: 'Storage Permission',
    //         message: 'App needs access to your storage to download the image.',
    //         buttonPositive: 'Allow',
    //       }
    //     );
    
            
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       console.log('Storage permission granted. Calling downloadImage...');
    //       downloadImage();
    //     } else {
    //       Alert.alert(
    //         'Permission Denied',
    //         'Storage permission was not granted. You can grant the permission in the app settings.',
    //         [
    //           {
    //             text: 'Open Settings',
    //             onPress: openAppSettings,
    //           },
    //           {
    //             text: 'Cancel',
    //             style: 'cancel',
    //           },
    //         ]
    //       );
    //     }
    //   } else {
    //     downloadImage();
    //   }
    // };
  
    // const downloadImage = async () => {
      
    //   try {
    //     console.log('image url :',imageUrl)
    //     const saveResult = await CameraRoll.save(imageUrl, { type: 'photo' });
    //     if (saveResult) {
    //       console.log('The image has been saved to your gallery')
    //       Alert.alert('Image Downloaded', 'The image has been saved to your gallery.');
    //     } else {
    //       console.log('Failed to save the image to your gallery.')
    //       Alert.alert('Download Failed', 'Failed to save the image to your gallery.');
    //     }
    //   } catch (error) {
    //     console.log('An error occurred while saving the image.')
    //     Alert.alert('Error', 'An error occurred while saving the image.');
    //   }
    // };
  
   
  
    return (
      <Modal transparent={true} animationType="slide">
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            {/* Close button */}
            <Text style={styles.closeIcon}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadImages}>
            {/* Download button */}
            <Text style={styles.downloadIcon}>Download</Text>
          </TouchableOpacity>
          <View style={[styles.modalContent, { borderRadius: wp('3%') }]}>
            <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
          </View>
        </View>
      </Modal>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black', // Background color of the full-screen view
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalContent: {
      width: wp('80%'),
      height: hp('80%'),
    },
    closeButton: {
      position: 'absolute',
      top: hp('2%'), // Adjust as needed
      right: wp('5%'), // Adjust as needed
      zIndex: 1,
    },
    closeIcon: {
      color: 'white', // Color of the close icon (you can adjust this)
      fontSize: wp('5%'), // Adjust the font size as needed
    },
    downloadButton: {
      position: 'absolute',
      top: hp('2%'), // Adjust as needed
      left: wp('5%'), // Adjust as needed
      zIndex: 1,
    },
    downloadIcon: {
      color: 'white', // Color of the download icon (you can adjust this)
      fontSize: wp('5%'), // Adjust the font size as needed
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
  });
  
  export default ImageFullScreen;