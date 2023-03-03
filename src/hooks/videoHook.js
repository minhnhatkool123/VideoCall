import {useDispatch /*useSelector*/} from 'react-redux';

import {hasSound, resetSound} from '../redux/audioLocalSlice';
import {resetCamera, resetFlipCamera} from '../redux/cameraLocalSlice';
import {resetMicrophone} from '../redux/micLocalSlice';
import {startJoinRoom, resetJoinRoom} from '../redux/joinRoomLocalSlice';
import {
  addUserRemote,
  resetVideoRemote,
  removeUserRemote,
  getLengthOfRemoteUser,
  resetLengthOfRemoteUser,
  changeCamera,
  changeSound,
  changeMic,
} from '../redux/videoRemoteSlice';
import {resetCallMemberListVisible} from '../redux/callMemberListSlice';

import {resetPin} from '../redux/pinSlice';
import {resetPinRemote} from '../redux/pinRemoteSlice';
import {
  addChat,
  resetChat,
  countChat,
  resetCounterChat,
} from '../redux/chatSlice';

import {PermissionsAndroid} from 'react-native';

import ZegoExpressEngine from 'zego-express-engine-reactnative';

import deepCopyFunction from '../helper/deepCopy';

import {GLOBAL} from '../global/index';

import Sound from 'react-native-sound';

