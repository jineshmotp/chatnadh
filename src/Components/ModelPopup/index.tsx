import React, { useState, useEffect } from 'react';
import { Text, View, Stylesheet, Modal } from 'react-native'

const ModelPopup = () => {


  return (
    <View>
         <Modal
        visible={isModalVisible}
        transparent
        animationType="slide" // Use slide animation for modal
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)} // Hide the modal on overlay press
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

const styles = Stylesheet.create({
  
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