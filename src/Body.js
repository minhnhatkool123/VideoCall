import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import LocalVideo from './LocalVideo';
import RemoteVideo from './RemoteVideo';

import PinVideo from './PinVideo';

function Body(props) {
  const {userID, userName, conferenceID} = props;

  const statePin = useSelector(state => state.pin.value);
  const statePinRemote = useSelector(state => state.pinRemote.value);

  return (
    <View style={styles.container}>
      {!statePin && statePinRemote ? (
        <PinVideo conferenceID={conferenceID} />
      ) : null}
      <LocalVideo
        userID={userID}
        userName={userName}
        conferenceID={conferenceID}
      />
      <RemoteVideo conferenceID={conferenceID} />
    </View>
  );
}

export default memo(Body);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    //backgroundColor: '#e6bb3f',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pinContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: '#ffffff',
  },
});
