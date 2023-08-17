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
    flex: 6,
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
logoutButton: {
  paddingVertical: wp('3%'),
  backgroundColor: '#e74c3c',
  borderRadius: wp('3%'),
  alignItems: 'center',
},
logoutButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: hp('2%'),
},

userDetails: {
  alignItems: 'center',
  marginVertical: hp('3%'),
  marginBottom: hp('3%'),
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





  
  });
  
  export default styles;