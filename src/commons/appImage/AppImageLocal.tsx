import React from 'react';
import {Image, ImageProps} from 'react-native';
import {getResourceImage, ResourceImageNameType} from '../../utils';
import {styles} from './styles';

export interface AppImageLocalProps extends Omit<ImageProps, 'source'> {
  name: ResourceImageNameType;
}

export function AppImageLocal({name, ...props}: AppImageLocalProps) {
  return (
    <Image source={getResourceImage(name)} style={styles.image} {...props} />
  );
}
