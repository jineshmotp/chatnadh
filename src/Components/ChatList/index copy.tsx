import React, { FunctionComponent,useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconOcticons from 'react-native-vector-icons/Octicons';
import { colors } from '../../Constants/colors';

import { formatDate } from '../../Utilities/dateUtils';

import FaceEmotion from '../FaceEmotion';

import { useDispatch, useSelector } from 'react-redux'

import { userIndividual } from '../../Redux/userActions';

import LoadingScreen from '../LoadingScreen';

interface ChatListProps {
  item: {
    chatId: string;
    emotion: string;
    lastMessage: string;
    lastMessageTime: string;
    notification: number;
    opponent: {
      about: string;
      emailId: string;
      hasStory: boolean;
      id: string;
      img: string;
      name: string;
      notification: number;
      onlineStatus: boolean;
      password: string;
      time: string;
    };
  };
  gotoChatScreen: () => void;
}

const ChatList: FunctionComponent<ChatListProps> = ({ item, gotoChatScreen }) => {
  const formattedTime = formatDate(item.lastMessageTime);

  interface UserIndidualState {
    userIndividual: {
      userIndividualData: {
      id: string;
      about: string;
      accountactivation: number;
      emailId: string;
      hasStory: boolean;
      img: string;
      lastMessage: string;
      name: string;
      notification: number;
      onlineStatus: boolean;
      password: string;
      time: string;
      };
      userIndividualLoading: boolean;
      userIndividualerror: string | null;
    };   
  }

  const dispatch = useDispatch<Dispatch>();
  const {userIndividualLoading, userIndividualData, userIndividualerror } = useSelector((state: UserIndidualState) => state.userIndividual);
  
  useEffect(() => {
    const getUserindividual = async () => {     
      await dispatch(userIndividual(item.opponent.id));
    };
    getUserindividual();
  }, [dispatch,item]);

  if(userIndividualLoading)
  {
    return (
      <LoadingScreen />
    )
  }
 
  return (
    <TouchableOpacity style={styles.ChatListCard} onPress={() => gotoChatScreen(item)}>
      <View style={styles.ChatListUserInfo}>

        {item.opponent?.onlineStatus !== false ? (
            <IconOcticons name="dot-fill" size={hp('5%')} color='green' />
          ) : (
            <IconOcticons name="dot" size={hp('5%')} color='red' />
          )}

        <View style={styles.ChatListImageSection}>
          <Image
            source={{ uri: item.opponent.img }}
            style={[
              styles.ChatListUserImg,
              { borderColor: item.opponent.hasStory ? colors.primary : colors.transparent }
            ]}
          />
        </View>
        <View style={styles.ChatListTextSection}>
          <View style={styles.ChatListUserInfoText}>
            <Text style={styles.ChatListUserName}>{item.opponent.name}</Text>
            <Text style={styles.ChatListPostTime}>{formattedTime}</Text>
          </View>
          <View style={styles.ChatListUserInfoText}>
            <Text style={styles.ChatListMessageText} numberOfLines={1} ellipsizeMode="tail">
                        
              {item.lastMessage}
                 
            </Text>

            {/* <Text style={styles.ChatListMessageText} numberOfLines={1} ellipsizeMode="tail">
               <FaceEmotion emotion={item.emotion} text={item.emotion} val={1} />                          
             </Text> */}
            {item.opponent.notification !== 0 && (
              <Text style={styles.ChatListNotification}>{item.opponent.notification}</Text>
            )}
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

export default ChatList;
