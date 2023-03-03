import React, {memo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import ZegoExpressEngine from 'zego-express-engine-reactnative';
import {useNavigation} from '@react-navigation/native';
import {GLOBAL} from './global/index';
function LeaveBtn(props) {
  const {roomID, width = 48, height = 48} = props;
  const navigation = useNavigation();
  const onJoinConferencePress = () => {
    navigation.navigate('HomePage');
  };

  function leaveRoom() {
    return new Promise((resolve, reject) => {
      if (roomID == '') {
        resolve();
      } else {
        ZegoExpressEngine.instance()
          .logoutRoom(roomID)
          .then(() => {
            ZegoExpressEngine.instance().stopSoundLevelMonitor();

            GLOBAL.coreUserMap = {};
            GLOBAL.streamCoreUserMap = {};
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  const onPress = () => {
    leaveRoom();
    onJoinConferencePress();
  };

  return (
    <TouchableOpacity style={{width: width, height: height}} onPress={onPress}>
      <Image
        source={require('./resources/white_button_hang_up.png')}
        style={{width: '100%', height: '100%'}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

export default memo(LeaveBtn);
