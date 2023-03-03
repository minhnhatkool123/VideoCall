import React, {memo} from 'react';
import {Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';

function CloseChatListBtn(props) {
  const {onClose} = props;

  function onPressed() {
    onClose();
  }

  return (
    <TouchableWithoutFeedback onPress={onPressed}>
      <Image
        style={styles.downArrowIcon}
        source={require('./resources/white_button_back.png')}
      />
    </TouchableWithoutFeedback>
  );
}

export default memo(CloseChatListBtn);

const styles = StyleSheet.create({
  downArrowIcon: {
    marginLeft: 11.5,
    marginRight: 5,
  },
});
