import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

import ToggleCameraBtn from './ToggleCameraBtn';
import ToggleMicrophoneBtn from './ToggleMicrophoneBtn';
import LeaveBtn from './LeaveBtn';
import SwitchCameraBtn from './SwitchCameraBtn';
import ChatBtn from './ChatBtn';

function BottomBar(props) {
  const {userID, roomID, onChat} = props;
  return (
    <View style={styles.normalBar}>
      <View style={styles.ctrBtn}>
        <ToggleCameraBtn userID={userID} />
      </View>

      <View style={styles.ctrBtn}>
        <SwitchCameraBtn />
      </View>

      <View style={styles.ctrBtn}>
        <LeaveBtn roomID={roomID} />
      </View>

      <View style={styles.ctrBtn}>
        <ToggleMicrophoneBtn userID={userID} />
      </View>

      <View style={styles.ctrBtn}>
        <ChatBtn onChat={onChat} />
      </View>
    </View>
  );
}

export default memo(BottomBar);

const styles = StyleSheet.create({
  normalBar: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 30, //50,
    width: '100%',
    bottom: 0,
    height: 50,
    zIndex: 6, //2,
  },
  ctrBtn: {
    marginBottom: 20,
    marginRight: 32 / 2,
    marginLeft: 32 / 2,
  },
});
