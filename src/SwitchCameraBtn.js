import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {flipCamera} from './redux/cameraLocalSlice';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

function SwitchCameraBtn(props) {
  const {} = props;
  const dispatch = useDispatch();
  const isFront = useSelector(state => state.cameraLocal.flipCamera);

  const getImageSourceByPath = () => {
    const img = require('./resources/white_button_flip_camera.png');
    return img;
  };

  const onButtonPress = () => {
    ZegoExpressEngine.instance().useFrontCamera(!isFront, 0);
    dispatch(flipCamera(!isFront));
  };

  return (
    <TouchableOpacity style={{width: 48, height: 48}} onPress={onButtonPress}>
      <Image
        source={getImageSourceByPath()}
        style={styles.ImageCamera}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export default SwitchCameraBtn;

const styles = StyleSheet.create({
  ImageCamera: {
    width: '100%',
    height: '100%',
  },
});
