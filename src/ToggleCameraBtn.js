import React, {useEffect, memo} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

import {startCamera} from './redux/cameraLocalSlice';
import {useSelector, useDispatch} from 'react-redux';

function ToggleCameraBtn(props) {
  const {userID} = props;

  const dispatch = useDispatch();
  const startCam = useSelector(state => state.cameraLocal.value);
  const startEngine = useSelector(state => state.joinRoomLocal.value);

  const getImageSourceByPath = () => {
    const pathOn = require('./resources/white_button_camera_on.png');
    const pathOff = require('./resources/white_button_camera_off.png');
    return startCam ? pathOn : pathOff;
  };

  function turnCameraDeviceOn(userID, on) {
    return new Promise((resolve, reject) => {
      if (userID) {
        ZegoExpressEngine.instance().enableCamera(on, 0);
        resolve();
      } else {
        reject();
      }
    });
  }

  const onButtonPress = () => {
    dispatch(startCamera(!startCam));
  };

  useEffect(() => {
    if (startEngine) {
      turnCameraDeviceOn(userID, startCam).then(() => {});
    }
  }, [startCam]);

  return (
    <TouchableOpacity style={{width: 48, height: 48}} onPress={onButtonPress}>
      <Image source={getImageSourceByPath()} style={styles.ImageCamera} />
    </TouchableOpacity>
  );
}

export default memo(ToggleCameraBtn);

const styles = StyleSheet.create({
  ImageCamera: {
    width: '100%',
    height: '100%',
  },
});
