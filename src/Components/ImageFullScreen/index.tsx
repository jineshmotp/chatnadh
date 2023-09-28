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
import RNFetchBlob from "rn-fetch-blob";

interface ImageFullScreenProps {
  imageUrl: string;
  onClose: () => void;
}

const ImageFullScreen: React.FC<ImageFullScreenProps> = ({ imageUrl, onClose }) => {
    const modalWidth = wp('80%'); // Adjust as needed
    const modalHeight = hp('80%'); // Adjust as needed

   

    // const handleDownloadImages = async () => {
    //   let response = null; // Declare the response variable
    
    //   try {
    //     // Fetch the image
    //     response = await RNFetchBlob.config({
    //       path: RNFetchBlob.fs.dirs.DCIMDir + 'my-download-image.jpg', // Specify the file path where you want to save the image
    //     }).fetch('GET', imageUrl);
    
    //     if (response.respInfo.status === 200) {
    //       // Image downloaded successfully
    //       // Flush or close the response before displaying the success message
    //       response.flush();
    //       response.close(); // Close the response to prevent conflicts
    //       Alert.alert('Image Downloaded', 'The image has been saved to your gallery.');
    //     } else {
    //       // Image download failed
    //       // Flush or close the response before displaying the error message
    //       response.flush();
    //       response.close(); // Close the response to prevent conflicts
    //       Alert.alert('Download Failed', 'Failed to download the image.');
    //     }
    //   } catch (error) {
    //     // Handle any errors that occur during the download process
    //     if (response) {
    //       // If a response exists, flush and close it to prevent conflicts
    //       response.flush();
    //       response.close();
    //     }
    //     console.error('An error occurred while saving the image:', error);
    //     Alert.alert('Error', 'An error occurred while saving the image.');
    //   }
    // };

    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Download App Storage Permission',
            message:'Download App needs access to your storage',             
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
          handleDownloadImages();
        } else {
          console.log('storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };


    const handleDownloadImages = async () => {
      // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = imageUrl;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
  
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/video_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Video',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
   
  
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