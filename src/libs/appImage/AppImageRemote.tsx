import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import FastImage, {
  FastImageProps,
  Priority,
  ResizeMode,
} from 'react-native-fast-image';

import {addAlpha, ResourceStatusType, useAppContext} from '../../utils';

import {AppViewLoading} from '../appViewLoading';
import {AppIcon} from '../appIcon';

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

const getResizeMode = (resizeMode?: ResizeMode) => {
  switch (resizeMode) {
    case 'contain':
      return FastImage.resizeMode.contain;
    default:
      return FastImage.resizeMode.cover;
  }
};
/**image url **/
const isValidUrl = (url: string) => {
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
    source && source.uri && isValidUrl(source.uri) ? 'loading' : 'error',
  );

  useEffect(() => {
    setImageStatus(
      source && source.uri && isValidUrl(source.uri) ? 'loading' : 'error',
    );
  }, [source]);

  if (imageStatus === 'loading' || imageStatus === 'successful' || isLoading) {
    return (
      <FastImage
        style={[
          {
            width: 86,
            height: 86,
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
        source={source}
        resizeMode={getResizeMode(resizeMode)}
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
            containerStyle={[
              {backgroundColor: addAlpha(Colors.surface, 0.54)},
              style,
            ]}
          />
        )}
      </FastImage>
    );
  }
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          width: 86,
          height: 86,
        },
        style,
      ]}>
      {placeholder ? (
        placeholder
      ) : (
        <AppIcon name={{feather: 'alert-triangle'}} size={24} />
      )}
    </View>
  );
}
