import React, {memo} from 'react';
import {Image, View} from 'react-native';

function CameraCallMemberStateIcon(props) {
  const {iconCameraOn} = props;

  const getImageSourceByPath = () => {
    const pathOn = require('./resources/gray_icon_video_camera_on.png');
    const pathOff = require('./resources/gray_icon_video_camera_off.png');
    return iconCameraOn ? pathOn : pathOff;
  };

  return (
    <View>
      <Image source={getImageSourceByPath()} />
    </View>
  );
}

export default memo(CameraCallMemberStateIcon);
