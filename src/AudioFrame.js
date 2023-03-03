import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

export default function AudioFrame(props) {
  const {userName} = props;
  const [hasSound, setHasSound] = useState(false);

  const soundLv = useSelector(state => state.audioLocal.value);
  const showSoundWave = useSelector(state => state.micLocal.value);

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

  useEffect(() => {
    if (soundLv > 5) {
      setHasSound(true);
    } else {
      setHasSound(false);
    }
  }, [soundLv]);

  return (
    <View style={cstyle('#4A4B4D').container}>
      <ImageBackground
        src={null}
        resizeMode="cover"
        style={styles.imgBackground}>
        {showSoundWave && hasSound ? (
          <View style={waveStyle(164, '#515155').circleWave}>
            <View style={waveStyle(153, '#636266').subCircleWave}>
              <View style={waveStyle(141, '#6B6A71').subCircleWave}></View>
            </View>
          </View>
        ) : null}
        <View style={styles.avatar}>
          <Text style={styles.nameLabel}>{getShotName(userName)}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const cstyle = bgColor =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',

      backgroundColor: bgColor,
    },
  });

const waveStyle = (w, color) =>
  StyleSheet.create({
    circleWave: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      width: ((w / 375) * 100).toString() + '%',
      aspectRatio: 1,
      borderRadius: 1000,
      backgroundColor: color,
      zIndex: 0,
      justifyContent: 'center',
      alignContent: 'center',
    },
    subCircleWave: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'center',
      width: ((w / 164) * 100).toString() + '%',
      aspectRatio: 1,
      borderRadius: 1000,
      backgroundColor: color,
      zIndex: 0,
    },
  });

const styles = StyleSheet.create({
  imgBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  avatar: {
    flex: 1,
    width: ((129 / 375) * 100).toString() + '%',
    aspectRatio: 1,
    borderRadius: 1000,
    backgroundColor: '#DBDDE3',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  nameLabel: {
    flex: 1,
    position: 'absolute',
    color: '#222222',
    fontSize: 22,
  },
});
