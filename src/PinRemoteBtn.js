import React, {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {resetPin} from './redux/pinSlice';
import {setPinRemote, resetPinRemote} from './redux/pinRemoteSlice';

function PinRemoteBtn(props) {
  const {userIDPin} = props;

  const dispatch = useDispatch();
  const statePinRemote = useSelector(state => state.pinRemote.value);
  const statePin = useSelector(state => state.pin.value);

  const getImageSourceByPath = useCallback(() => {
    const pathOn = require('./resources/gray_icon_pin_23.png');
    const pathOff = require('./resources/gray_icon_unpin_23.png');

    if (userIDPin === statePinRemote) {
      if (!statePinRemote) {
        return pathOn;
      } else {
        return pathOff;
      }
    } else {
      return pathOn;
    }
  }, [statePinRemote]);

  const onButtonPress = () => {
    if (userIDPin === statePinRemote) {
      if (!statePinRemote) {
        dispatch(setPinRemote(userIDPin));
        if (statePin) dispatch(resetPin());
      } else {
        dispatch(resetPinRemote());
      }
    } else {
      dispatch(setPinRemote(userIDPin));
      if (statePin) dispatch(resetPin());
    }
  };

  return (
    <TouchableOpacity
      style={{width: 23, height: 22, marginLeft: 3}}
      onPress={onButtonPress}>
      <Image source={getImageSourceByPath()} style={styles.ImageCamera} />
    </TouchableOpacity>
  );
}

export default memo(PinRemoteBtn);

const styles = StyleSheet.create({
  ImageCamera: {},
});
