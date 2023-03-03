import React, {memo} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

function MemberBtn(props) {
  const {
    //onPressed
    onMemberList,
  } = props;

  function onPressed() {
    onMemberList();
  }

  const getImageSourceByPath = () => {
    const img = require('./resources/white_button_members.png');
    return img;
  };

  return (
    <View>
      <TouchableOpacity onPress={onPressed}>
        <Image source={getImageSourceByPath()} />
      </TouchableOpacity>
    </View>
  );
}

export default memo(MemberBtn);
