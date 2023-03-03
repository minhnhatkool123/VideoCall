import React, {memo} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';

import {useSelector} from 'react-redux';

import PinBtn from './PinBtn';
import PinRemoteBtn from './PinRemoteBtn';
import MicrophoneCallMemberStateIcon from './MicrophoneCallMemberStateIcon';
import CameraCallMemberStateIcon from './CameraCallMemberStateIcon';

const getShotName = name => {
  if (!name) {
    return '';
  }

  const nl = name.split(' ');
  var shotName = '';
  nl.forEach(part => {
    if (part !== '') {
      shotName += part.substring(0, 1);
    }
  });
  return shotName;
};

function MemberList(props) {
  const {userName} = props;

  let userList = useSelector(state => state.videoRemote.remoteUsers);
  const startCam = useSelector(state => state.cameraLocal.value);
  const startMic = useSelector(state => state.micLocal.value);
  const hasSound = useSelector(state => state.audioLocal.value);

  const renderItem = _ref => {
    let {item} = _ref;

    return (
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.avatar}>
            <Text style={styles.nameLabel}>{getShotName(item.userName)}</Text>
          </View>
          <Text style={styles.name}>{item.userName}</Text>
        </View>

        <View style={styles.itemRight}>
          <MicrophoneCallMemberStateIcon
            startMic={item.isMicDeviceOn}
            hasSound={item.soundLevel}
          />
          <CameraCallMemberStateIcon iconCameraOn={item.isCameraDeviceOn} />
          {userList.length <= 0 ? null : (
            <PinRemoteBtn userIDPin={item.userID} />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.avatar}>
            <Text style={styles.nameLabel}>{getShotName(userName)}</Text>
          </View>
          <Text style={styles.name}>{userName} (Bạn)</Text>
        </View>

        <View style={styles.itemRight}>
          <MicrophoneCallMemberStateIcon
            startMic={startMic}
            hasSound={hasSound}
          />
          <CameraCallMemberStateIcon iconCameraOn={startCam} />
          {userList.length <= 1 ? null : <PinBtn />}
        </View>
      </View>

      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={item => item.userID}
      />
    </View>
  );
}

export default memo(MemberList);

const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 17,
    height: 62,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    backgroundColor: '#DBDDE3',
    borderRadius: 1000,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameLabel: {
    flex: 1,
    textAlign: 'center',
    color: '#222222',
    fontSize: 16,
  },
  name: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});
