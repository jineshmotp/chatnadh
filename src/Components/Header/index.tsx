import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
interface HeaderProps {
  openModal: () => void; // Function to execute on button press
  labeltxt: string; // Button label
  pageidx:number;
  chatuserimg:string;
}


const Header: React.FC<HeaderProps> =  ({ openModal, labeltxt, pageidx,chatuserimg }) => {

  const navigation = useNavigation();
  
  const backButton = () =>
  {
    navigation.navigate('AppStack');
  }
  
  const renderLogoOrBackButton = () => {
    if (pageidx === 1) {
      return (
        <TouchableOpacity onPress={backButton}  style={styles.logoutButton}>
          {/* <Image source={require('../../Images/logo_white_back.png')} style={styles.logo} resizeMode="contain" /> */}
          <Icon name="angle-left" size={hp('5%')} color="white" />
        </TouchableOpacity>
        
      );
    } else {
      return (
        <Image source={require('../../Images/logo_white.png')} style={styles.logo} />
      );
    }
  };


  const ChatImageCheck = () => {
    if (chatuserimg !== '0' ) {
      return (

        <Image source={chatuserimg} style={styles.logouser} />
       
        
      );
    } else {
      return (
        <TouchableOpacity
        style={styles.logoutButton}
        onPress={openModal}
      >
        <Icon name="ellipsis-v" size={hp('5%')} color="white" />
      </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.header}>
      {renderLogoOrBackButton()}
      <Text style={styles.headerText}>{labeltxt}</Text>
      {ChatImageCheck()}
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
    width: wp('10%'),
    height: wp('10%'),
  },
  logouser: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius:wp('20%'),
  },
  backButton: {
    padding: 0,
    width: wp('10%'),
    height: wp('10%'),
  },
  headerText: {
    color: 'white',
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 0,
  },
});

export default Header;