let _coreUserMap = GLOBAL.coreUserMap; //{};
let _streamCoreUserMap = GLOBAL.streamCoreUserMap; //{};
export default function useVideo(userID, userName, conferenceID) {
  const dispatch = useDispatch();

  function getStreamIDByUserID(userID) {
    return conferenceID + '_' + userID + '_main';
  }

  function getNameByUserID(userID) {
    if (userID in _coreUserMap) {
      return _coreUserMap[userID].userName;
    }
    return 'Unknown';
  }

  function clearData() {
    _coreUserMap = {};
    _streamCoreUserMap = {};
  }

  function _createCoreUser(userID, userName, profileUrl, extendInfo) {
    return {
      userID: userID,
      userName: userName,
      profileUrl: profileUrl,
      extendInfo: extendInfo,
      viewID: -1,
      viewFillMode: 1,
      streamID: '',
      isMicDeviceOn: true,
      isCameraDeviceOn: true,
      publisherQuality: 0,
      soundLevel: 0,
      joinTime: 0,
    };
  }

  function _createPublicUser(coreUser) {
    return {
      userID: coreUser.userID,
      userName: coreUser.userName,
      extendInfo: coreUser.extendInfo,
      isMicrophoneOn: coreUser.isMicDeviceOn,
      isCameraOn: coreUser.isCameraDeviceOn,
      isMicrophoneOn: coreUser.isMicDeviceOn,
      soundLevel: coreUser.soundLevel,
    };
  }

  function _tryStopPlayStream(userID) {
    let force =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (userID in _coreUserMap) {
      const user = _coreUserMap[userID];

      if (force || (!user.isMicDeviceOn && !user.isCameraDeviceOn)) {
        ZegoExpressEngine.instance().stopPlayingStream(user.streamID);
      }
    }
  }

  function _onRoomStreamUpdate(roomID, updateType, streamList) {
    var users = [];
    if (updateType == 0) {
      streamList.forEach(stream => {
        const userID = stream.user.userID;
        const userName = stream.user.userName;
        const streamID = stream.streamID;

        if (userID in _coreUserMap) {
          _coreUserMap[userID].streamID = streamID;
          _streamCoreUserMap[streamID] = _coreUserMap[userID];

          users.push(_coreUserMap[userID]);
        } else {
          _streamCoreUserMap[streamID] = _createCoreUser(
            userID,
            userName,
            '',
            {},
          );
          _streamCoreUserMap[streamID].streamID = streamID;
          _coreUserMap[userID] = _streamCoreUserMap[streamID];

          users.push(_streamCoreUserMap[streamID]);
        }
      });

      const newArr = deepCopyFunction(Object.values(_coreUserMap));
      dispatch(addUserRemote(newArr));
      dispatch(getLengthOfRemoteUser(newArr.length));
    } else {
      streamList.forEach(stream => {
        const userID = stream.user.userID;
        const streamID = stream.streamID;

        if (userID in _coreUserMap) {
          _tryStopPlayStream(userID, true);

          _coreUserMap[userID].isCameraDeviceOn = false;
          _coreUserMap[userID].isMicDeviceOn = false;
          _coreUserMap[userID].streamID = '';

          users.push(_coreUserMap[userID]);
          delete _streamCoreUserMap[streamID];
        }
      });

      const newArr = deepCopyFunction(Object.values(_coreUserMap));
      dispatch(addUserRemote(newArr));
      dispatch(getLengthOfRemoteUser(newArr.length));
    }
  }

  function _onRoomUserUpdate(roomID, updateType, userList) {
    const userInfoList = [];

    if (updateType == 0) {
      userList.forEach(user => {
        if (!(user.userID in _coreUserMap)) {
          const coreUser = _createCoreUser(user.userID, user.userName);

          _coreUserMap[user.userID] = coreUser;
        }

        const streamID = getStreamIDByUserID(user.userID);

        if (streamID in _streamCoreUserMap) {
          _coreUserMap[user.userID].streamID = streamID;
        }

        _coreUserMap[user.userID].joinTime = Date.now();

        userInfoList.push(_createPublicUser(_coreUserMap[user.userID]));
      });

      const newArr = deepCopyFunction(Object.values(_coreUserMap));
      dispatch(addUserRemote(newArr));
      dispatch(getLengthOfRemoteUser(newArr.length));
    } else {
      userList.forEach(user => {
        if (user.userID in _coreUserMap) {
          const coreUser = _coreUserMap[user.userID];
          const userInfo = {
            userID: coreUser.userID,
            userName: coreUser.userName,
            profileUrl: coreUser.profileUrl,
            extendInfo: coreUser.extendInfo,
          };
          userInfoList.push(userInfo);

          _tryStopPlayStream(coreUser.userID, true);

          delete _coreUserMap[user.userID];
          dispatch(removeUserRemote(user.userID));
        }
      });
      const newArr = deepCopyFunction(Object.values(_coreUserMap));
      dispatch(addUserRemote(newArr));
      dispatch(getLengthOfRemoteUser(newArr.length));
    }
  }

  function _onRemoteCameraStateUpdate(userID, state, streamID) {
    if (userID in _coreUserMap) {
      const isOn = state == 0;

      _coreUserMap[userID].isCameraDeviceOn = isOn;
      _coreUserMap[userID].streamID = isOn ? streamID : '';

      dispatch(
        changeCamera({
          userID: _coreUserMap[userID].userID,
          isCameraDeviceOn: _coreUserMap[userID].isCameraDeviceOn,
          streamID: _coreUserMap[userID].streamID,
        }),
      );
    }
  }

  function _onRemoteMicStateUpdate(userID, state, streamID) {
    if (userID in _coreUserMap) {
      const isOn = state == 0;

      _coreUserMap[userID].isMicDeviceOn = isOn;

      dispatch(
        changeMic({
          userID: _coreUserMap[userID].userID,
          isMicDeviceOn: _coreUserMap[userID].isMicDeviceOn,
        }),
      );
    }
  }

  function _remoteSoundLevelUpdate(soundLevels) {
    Object.keys(soundLevels).forEach(streamID => {
      const userID = streamID ? streamID.split('_')[1] : streamID;

      if (userID in _coreUserMap) {
        if (_coreUserMap[userID].isMicDeviceOn) {
          const soundRemoteLv = _coreUserMap[userID].soundLevel;
          if (soundRemoteLv >= 5 && soundLevels[streamID] < 5) {
            _coreUserMap[userID].soundLevel = soundLevels[streamID];
            dispatch(
              changeSound({
                userID: _coreUserMap[userID].userID,
                soundLevel: _coreUserMap[userID].soundLevel,
              }),
            );
          }

          if (soundRemoteLv < 5 && soundLevels[streamID] >= 5) {
            _coreUserMap[userID].soundLevel = soundLevels[streamID];

            dispatch(
              changeSound({
                userID: _coreUserMap[userID].userID,
                soundLevel: _coreUserMap[userID].soundLevel,
              }),
            );
          }
        }
      }
    });
  }

  function _capturedSoundLevelUpdate(soundLevelCb) {
    dispatch(hasSound(soundLevelCb));
  }

  function _onInRoomMessageReceived(roomID, messageList) {
    messageList.forEach(function (message) {
      dispatch(countChat());
      dispatch(
        addChat({
          _id: message.messageID,
          text: message.message,
          createdAt: new Date(message.sendTime),
          user: {
            _id: message.fromUser.userID,
            name: getNameByUserID(message.fromUser.userID), //message.fromUser.userName,
          },
        }),
      );
    });
  }

  function registerEngineCallback() {
    ZegoExpressEngine.instance().on(
      'roomUserUpdate',
      (roomID, updateType, userList) => {
        _onRoomUserUpdate(roomID, updateType, userList);
      },
    );

    ZegoExpressEngine.instance().on(
      'roomStreamUpdate',
      (roomID, updateType, streamList) => {
        _onRoomStreamUpdate(roomID, updateType, streamList);
      },
    );

    ZegoExpressEngine.instance().on(
      'remoteCameraStateUpdate',
      (streamID, state) => {
        _onRemoteCameraStateUpdate(
          streamID ? streamID.split('_')[1] : streamID,
          state,
          streamID,
        );
      },
    );

    ZegoExpressEngine.instance().on(
      'remoteMicStateUpdate',
      (streamID, state) => {
        _onRemoteMicStateUpdate(
          streamID ? streamID.split('_')[1] : streamID,
          state,
          streamID,
        );
      },
    );

    ZegoExpressEngine.instance().on('remoteSoundLevelUpdate', soundLevels => {
      _remoteSoundLevelUpdate(soundLevels);
    });

    ZegoExpressEngine.instance().on(
      'capturedSoundLevelUpdate',
      soundLevelCb => {
        _capturedSoundLevelUpdate(soundLevelCb);
      },
    );

    ZegoExpressEngine.instance().on(
      'IMRecvBroadcastMessage',
      (roomID, messageList) => {
        _onInRoomMessageReceived(roomID, messageList);
      },
    );
  }

  function joinRoom(roomID, userID, userName, token) {
    return new Promise((resolve, reject) => {
      const userJoinRoom = {userID, userName};
      const config = {
        isUserStatusNotify: true,
      };

      ZegoExpressEngine.instance()
        .loginRoom(roomID, userJoinRoom, config)
        .then(() => {
          ZegoExpressEngine.instance().startSoundLevelMonitor();

          dispatch(startJoinRoom(true));

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  const grantPermissions = async callback => {
    if (Platform.OS === 'android') {
      let grantedAudio = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      let grantedCamera = PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const ungrantedPermissions = [];

      try {
        const isAudioGranted = await grantedAudio;
        const isVideoGranted = await grantedCamera;

        if (!isAudioGranted) {
          ungrantedPermissions.push(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          );
        }

        if (!isVideoGranted) {
          ungrantedPermissions.push(PermissionsAndroid.PERMISSIONS.CAMERA);
        }
      } catch (error) {
        ungrantedPermissions.push(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
      }

      return PermissionsAndroid.requestMultiple(ungrantedPermissions).then(
        data => {
          if (callback) {
            callback();
          }
        },
      );
    } else if (callback) {
      callback();
    }
  };

  function unregisterEngineCallback() {
    ZegoExpressEngine.instance().off('roomUserUpdate');
    ZegoExpressEngine.instance().off('roomStreamUpdate');
    ZegoExpressEngine.instance().off('publisherQualityUpdate');
    ZegoExpressEngine.instance().off('playerQualityUpdate');
    ZegoExpressEngine.instance().off('remoteCameraStateUpdate');
    ZegoExpressEngine.instance().off('remoteMicStateUpdate');
    ZegoExpressEngine.instance().off('playerStateUpdate');
    ZegoExpressEngine.instance().off('remoteSoundLevelUpdate');
    ZegoExpressEngine.instance().off('capturedSoundLevelUpdate');
    ZegoExpressEngine.instance().off('roomStateChanged');
    ZegoExpressEngine.instance().off('audioRouteChange');
    ZegoExpressEngine.instance().off('IMRecvBroadcastMessage');
  }

  function destroy(roomID) {
    {
      clearData();
      unregisterEngineCallback();

      dispatch(resetSound());
      dispatch(resetCamera());
      dispatch(resetFlipCamera());
      dispatch(resetMicrophone());
      dispatch(resetJoinRoom());
      dispatch(resetVideoRemote());
      dispatch(resetLengthOfRemoteUser());
      dispatch(resetCallMemberListVisible());

      dispatch(resetPin());
      dispatch(resetPinRemote());

      dispatch(resetChat());
      dispatch(resetCounterChat());

      ZegoExpressEngine.instance().muteMicrophone(false); // không tắt mic
      ZegoExpressEngine.instance().useFrontCamera(true, 0); //set lại dùng cam trước
      ZegoExpressEngine.instance()
        .logoutRoom(roomID)
        .then(() => {});

      let sound1 = new Sound(
        require('../music/leave_call_music.mp3'),
        (error, sound) => {
          if (error) {
            alert('error' + error.message);
            return;
          }
          sound1.play(() => {
            sound1.release();
          });
        },
      );
    }
  }

  function connectSDK() {
    return new Promise((resolve, reject) => {
      const engineProfile = {
        appID: 2049018062,
        appSign:
          '48fdb9f9257f81f15b89cd0b62864c610575479d4b7797fd5795e2545f8f048d',
        scenario: 0,
      };
      ZegoExpressEngine.createEngineWithProfile(engineProfile)
        .then(engine => {
          unregisterEngineCallback();

          registerEngineCallback();

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  return {
    connectSDK,
    grantPermissions,
    joinRoom,
    destroy,
  };
}
