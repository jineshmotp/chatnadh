import React, { FunctionComponent } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconOcticons from 'react-native-vector-icons/Octicons';
import { colors } from '../../Constants/colors';

interface ContactListProps {
  item: {
    id: string;
    username: string;
    picture: any; // or specify the correct image type
    time: string;
    lastMessage: string;
    onlineStatus: boolean;
    hasStory: boolean;
    notification: number;
  };
  gotoChatScreen: () => void;
}

const ContactList: FunctionComponent<ContactListProps> = ({ item, gotoChatScreen }) => {
  return (
    <TouchableOpacity style={styles.ChatListCard} onPress={() => gotoChatScreen(item)}>
    <View style={styles.ChatListUserInfo}>
                  
        <View style={styles.ChatListImageSection}>
          <Image
              source={{ uri: item.img }} 
              style={[
                styles.ChatListUserImg,
                { borderColor: item.onlineStatus ? colors.primary : colors.white }
              ]}
            />
        </View>
      <View style={styles.ChatListTextSection}>
        <View style={styles.ChatListUserInfoText}>
          <Text style={styles.ChatListUserName}>{item.name}</Text>
          {/* <Text style={styles.ChatListPostTime}>{item.time}</Text> */}
        </View>
        <View style={styles.ChatListUserInfoText}>
          <Text style={styles.ChatListMessageText} numberOfLines={1} ellipsizeMode="tail">
            {item.about}
          </Text>
                    
        </View>
      </View>
    </View>
  </TouchableOpacity>



  );
};

const styles = StyleSheet.create({
  ChatListCard: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    borderBottomWidth: wp(0.1),
    borderBottomColor: colors.primary,
  },
  ChatListUserInfo: {
    flexDirection: 'row', // Set flexDirection to 'row' for horizontal layout
    alignItems: 'center',
    justifyContent: 'center',
  },
  ChatListImageSection: {
    justifyContent: 'center',
    marginRight: wp('2%'),
    marginLeft: wp('2%'),
  },
  ChatListUserImg: {
    width: wp('12%'),
    height: wp('12%'),
    borderWidth: wp('1%'),
    borderColor: 'red',
    borderRadius: wp('10%'),
  },
  ChatListUserStatus: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  ChatListTextSection: {
    flex: 4,
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
  ChatListMessageAndNotification: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ChatListMessageText: {
    flex: 1,
    fontSize: wp('3.5%'),
    color: colors.tertiary,
    marginTop: hp('0.2%'),
    lineHeight: wp('4.5%'),
  },
  ChatListNotification: {
    fontSize: wp('3.5%'),
    color: colors.white,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    backgroundColor: colors.primary,
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('20%'),
    marginLeft: wp('1%'),
  },
  flatListContentContainer: {
    paddingBottom: hp('5.8%') > 800 ? hp('6.2%') : hp('6.4%'),
  },

});

export default ContactList;
