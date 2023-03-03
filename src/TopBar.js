import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MemberBtn from './MemberBtn';

export default function TopBar(props) {
  const {roomID, onMemberList} = props;

  return (
    <View style={styles.topBarContainer}>
      <View style={styles.left}>
        <Text style={styles.title}>RoomID:{roomID}</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.customIconContainer}>
          <MemberBtn onMemberList={onMemberList} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  topBarContainer: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    top: 35,
    height: 44,
    zIndex: 6,
    justifyContent: 'space-between',
    paddingLeft: 3.5,
    paddingRight: 13.5,
  },
  left: {
    opacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 4,
  },
  customIconContainer: {
    marginLeft: 10,
  },
});
