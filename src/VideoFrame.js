import React, {useEffect, useRef, useState, memo} from 'react';
import {findNodeHandle, View, StyleSheet, Text} from 'react-native';
import ZegoExpressEngine, {
  ZegoTextureView,
} from 'zego-express-engine-reactnative';

function VideoFrame(props) {
  const {userID, roomID, streamID, isCameraDeviceOn} = props;

  const viewRefRemote = useRef(null);

  function _tryStartPlayStream(viewID, streamID) {
    if (streamID !== '') {
      if (viewID > 0) {
        ZegoExpressEngine.instance().startPlayingStream(streamID, {
          reactTag: viewID,
          viewMode: 0, //1,
          backgroundColor: 0,
        });
      } else {
        ZegoExpressEngine.instance().startPlayingStream(streamID);
      }
    }
  }

  const updateRenderingProperty = () => {
    const viewID = findNodeHandle(viewRefRemote.current);

    _tryStartPlayStream(viewID, streamID);
  };

  useEffect(() => {
    updateRenderingProperty();
  }, [streamID, isCameraDeviceOn]);

  return (
    <ZegoTextureView
      ref={viewRefRemote}
      style={styles.container}
      resizeMode="contain"
    />
  );
}

//test
//export default VideoFrame;
export default memo(VideoFrame);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
