import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {getResourceImage} from '../../utils';

export function AppImageLocal({name, ...props}) {
  return (
    <Image source={getResourceImage(name)} style={styles.image} {...props} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
