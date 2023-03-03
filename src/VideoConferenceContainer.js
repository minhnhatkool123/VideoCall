import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, PermissionsAndroid, Alert, Text} from 'react-native';

import BottomBar from './BottomBar';
import AudioVideoForegroundView from './AudioVideoForegroundView';

function VideoConferenceContainer() {
  const [isMenubarVisible, setIsMenubarVisible] = useState(true);
  const [isTopMenubarVisible, setTopIsMenubarVisible] = useState(true);
  const [isCallMemberListVisible, setIsCallMemberListVisible] = useState(false);

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

  function onOpenCallMemberList() {
    setIsCallMemberListVisible(true);
  }

  function onCloseCallMemberList() {
    setIsCallMemberListVisible(false);
  }

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

  return (
    <View style={[styles.container, styles.fillParent]}>
      {isTopMenubarVisible ? (
        <View>
          <Text>TopMenuBar</Text>
        </View>
      ) : (
        <View></View>
      )}
      <View
        style={styles.fillParent}
        onTouchStart={onFullPageTouch}
        pointerEvents="auto">
        <View style={[styles.audioVideoView, styles.fillParent]}>
          <Text>Thân</Text>
        </View>
        {isMenubarVisible ? (
          <BottomBar
            userID={'12345'}
            startEngine={false}
            onStartCamera={() => {}}
            onStartMic={() => {}}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
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
});

export default VideoConferenceContainer;
