import React from 'react';
import {StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../Constants/colors';

const styles = StyleSheet.create({

  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBottom: {
    flex: 8,
    justifyContent: 'center',
    width: wp('100%'),
    borderTopLeftRadius: wp('8%'),
    borderTopRightRadius: wp('8%'),
    alignItems: 'center',
    padding: wp('5%'),
    backgroundColor: colors.white,
  },
  notificationText: {
    fontSize: hp('2.5%'),
  },

  //#######################################

 
  logo: {
    width: wp('50%'),
    height: hp('20%'),
  },
  heading: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: colors.primary,
    marginVertical: hp('2%'),
    textAlign: 'center',
  },
  description: {
    fontSize: wp('4%'),
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
    borderRadius: wp('3%'),
  },
  buttonText: {
    fontSize: wp('4%'),
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  NameText: {
    fontSize: wp('4%'),
    color: colors.tertiary,
    fontWeight: 'bold',
    textAlign: 'center',
  },

//############# settings screen 

userInfoContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: wp('5%'),
  marginBottom: hp('3%'),
},
userImage: {
  width: wp('15%'),
  height: wp('15%'),
  borderRadius: wp('7.5%'),
},
userInfo: {
  flex: 1,
  marginLeft: wp('3%'),
},
userName: {
  fontSize: hp('2.5%'),
  fontWeight: 'bold',
},
userEmail: {
  fontSize: hp('2%'),
  color: 'gray',
},
editButton: {
  alignSelf: 'flex-start',
  marginTop: hp('1%'),
  paddingHorizontal: wp('4%'),
  paddingVertical: hp('1.5%'),
  backgroundColor: colors.secondary,
  borderRadius: wp('2%'),
},
editButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: hp('2%'),
},
userDetails: {
  alignItems: 'center',
  marginVertical: hp('3%'),
  marginBottom: hp('10%'),
},
detailLabel: {
  fontSize: hp('2%'),
  color: colors.secondary,
},
detailText: {
  fontSize: hp('2.5%'),
  fontWeight: 'bold',
  marginTop: hp('0.5%'),
},



//###########   Chatlist #############################################

ChatListCard: {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: hp('1%'),
  paddingHorizontal: wp('2%'),
  borderBottomWidth: wp(0.1),
  borderBottomColor: colors.primary,
},
ChatListUserImg: {
  width: wp('12%'),
  height: wp('12%'),
  borderRadius: wp('10%'),
},
ChatListUserInfo: {
  flexDirection: 'row', // Set flexDirection to 'row' for horizontal layout
  alignItems: 'center',
},
ChatListTextSection: {
  flex: 1,
  marginLeft: wp('2%'),
},
ChatListUserInfoText: {
  flexDirection: 'row',
  alignItems: 'center', // Align items vertically
  justifyContent: 'space-between',
  marginBottom: hp('0.5%'),
},
ChatListUserName: {
  fontSize: wp('4.5%'),
  color: colors.primary,
  fontWeight: 'bold',
  fontFamily: 'Lato-Regular',
},
ChatListPostTime: {
  fontSize: wp('3.5%'),
  color: colors.secondary,
  fontFamily: 'Lato-Regular',
  flex: 1, // Allow the time text to expand to the available space
  textAlign: 'right', // Align the time text to the right
},
ChatListMessageText: {
  fontSize: wp('3.5%'),
  color: colors.tertiary,
  marginTop: hp('0.2%'),
  lineHeight: wp('4.5%'),  
},
flatListContentContainer: {
  paddingBottom: hp('5.8%') > 800 ? hp('6.2%') : hp('6.4%'),
},

//##############################################3


  });
  
  export default styles;