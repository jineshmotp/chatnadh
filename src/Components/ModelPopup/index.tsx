import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'; 
import { colors } from '../../Constants/colors';

interface ModalProps {  
  isModalVisible: boolean; // Custom styles for the button label
  closeModal: () => void; // Function to execute on button press  
}

const ModelPopup: React.FC<ModalProps> =({isModalVisible,closeModal}) => {

  const navigation = useNavigation();
  
  const handleSettingsPress = () => {
    closeModal(); // Close the modal first
    navigation.navigate('SettingsStack');
  };

  const handleAboutPress = () => {
    closeModal(); // Close the modal first
    navigation.navigate('AboutStack');
  };

  return (
    <View>
        <Modal
        visible={isModalVisible}
        transparent
        animationType="slide" // Use slide animation for modal
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={closeModal} // Hide the modal on overlay press
        >
          <View style={styles.modalContent}>
          <TouchableOpacity onPress={handleSettingsPress} >
              <Text style={styles.modalOption}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAboutPress} >
              <Text style={styles.modalOption}>About</Text>
            </TouchableOpacity>
            {/* Add more options as needed */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
    
  )
}

const styles = StyleSheet.create({
  
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    justifyContent: 'flex-end', // Display modal at the bottom
  },
  modalContent: {
    backgroundColor: 'white',
    width: wp('100%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    alignItems: 'center',
    paddingVertical: wp('2%'),
  },
  modalOption: {
    fontSize: hp('2%'),
    paddingVertical: wp('3%'),
    color:colors.primary
  },
  modeltouch:
  {
   textAlign:'center',
    width: wp('100%'),
  }
});

export default ModelPopup;