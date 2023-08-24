import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image,ImageSourcePropType } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  openModal: () => void; // Function to execute on button press
  chatsearch:boolean;
  labeltxt: string; // Button label
  pageidx: number;
  chatuserimg: string | ImageSourcePropType;
  onlinestatus:boolean;
}

const Header: React.FC<HeaderProps> = ({ openModal,chatsearch, labeltxt,onlinestatus, pageidx, chatuserimg }) => {
  const navigation = useNavigation();
  const iconSize = hp('3%');
  const iconSizeLR = hp('5%');
  const backButton = () => {
    navigation.navigate('AppStack');
  };

  const renderLeftside = () => {
    if (chatuserimg !== '0') {
      return (

        <View style={styles.headerLeft} >
        <TouchableOpacity onPress={backButton} style={styles.iconContainer}>
          <Icon name="angle-left" size={iconSizeLR} color="white" style={{paddingRight: wp('5%')}} />
          <Image source={{ uri: chatuserimg }}  style={styles.logouser} />
         
        </TouchableOpacity>

        <View style={styles.headerLeftText}>
            <Text style={styles.headerText}>{labeltxt}</Text>

            <Text style={styles.headersubText}>
              {onlinestatus ? 'online' : 'offline'}
            </Text>
        </View>

        </View>



      );
    } 
    else if (pageidx === 1) 
    {
      return (

        <View style={styles.headerLeft} >
        
          <TouchableOpacity onPress={backButton} style={styles.iconContainer}>
            <Icon name="angle-left" size={iconSizeLR} color="white"  />         
          </TouchableOpacity>           

          <View style={styles.headerLeftText}>
              <Text style={styles.headerText}>{labeltxt}</Text>            
          </View>        
        
        </View>
      );
    }
    else
    {
      return (
        <View style={styles.headerLeft} >
          <Image source={require('../../Images/logo_white.png')} style={styles.headerlogo} />
          <View style={styles.headerLeftText}>
              <Text style={styles.headerText}>{labeltxt}</Text>            
          </View>
       
       </View >
      )
    }
  };

  const renderRightside = () => {
    if (chatuserimg !== '0') {
      return (     
       
       <View style={styles.iconContainer}>
          
          {/* <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="videocam" size={iconSize} color="white" />
          </TouchableOpacity> */}
        

          {/* <TouchableOpacity style={[styles.iconContainer,{paddingLeft: wp('5%'),}]}>
            <Ionicons name="call" size={iconSize} color="white" />
          </TouchableOpacity> */}

          <TouchableOpacity style={[styles.iconContainer,{paddingLeft: wp('5%'),}]}>
            <Icon name="ellipsis-v" size={iconSize} color="white" />
          </TouchableOpacity>
        </View>
       


      );
    } else {
      return (
        <View style={styles.iconContainer}>
          {chatsearch ? ( 
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="search" size={iconSize} color="white" />
          </TouchableOpacity>

          ):null
          }

          <TouchableOpacity onPress={openModal} style={[styles.iconContainer,{paddingLeft: wp('5%'),}]}>
            <Icon name="ellipsis-v" size={iconSize} color="white" />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <View style={styles.header}>
      {renderLeftside()}  

      {renderRightside()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('100%'),
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('1%'),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeftText: {
    paddingLeft: hp('1%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerlogo: {
    width: wp('10%'), // Adjust the width as needed
    height: wp('10%'), // Use the same height as the width to maintain aspect ratio
    resizeMode: 'contain', // Use 'contain' for logo images
  },
  logouser: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('20%'),
    resizeMode: 'cover',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',  
    paddingRight:wp('0%'),
  },
  iconButton: {    
    paddingRight: wp('5%'),
    paddingLeft: wp('5%'),
  },
  headerText: {
    color: 'white',
    fontSize: hp('2.5%'),
    textAlign:'left',
    fontWeight: 'normal',
  },
  headersubText: {
    color: 'white',
    textAlign:'left',
    fontSize: hp('1.8%'),
    fontWeight: 'normal',
  },
});

export default Header;
