import React, {useEffect, useState} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import FastImage, {
  ResizeMode,
  FastImageProps,
  ImageStyle,
  Source,
} from 'react-native-fast-image';

import {CommonStyles, Constants, Sizes, useAppContext} from '@utils';

import {AppLoading} from '../appView';
import {AppIcon} from '../appIcon';

export type AppAsyncImageSourceType = Source | number;

export interface AppAsyncImageProps
  extends Omit<FastImageProps, 'source' | 'onLoad' | 'onError' | 'style'> {
  source: AppAsyncImageSourceType;
  spinnerSize?: number;
  spinnerColor?: string;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  placeholder?: JSX.Element;
  isLoading?: boolean;
  imageStyle?: StyleProp<ImageStyle>;
  onLoadStart?: () => void;
  onLoadSuccess?: () => void;
  onLoadError?: () => void;
}

const _getResizeMode = (resizeMode?: ResizeMode) => {
  return resizeMode === 'contain'
    ? FastImage.resizeMode.contain
    : FastImage.resizeMode.cover;
};

export function AppAsyncImage({
  resizeMode,
  imageStyle,
  source,
  placeholder,
  spinnerColor,
  spinnerSize,
  isLoading,
  onLoadStart,
  onLoadSuccess,
  onLoadError,
  ...imageProps
}: AppAsyncImageProps) {
  const {Colors} = useAppContext();
  const [imageStatus, setImageStatus] = useState(() =>
    isLoading || source ? Constants.LOADING : Constants.ERROR,
  );

  useEffect(() => {
    setImageStatus(source ? Constants.LOADING : Constants.ERROR);
  }, [source]);

  const _imageStyle = StyleSheet.flatten(imageStyle);

  return (
    <FastImage
      style={[CommonStyles.center, _imageStyle]}
      source={source}
      resizeMode={_getResizeMode(resizeMode)}
      onLoadStart={() => {
        setImageStatus(Constants.LOADING);
        onLoadStart && onLoadStart();
      }}
      onLoad={() => {
        setImageStatus(Constants.SUCCESSFUL);
        onLoadSuccess && onLoadSuccess();
      }}
      onError={() => {
        setImageStatus(Constants.ERROR);
        onLoadError && onLoadError();
      }}
      {...imageProps}>
      {imageStatus === Constants.LOADING && (
        <AppLoading
          spinnerSize={spinnerSize}
          spinnerColor={spinnerColor || Colors.onBackground}
          containerStyle={[
            CommonStyles.center,
            {
              backgroundColor: Colors.withAlpha(Colors.background, '20%'),
              width: _imageStyle?.width,
              height: _imageStyle?.height,
            },
          ]}
        />
      )}
      {imageStatus === Constants.ERROR &&
        (placeholder ? (
          placeholder
        ) : (
          <AppIcon name={{feather: 'alert-triangle'}} size={Sizes.wpx(24)} />
        ))}
    </FastImage>
  );
}
