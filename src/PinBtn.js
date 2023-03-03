import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {setPin} from './redux/pinSlice';
import {resetPinRemote} from './redux/pinRemoteSlice';

function PinBtn(props) {
  const {} = props;

  const dispatch = useDispatch();
  const statePin = useSelector(state => state.pin.value);

  const getImageSourceByPath = () => {
    const pathOn = require('./resources/gray_icon_pin_23.png');
    const pathOff = require('./resources/gray_icon_unpin_23.png');
    return statePin ? pathOff : pathOn;
  };

  const onButtonPress = () => {
    dispatch(setPin(!statePin));
    dispatch(resetPinRemote());
  };

  return (
    <TouchableOpacity
      style={{width: 23, height: 22, marginLeft: 3}}
      onPress={onButtonPress}>
      <Image source={getImageSourceByPath()} style={styles.ImageCamera} />
    </TouchableOpacity>
  );
}

export default memo(PinBtn);

const styles = StyleSheet.create({
  ImageCamera: {},
});
