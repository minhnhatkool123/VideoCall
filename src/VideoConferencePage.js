import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useDispatch /*useSelector*/} from 'react-redux';

import {StyleSheet, View, BackHandler} from 'react-native';

import TopBar from './TopBar';
import Body from './Body';
import BottomBar from './BottomBar';
import CallMemberList from './CallMemberList';
import ChatList from './ChatList';

import {resetCounterChat} from './redux/chatSlice';
import {useNavigation} from '@react-navigation/native';

import Sound from 'react-native-sound';
import useVideo from './hooks/videoHook';

export default function VideoConferencePage(props) {
  const {route} = props;
  const {params} = route;
  const {userID, userName, conferenceID} = params;

  const dispatch = useDispatch();
  const {connectSDK, grantPermissions, joinRoom, destroy} = useVideo(
    userID,
    userName,
    conferenceID,
  );
  /// xử lý ẩn hiện
  const [isMenubarVisible, setIsMenubarVisible] = useState(true);
  const [isTopMenubarVisible, setTopIsMenubarVisible] = useState(true);
  const [isCallMemberListVisible, setIsCallMemberListVisible] = useState(false);
  const [isChatListVisible, setIsChatListVisible] = useState(false);

  let hideCountdown = 5;
  let hideCountdownOnTopMenu = 5;

  const onFullPageTouch = () => {
    hideCountdown = 5;
    hideCountdownOnTopMenu = 5;

    if (isMenubarVisible) {
      setIsMenubarVisible(false);
      setIsCallMemberListVisible(false);
    } else {
      setIsMenubarVisible(true);
    }

    if (isTopMenubarVisible) {
      setTopIsMenubarVisible(false);
      setIsCallMemberListVisible(false);
    } else {
      setTopIsMenubarVisible(true);
    }
  };

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    });
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const onOpenCallMemberList = useCallback(() => {
    setIsCallMemberListVisible(preState => !preState);
    setIsChatListVisible(false);
  }, []);

  const onCloseCallMemberList = useCallback(() => {
    setIsCallMemberListVisible(false);
    setIsChatListVisible(false);
  }, []);

  const onOpenChatList = useCallback(() => {
    setIsChatListVisible(true);
  }, []);

  const onCloseChatList = useCallback(() => {
    setIsChatListVisible(false);
    dispatch(resetCounterChat());
  }, []);

  useInterval(() => {
    hideCountdown--;

    if (hideCountdown <= 0) {
      hideCountdown = 5;

      setIsMenubarVisible(false);
    }
  }, 1000);

  useInterval(() => {
    hideCountdownOnTopMenu--;

    if (hideCountdownOnTopMenu <= 0) {
      hideCountdownOnTopMenu = 5;

      setTopIsMenubarVisible(false);
    }
  }, 1000);
  /////// xử lý ẩn hiện

  const navigation = useNavigation();
  function handleBackButtonClick() {
    navigation.navigate('HomePage');
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  let sound1;
  useEffect(() => {
    sound1 = new Sound(
      require('./music/join_call_room.mp3'),
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
    return () => {
      if (sound1) sound1.release();
    };
  }, []);

  useEffect(() => {
    connectSDK().then(() => {
      grantPermissions(() => {
        joinRoom(conferenceID, userID, userName);
      });
    });
    return () => {
      destroy(conferenceID);
    };
  }, []);

  return (
    <View style={[styles.container, styles.fillParent]}>
      {isTopMenubarVisible ? (
        <TopBar roomID={conferenceID} onMemberList={onOpenCallMemberList} />
      ) : null}

      <View
        style={styles.fillParent}
        onTouchStart={onFullPageTouch}
        pointerEvents="auto">
        <Body
          userID={userID} //
          userName={userName} //
          style={styles.body}
          conferenceID={conferenceID}
        />
      </View>

      {isMenubarVisible ? (
        <BottomBar
          userID={userID}
          roomID={conferenceID}
          onChat={onOpenChatList}
        />
      ) : null}

      {isCallMemberListVisible ? (
        <CallMemberList
          onCloseCallMemberList={onCloseCallMemberList}
          userName={userName}
        />
      ) : null}

      {isChatListVisible ? (
        <ChatList
          onSetChatListVisible={onCloseChatList}
          userName={userName}
          userID={userID}
          conferenceID={conferenceID}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
    backgroundColor: '#2A2A2A',
  },
  fillParent: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  audioVideoView: {
    flex: 1,
    zIndex: 2,
    right: 0,
    top: 0,
  },
  body: {
    width: '100%',
    height: '100%',
    position: 'absolute',

    flex: 1,
    zIndex: 2,
    right: 0,
    top: 0,
  },
});
