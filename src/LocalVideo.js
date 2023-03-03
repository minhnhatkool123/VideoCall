import React, {useEffect, useRef, useState, memo} from 'react';
import {findNodeHandle, View, StyleSheet, Text} from 'react-native';
import ZegoExpressEngine, {
  ZegoTextureView,
} from 'zego-express-engine-reactnative';

import {useSelector} from 'react-redux';
import AudioFrame from './AudioFrame';
import AudioVideoForegroundView from './AudioVideoForegroundView';

function LocalVideo(props) {
  const {userID, conferenceID, userName} = props;

  const startCamera = useSelector(state => state.cameraLocal.value);
  const startJoinRoom = useSelector(state => state.joinRoomLocal.value);
  const lengthOfUser = useSelector(
    state => state.videoRemote.lengthOfRemoteUsers,
  );

  // xử lý pin
  const statePin = useSelector(state => state.pin.value);
  const statePinRemote = useSelector(state => state.pinRemote.value);

  const viewRef = useRef(null);

  const renderVideo = viewID => {
    ZegoExpressEngine.instance()
      .startPublishingStream(`${conferenceID}_${userID}_main`)
      .then(() => {
        if (viewID > 0) {
          ZegoExpressEngine.instance()
            .startPreview({
              reactTag: viewID,
              viewMode: 0,
              backgroundColor: 0,
            })
            .catch(error => console.error(error));
        }
      });
  };

  function turnCameraDeviceOn(userID, on) {
    return new Promise((resolve, reject) => {
      if (userID) {
        if (on) {
          ZegoExpressEngine.instance().enableCamera(on, 0);
          const viewID = findNodeHandle(viewRef.current);
          renderVideo(viewID);
        }

        resolve();
      } else {
        reject();
      }
    });
  }

  function styleLayoutLocalVideoContainer(lengthUserList) {
    if (statePin) {
      return {
        width: '100%',
        height: '50%',
        paddingLeft: 2.5,
        paddingRight: 2.5,
        paddingTop: 2.5,
        paddingBottom: 2.5,
      };
    } else if (statePinRemote) {
      if (lengthUserList === 1) {
        return {
          width: '100%',
          height: '50%',

          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      } else if (lengthUserList === 2) {
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
      if (lengthUserList === 0) {
        return {
          width: '100%',
          height: '100%',
          //backgroundColor: '#ffffff',
          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
        };
      } else if (lengthUserList === 1) {
        return {
          width: '100%',
          height: '50%',
          //backgroundColor: '#ffffff',
          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
          borderRadius: 10,
        };
      } else {
        return {
          width: '50%',
          height: '50%',
          //backgroundColor: '#ffffff',
          paddingLeft: 2.5,
          paddingRight: 2.5,
          paddingTop: 2.5,
          paddingBottom: 2.5,
          borderRadius: 10,
        };
      }
    }
  }

  useEffect(() => {
    if (startJoinRoom) {
      turnCameraDeviceOn(userID, startCamera).then(() => {});
    }
  }, [startCamera, startJoinRoom]);

  return (
    <View style={styleLayoutLocalVideoContainer(lengthOfUser)}>
      <AudioVideoForegroundView
        userInfo={{
          userID,
          userName,
        }}
      />
      {startCamera ? (
        <ZegoTextureView ref={viewRef} style={styles.container} />
      ) : (
        <AudioFrame userName={userName} />
      )}
    </View>
  );
}
export default memo(LocalVideo);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
