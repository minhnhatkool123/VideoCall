import React, {useEffect, useState, memo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

import {startMicrophone} from './redux/micLocalSlice';
import {useSelector, useDispatch} from 'react-redux';

function ToggleMicrophoneBtn(props) {
  const {userID /*, startEngine*/} = props;

  const dispatch = useDispatch();

  const startMic = useSelector(state => state.micLocal.value);
  const startEngine = useSelector(state => state.joinRoomLocal.value);

  const getImageSourceByPath = () => {
    const pathOn = require('./resources/white_button_mic_on.png');
    const pathOff = require('./resources/white_button_mic_off.png');
    return /*isCurrentOn*/ startMic ? pathOn : pathOff;
  };

  function turnMicDeviceOn(userID, on) {
    return new Promise((resolve, reject) => {
      if (userID) {
        ZegoExpressEngine.instance().muteMicrophone(!on);

        resolve();
      } else {
        reject();
      }
    });
  }

  const onButtonPress = () => {
    dispatch(startMicrophone(!startMic));
  };

  useEffect(() => {
    if (startEngine) {
      turnMicDeviceOn(userID, startMic).then(() => {});
    }
  }, [startMic]);

  return (
    <TouchableOpacity style={{width: 48, height: 48}} onPress={onButtonPress}>
      <Image source={getImageSourceByPath()} style={styles.ImageCamera} />
    </TouchableOpacity>
  );
}

export default memo(ToggleMicrophoneBtn);

const styles = StyleSheet.create({
  ImageCamera: {
    width: '100%',
    height: '100%',
  },
});
