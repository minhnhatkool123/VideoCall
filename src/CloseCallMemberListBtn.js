import React, {memo} from 'react';
import {Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';

function CloseCallMemberListBtn(props) {
  const {onMemberList} = props;

  function onPressed() {
    onMemberList();
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

export default memo(CloseCallMemberListBtn);

const styles = StyleSheet.create({
  downArrowIcon: {
    marginLeft: 11.5,
    marginRight: 5,
  },
});
