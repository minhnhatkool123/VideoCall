import React, {memo, useEffect} from 'react';
import MemberList from './MemberList';
import {useSelector} from 'react-redux';

import {StyleSheet, View, Text, BackHandler} from 'react-native';
import CloseCallMemberListBtn from './CloseCallMemberListBtn';

function CallMemberList(props) {
  const {userName, onCloseCallMemberList} = props;
  const lengthOfUser = useSelector(
    state => state.videoRemote.lengthOfRemoteUsers,
  );

  function handleBackButtonClick() {
    onCloseCallMemberList();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('memberClose', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('memberClose', handleBackButtonClick);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CloseCallMemberListBtn onMemberList={onCloseCallMemberList} />
        <Text style={styles.title}>Member: {lengthOfUser + 1}</Text>
      </View>
      <View style={styles.divide} />
      <View style={styles.memberListContainer}>
        <MemberList userName={userName} />
      </View>
    </View>
  );
}

export default memo(CallMemberList);

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
  },
});
