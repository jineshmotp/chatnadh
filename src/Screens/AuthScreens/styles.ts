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
      TopLogo: {
        width: wp('40%'),
        height: hp('15%'),
        resizeMode: 'contain',
      },
      containerBottom: {
        flex: 3,
        justifyContent: 'center',
        width: wp('100%'),
        borderTopLeftRadius: wp('8%'),
        borderTopRightRadius: wp('8%'),
        alignItems: 'center',
        padding: wp('5%'),
        backgroundColor: colors.white,
      },
      registerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      registerLink: {
        marginLeft: wp('1%'),
      },
      
  
  });
  
  export default styles;