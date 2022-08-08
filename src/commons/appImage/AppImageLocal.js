import React from 'react';
import {Image} from 'react-native';
import {getResourceImage} from '../../utils';
import {styles} from './styles';

export function AppImageLocal({name, ...props}) {
  return (
    <Image source={getResourceImage(name)} style={styles.image} {...props} />
  );
}
