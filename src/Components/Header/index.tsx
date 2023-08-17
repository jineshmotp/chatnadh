import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ openModal, labeltxt, pageidx }) => {
  const renderLogoOrBackButton = () => {
    if (pageidx === 1) {
      return (
        <TouchableOpacity style={styles.backButton} onPress={openModal}>
          <Icon name="arrow-left" size={hp('4%')} color="white" />
        </TouchableOpacity>
      );
    } else {
      return (
        <Image source={require('../../Images/chatnadh_logo_white.png')} style={styles.logo} />
      );
    }
  };

  return (
    <View style={styles.header}>
      {renderLogoOrBackButton()}
      <Text style={styles.headerText}>{labeltxt}</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={openModal}
      >
        <Icon name="ellipsis-v" size={hp('4%')} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    padding: wp('5%'),
  },
  logo: {
    width: wp('10%'), // Responsive logo width
    height: wp('10%'), // Responsive logo height
  },
  backButton: {
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
  },
});

export default Header;
