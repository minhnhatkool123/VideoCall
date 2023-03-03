import React, {useEffect} from 'react';
import {BackHandler, Text, StyleSheet, View, Image} from 'react-native';

import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import {addChat} from './redux/chatSlice';
import ZegoExpressEngine from 'zego-express-engine-reactnative';

const getShotName = name => {
  if (!name) {
    return '';
  }

  const nl = name.split(' ');
  var shotName = '';
  nl.forEach(part => {
    if (part !== '') {
      shotName += part.substring(0, 1);
    }
  });
  return shotName;
};
// let number = 3;

export default function RoomMessageView(props) {
  const {userName, userID, onClose, conferenceID} = props;

  const dispatch = useDispatch();
  const messageList = useSelector(state => state.chat.chat);

  function handleBackButtonClick() {
    onClose();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('chatClose', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        //'hardwareBackPress',
        'chatClose',
        handleBackButtonClick,
      );
    };
  }, []);

  const onSend = (messages = []) => {
    messages.map(message => {
      ZegoExpressEngine.instance()
        .sendBroadcastMessage(conferenceID, message.text)
        .then(res => {
          const {errorCode, messageID} = res;
          if (errorCode > 0) {
            console.log('error');
          } else {
            const inRoomMessage = {
              text: message.text,
              _id: messageID,
              createdAt: message.createdAt,
              user: {
                _id: userID,
                name: userName,
              },
            };
            dispatch(addChat(inRoomMessage));
          }
        });
    });
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e645e',
            marginBottom: 5,
          },
          left: {
            marginBottom: 5,
            marginLeft: 20,
          },
        }}
        textStyle={{
          right: {
            color: '#ffffff',
          },
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <Image
            source={require('./resources/white_button_send_in_room_message_enable.png')}
            resizeMode="contain"
            style={{marginBottom: 8, marginRight: 10}}
          />
        </View>
      </Send>
    );
  };

  return (
    <GiftedChat
      messages={messageList}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name: userName,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      renderAvatar={props => {
        const currentMessage = props.currentMessage;
        const nameRemote = currentMessage?.user?.name;
        if (nameRemote) {
          return (
            <View style={styles.avatar}>
              <Text style={styles.nameLabelAvatar}>
                {getShotName(nameRemote)}
              </Text>
            </View>
          );
        }
        return null;
      }}
    />
  );
}
const styles = StyleSheet.create({
  containerMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: '#DBDDE3',
    borderRadius: 1000,
    marginRight: -11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  nameLabelAvatar: {
    flex: 1,
    textAlign: 'center',
    color: '#222222',
    fontSize: 16,
  },
  messageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(1, 7, 18, 0.3000)',
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
  },
  nameLabel: {
    color: '#8BE7FF',
    fontSize: 13, // marginLeft: 10
  },
  messageLabel: {
    color: 'white',
    fontSize: 13,
    marginLeft: 5,
  },
});
