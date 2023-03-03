import React from 'react';
import {Image, View} from 'react-native';

export default function RemoteMicrophoneStateIcon(props) {
  const {startMic, hasSound} = props;

  const getImageSourceByPath = () => {
    const pathOn = require('./resources/white_icon_video_mic_on.png');
    const pathOff = require('./resources/white_icon_video_mic_off.png');
    const pathSpeaking = require('./resources/white_icon_video_mic_speaking.png');

    if (startMic) {
      if (hasSound > 5) {
        return pathSpeaking;
      }
      return pathOn;
    } else {
      return pathOff;
    }
  };

  return (
    <View>
      <Image style={{width: 20, height: 20}} source={getImageSourceByPath()} />
    </View>
  );
}
