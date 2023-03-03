import React from 'react';
import {View, StyleSheet} from 'react-native';

import {useSelector} from 'react-redux';
import VideoFrame from './VideoFrame';
import AudioFrameRemote from './AudioFrameRemote';
import RemoteAudioVideoForegroundView from './RemoteAudioVideoForegroundView';

export default function RemoteVideo(props) {
  const {conferenceID} = props;

  let userList = useSelector(state => state.videoRemote.remoteUsers);
  // xử lý pin
  const statePin = useSelector(state => state.pin.value);
  const statePinRemote = useSelector(state => state.pinRemote.value);
  if (statePinRemote) {
    userList = userList.filter(user => user.userID !== statePinRemote);
  }

  function styleLayoutRemoteVideoContainer(userList) {
    if (statePin) {
      if (userList.length === 1) {
        return {
          width: '100%',
          height: '50%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      } else if (userList.length === 2) {
        return {
          width: '50%',
          height: '50%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      } else {
        return {
          width: '50%',
          height: '25%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      }
    } else if (statePinRemote) {
      if (userList.length === 1) {
        return {
          width: '50%',
          height: '50%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      } else {
        return {
          width: '50%',
          height: '25%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      }
    } else {
      if (userList.length === 1) {
        return {
          width: '100%',
          height: '50%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      } else {
        return {
          width: '50%',
          height: '50%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      }
    }
  }

  function conditionRender(stream, isCameraDeviceOn) {
    if (!stream || (stream && !isCameraDeviceOn)) {
      return false;
    }

    if (stream && isCameraDeviceOn) {
      return true;
    }
  }

  return userList.length === 0
    ? null
    : userList.slice(0, 4).map(function (user) {
        return (
          <View
            key={user.userID}
            style={[styleLayoutRemoteVideoContainer(userList)]}>
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
  },
});
