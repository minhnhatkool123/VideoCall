import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import React from 'react';

function MaskViewDefault(props) {
  const {userName} = props;

  return (
    <View style={styleMask.defaultMaskContainer}>
      <View style={styleMask.defaultMaskNameLabelContainer}>
        <Text style={styleMask.defaultMaskNameLabel}>{userName}</Text>
      </View>
    </View>
  );
}

const styleMask = StyleSheet.create({
  mask: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  defaultMaskContainer: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  defaultMaskNameLabelContainer: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    opacity: 0.5,
    position: 'absolute',
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 3,
    paddingTop: 3,
    borderRadius: 6,
    bottom: 5,
    right: 5,
  },
  defaultMaskNameLabel: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default function MoreFrame(props) {
  const {userID} = props;

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

  return (
    <View style={cstyle('#4A4B4D').container}>
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={null}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar /*, styles.avatar1*/]}>
            <Text style={styles.nameLabel}>{getShotName(userID)}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styleMask.mask}>
        <MaskViewDefault userName={userID} />
      </View>
    </View>
  );
}

const cstyle = bgColor =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: bgColor,
      position: 'absolute',
    },
  });

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    zIndex: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avatar: {
    width: ((129 / 375) * 100).toString() + '%',
    aspectRatio: 1,
    borderRadius: 1000,
    backgroundColor: '#DBDDE3',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'relative',
  },
  avatar1: {
    left: ((10 / 60) * 100).toString() + '%',
  },
  avatar2: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4A4B4D',
    right: ((10 / 60) * 100).toString() + '%',
  },
  nameLabel: {
    color: '#222222',
    fontSize: 23,
  },
  totalText: {
    marginTop: 29.5,
    fontSize: 12,
    color: '#FFFFFF',
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
});
