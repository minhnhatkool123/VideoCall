import React, {memo} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {resetCounterChat} from './redux/chatSlice';

function ChatBtn(props) {
  const {width = 48, height = 48, onChat} = props;
  const dispatch = useDispatch();
  const chatLength = useSelector(state => state.chat.counter);

  const onPress = () => {
    dispatch(resetCounterChat());
    onChat();
  };

  return (
    <TouchableOpacity
      style={{
        width: width,
        height: height,
        backgroundColor: 'rgba(43,47,62,0.8)',
        borderRadius: 64,
        // justifyContent: 'center',
        // alignItems: 'center',
      }}
      onPress={onPress}>
      {chatLength === 0 ? null : (
        <View
          style={{
            width: 25,
            height: 25,
            position: 'absolute',
            left: 30,
            top: -15,
            backgroundColor: '#e8543b',
            borderRadius: 64,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', color: '#ffffff'}}>
            {chatLength > 99 ? '+99' : chatLength}
          </Text>
        </View>
      )}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
          height: height,
        }}>
        <Image
          source={require('./resources/white_icon_chat.png')}
          style={{
            width: '70%',
            height: '70%',
            borderRadius: 64,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

export default memo(ChatBtn);
