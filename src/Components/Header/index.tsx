import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity,KeyboardAvoidingView, Image,ImageSourcePropType,TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../Constants/colors';

interface HeaderProps {
  openModal: () => void; // Function to execute on button press
  chatsearch:boolean;
  labeltxt: string; // Button label
  pageidx: number;
  chatuserimg: string | ImageSourcePropType;
  onlinestatus:boolean;
  isKeyboardOpen:boolean;
}

const Header: React.FC<HeaderProps> = ({ openModal,chatsearch, labeltxt,onlinestatus, pageidx, chatuserimg, isKeyboardOpen }) => {
 
 
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const {user, isLoading, error } = userLogin
 
  const navigation = useNavigation();
  const iconSize = hp('3%');
  const iconSizeLR = hp('5%');
  const backButton = () => {
    navigation.goBack();
  };

  const renderLeftside = () => {
    
    if (pageidx === 0) {

      return (
        <View style={styles.headerLeft} >
           <Image source={{ uri: user.img }}  style={styles.logouser} />
          <View style={styles.headerLeftText}>
              <Text style={styles.headerText}>{labeltxt}</Text>            
          </View>
       
       </View >
      )


    }


    else if (pageidx === 1) {

      return (
        <KeyboardAvoidingView
        style={styles.headerLeft}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
      >
              <View style={styles.searchInputContainer} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
                <TouchableOpacity style={styles.searchIconContainer}>
                  <Icon name="search" size={iconSize} color="white" />
                </TouchableOpacity>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search"
                  placeholderTextColor="white"                  
                />
              </View>      
       
       </KeyboardAvoidingView >
      )


    }


    else if (pageidx === 2) {

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


    else if (pageidx === 3) {
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
   
    else
    {
      return (
        <View style={styles.headerLeft} >
           <Image source={{ uri: user.img }}  style={styles.logouser} />
          <View style={styles.headerLeftText}>
              <Text style={styles.headerText}>{labeltxt}</Text>            
          </View>
       
       </View >
      )
    }
  };

  const renderRightside = () => {

    if (pageidx === 0) {

      return (
          <View style={styles.iconContainer}>
        
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="search" size={iconSize} color="white" />
          </TouchableOpacity>
        
          <TouchableOpacity onPress={openModal} style={[styles.iconContainer,{paddingLeft: wp('5%'),}]}>
            <Icon name="ellipsis-v" size={iconSize} color="white" />
          </TouchableOpacity>
        </View>
      )

      }


      // else if (pageidx === 1) {

      //   return (
      //       <View style={styles.iconContainer}> 

      //       <TouchableOpacity onPress={openModal} style={styles.iconContainer}>
      //         <Icon name="ellipsis-v" size={iconSize} color="white" />
      //       </TouchableOpacity>
      //     </View>
      //   )
  
      //   }

    else if (pageidx === 2) {

      return (

        <View style={styles.iconContainer}>     
        <TouchableOpacity onPress={openModal} style={[styles.iconContainer,{paddingLeft: wp('5%'),}]}>
          <Icon name="ellipsis-v" size={iconSize} color="white" />
        </TouchableOpacity>
      </View>
      )
    }

    else {

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
         <TouchableOpacity/>
    </View>
      )

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
    minHeight: hp('10%'),
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

  //################################

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginLeft: wp('2%'),
    paddingHorizontal: wp('2%'),
  },
  searchIconContainer: {
    marginRight: wp('2%'),
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: hp('2%'),
  },

});

export default Header;
