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

  containerBottomContact: {
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

flatListContentContainer: {
  paddingBottom: hp('5.8%') > 800 ? hp('6.2%') : hp('6.4%'),
},

//#################### ChatScreen ##########################3

Messagecontainer: {
  flex: 8,
  flexDirection: 'column', // Arrange items vertically
  justifyContent: 'flex-end', // To push input container to the bottom
  width: wp('100%'),
  borderTopLeftRadius: wp('8%'),
  borderTopRightRadius: wp('8%'),
  
  paddingLeft: wp('2%'),
  paddingRight: wp('2%'),
  paddingTop: wp('2%'),
  backgroundColor: colors.white,
  
},

messageContainer1: {
  maxWidth: '80%',
  alignSelf: 'flex-start',
  backgroundColor: colors.secondary,
  padding: wp('3%'),
  borderRadius: wp('3%'),
  marginVertical: hp('1%'),
},
messageText: {
  color: colors.white,
  fontSize: hp('2%'),
},
inputContainer: { 
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: wp('2%'),
  paddingBottom: hp('1%'),
  paddingTop: hp('1%'),
  backgroundColor:colors.transparent
},
input: {
  flex: 1,
  height: hp('5%'),
  borderColor: colors.primary,
  backgroundColor:colors.white,
  borderWidth: wp(0.2),
  borderRadius: wp('3%'),
  fontSize: wp('4%'),
  paddingHorizontal: wp('3%'),
  marginRight: wp('2%'),
},
sendButton: {
  backgroundColor: colors.primary,
  paddingHorizontal: wp('3%'),
  paddingVertical: hp('1%'),
  borderRadius: wp('3%'),
},
timestampText: {
  color: 'gray',
  fontSize: hp('1.5%'),
  alignSelf: 'flex-end',
},
scrollViewContent: {
  flexGrow: 1,
  paddingVertical: 0,
  paddingHorizontal: 0,
  backgroundColor:colors.white
},


  });
  
  export default styles;