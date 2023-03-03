import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CloseChatListBtn from './CloseChatListBtn';
import RoomMessageView from './RoomMessageView';

function ChatList(props) {
  const {userName, userID, onSetChatListVisible, conferenceID} = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CloseChatListBtn onClose={onSetChatListVisible} />
        <Text style={styles.title}>Chat</Text>
      </View>
      <View style={styles.divide} />
      <View style={styles.memberListContainer}>
        <RoomMessageView
          onClose={onSetChatListVisible}
          userName={userName}
          userID={userID}
          conferenceID={conferenceID}
        />
      </View>
    </View>
  );
}

export default memo(ChatList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'rgba(34,34,34,0.8)',
    width: '100%',
    height: 571,
    zIndex: 8,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
  },
  downArrowIcon: {
    marginLeft: 11.5,
    marginRight: 5,
  },
  title: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  divide: {
    width: '100%',
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.15,
  },
  memberListContainer: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 14,
    // thêm cái này vào đẩy nó xuống dưới
    justifyContent: 'flex-end',
  },
});
