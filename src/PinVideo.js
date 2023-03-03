import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import deepCopyFunction from './helper/deepCopy';
import {useSelector, useDispatch} from 'react-redux';
import VideoFrame from './VideoFrame';
import AudioFrameRemote from './AudioFrameRemote';
import RemoteAudioVideoForegroundView from './RemoteAudioVideoForegroundView';

import {resetPinRemote} from './redux/pinRemoteSlice';

export default function PinVideo(props) {
  const {conferenceID} = props;
  const dispatch = useDispatch();

  const statePinRemote = useSelector(state => state.pinRemote.value);
  let userList = useSelector(state => state.videoRemote.remoteUsers);
  let newArr = deepCopyFunction(userList);
  newArr = newArr.filter(user => user.userID === statePinRemote);

  useEffect(() => {
    if (newArr.length <= 0) {
      dispatch(resetPinRemote());
    }
  }, [statePinRemote, newArr.length]);

  function conditionRender(stream, isCameraDeviceOn) {
    if (!stream || (stream && !isCameraDeviceOn)) {
      return false;
    }

    if (stream && isCameraDeviceOn) {
      return true;
    }
  }

  return newArr.length === 0
    ? null
    : newArr.map(function (user) {
        return (
          <View key={user.userID} style={styles.containerPin}>
            <RemoteAudioVideoForegroundView
              userName={user.userName}
              startMic={user.isMicDeviceOn}
              hasSound={user.soundLevel}
            />
            {conditionRender(user.streamID, user.isCameraDeviceOn) ? (
              <VideoFrame
                userID={user.userID}
                roomId={conferenceID}
                streamID={user.streamID}
                isCameraDeviceOn={user.isCameraDeviceOn}
              />
            ) : (
              <AudioFrameRemote
                userName={user.userName}
                soundLv={user.soundLevel}
                showSoundWave={user.isMicDeviceOn}
              />
            )}
          </View>
        );
      });
}

const styles = StyleSheet.create({
  ImageCamera: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    //padding: 180,
  },
  containerPin: {
    width: '100%',
    height: '50%',

    paddingLeft: 2.5,
    paddingRight: 2.5,
    paddingTop: 2.5,
    paddingBottom: 2.5,
  },
});
