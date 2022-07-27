import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage, {
  FastImageProps,
  Priority,
  ResizeMode,
} from 'react-native-fast-image';

import {ResourceStatusType, useAppContext} from '../../utils';

import {AppViewLoading} from '../appViewLoading';
import {AppIcon} from '../appIcon';

import {styles} from './styles';

export type AppImageRemoteSourceType = {
  uri?: string;
  headers?: {
    [key: string]: string;
  };
  priority?: Priority;
  cache?: 'immutable' | 'web' | 'cacheOnly';
};

export interface AppImageRemoteProps
  extends Omit<FastImageProps, 'source' | 'onLoad' | 'onError'> {
  source: AppImageRemoteSourceType;
  spinnerSize?: number;
  spinnerColor?: string;
  placeholder?: JSX.Element;
  isLoading?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
}

const _getResizeMode = (resizeMode?: ResizeMode) => {
  switch (resizeMode) {
    case 'contain':
      return FastImage.resizeMode.contain;
    default:
      return FastImage.resizeMode.cover;
  }
};
/**image url **/
const _isValidUrl = (url: string) => {
  if (!url) {
    return false;
  }
  // if (url.substring(0, 4) !== 'http') {
  //   return false;
  // }
  return url.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|PNG)$/) !== null;
};

export function AppImageRemote({
  resizeMode,
  style,
  source,
  placeholder,
  spinnerColor,
  spinnerSize,
  isLoading,
  onSuccess,
  onError,
  ...imageProps
}: AppImageRemoteProps) {
  const {Colors} = useAppContext();
  const [imageStatus, setImageStatus] = useState<ResourceStatusType>(() =>
    source && source.uri && _isValidUrl(source.uri) ? 'loading' : 'error',
  );

  useEffect(() => {
    setImageStatus(
      source && source.uri && _isValidUrl(source.uri) ? 'loading' : 'error',
    );
  }, [source]);

  if (imageStatus === 'loading' || imageStatus === 'successful' || isLoading) {
    return (
      <FastImage
        style={[styles.image, style]}
        source={source}
        resizeMode={_getResizeMode(resizeMode)}
        onLoad={() => {
          setImageStatus('successful');
          onSuccess && onSuccess();
        }}
        onError={() => {
          setImageStatus('error');
          onError && onError();
        }}
        {...imageProps}>
        {(imageStatus === 'loading' || isLoading) && (
          <AppViewLoading
            spinnerSize={spinnerSize}
            spinnerColor={spinnerColor}
            containerStyle={[{backgroundColor: Colors.hover}, style]}
          />
        )}
      </FastImage>
    );
  }
  return (
    <View style={[styles.image, style]}>
      {placeholder ? (
        placeholder
      ) : (
        <AppIcon name={{feather: 'alert-triangle'}} size={24} />
      )}
    </View>
  );
}
