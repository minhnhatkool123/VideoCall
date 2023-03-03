import React, {useEffect, useState, useRef} from 'react';
import {Text, View, BackHandler} from 'react-native';

import Lottie from 'lottie-react-native';
import joining_animation from './Animations/join.json';
import {useNavigation} from '@react-navigation/native';

export default function Waiting(props) {
  const {route} = props;
  const {params} = route;
  const {userID, userName, conferenceID} = params;

  const navigation = useNavigation();

  const timerRef = useRef(null);

  function handleBackButtonClick() {
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

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.navigate('VideoConferencePage', {
        userID: userID,
        userName: userName,
        conferenceID: conferenceID,
      });
    }, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: '#2A2A2A',
      }}>
      <Lottie
        source={joining_animation}
        autoPlay
        loop
        style={{
          height: 150,
          width: 150,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          marginTop: 0,
          color: 'white',
        }}>
        Joining a room
      </Text>
    </View>
  );
}
