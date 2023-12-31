import React, { useState, useEffect } from 'react';
import { View, Image, TextInput,StyleSheet,TouchableOpacity,Text,Platform,KeyboardAvoidingView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../Constants/colors';


interface ContactScreenHeaderProps {

  onSearch: (searchQuery: string) => void;
  gotoChatListScreen: () => void;

}

const ContactScreenHeader: React.FC<ContactScreenHeaderProps> = ({  gotoChatListScreen, onSearch  }) => {
  const iconSize = hp('3%');
  const iconSizeLR = hp('5%');
 
  return (
    <KeyboardAvoidingView
    style={styles.headerLeft}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
  >
          <View style={styles.searchInputContainer} behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
            {/* <TouchableOpacity style={styles.searchIconContainer} onPress={gotoChatListScreen}>
              <Icon name="angle-left" size={iconSizeLR} color="white"  />              
            </TouchableOpacity> */}
            <TextInput
              style={styles.searchInput}
              placeholder="Type Contact name ...."
              placeholderTextColor='gray' 
              onChangeText={onSearch}                
            />

           <TouchableOpacity style={styles.searchIconContainer}>
              <Icon name="search" size={iconSize} color="white" />
            </TouchableOpacity>
          </View>      
   
   </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
    searchInputContainer: {
        minHeight: hp('10%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        marginLeft: wp('2%'),
        paddingHorizontal: wp('2%'),
      },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
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

export default ContactScreenHeader;