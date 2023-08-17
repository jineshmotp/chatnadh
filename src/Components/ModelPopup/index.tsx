import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const ModelPopup = ({isModalVisible,closeModal}) => {


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
            <Text style={styles.modalOption}>Settings</Text>
            <Text style={styles.modalOption}>About</Text>
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
  },
});

export default ModelPopup;