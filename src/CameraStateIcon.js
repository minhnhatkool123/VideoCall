import React, {useState, useEffect} from 'react';
import {Image, View} from 'react-native';

export default function CameraStateIcon(props) {
  const {userID, iconCameraOn, iconCameraOff} = props;
  const [isOn, setIsOn] = useState(true); // Default on

  const getImageSourceByPath = () => {
    const pathOn = iconCameraOn
      ? iconCameraOn
      : require('./resources/white_icon_video_camera_on.png');
    const pathOff = iconCameraOff
      ? iconCameraOff
      : require('./resources/white_icon_video_camera_off.png');
    return isOn ? pathOn : pathOff;
  };

  useEffect(() => {}, []);

  return (
    <View>
      <Image source={getImageSourceByPath()} />
    </View>
  );
}
