import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Constants, useAppContext} from '../../utils';

import {AppViewLoading} from '../appViewLoading';
import {AppIcon} from '../appIcon';

const getResizeMode = resizeMode => {
  switch (resizeMode) {
    case 'contain':
      return FastImage.resizeMode.contain;
    default:
      return FastImage.resizeMode.cover;
  }
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
}) {
  const {Colors} = useAppContext();
  const [imageStatus, setImageStatus] = useState(() =>
    isLoading || source ? Constants.status.LOADING : Constants.status.ERROR,
  );

  useEffect(() => {
    setImageStatus(source ? Constants.status.LOADING : Constants.status.ERROR);
  }, [source]);

  return (
    <FastImage
      style={[styles.image, imageStyle]}
      source={source}
      resizeMode={getResizeMode(resizeMode)}
      onLoadStart={() => {
        setImageStatus(Constants.status.LOADING);
        onLoadStart && onLoadStart();
      }}
      onLoad={() => {
        setImageStatus(Constants.status.SUCCESSFUL);
        onLoadSuccess && onLoadSuccess();
        console.log('onLoadSuccess');
      }}
      onError={() => {
        setImageStatus(Constants.status.ERROR);
        onLoadError && onLoadError();
        console.log('onLoadError');
      }}
      {...imageProps}>
      {imageStatus === Constants.status.LOADING && (
        <AppViewLoading
          spinnerSize={spinnerSize}
          spinnerColor={spinnerColor || Colors.onBackground}
          containerStyle={[
            styles.image,
            {
              backgroundColor: Colors.withAlpha(Colors.background, '20%'),
            },
            imageStyle,
            styles.loading,
          ]}
        />
      )}
      {imageStatus === Constants.status.ERROR &&
        (placeholder ? (
          placeholder
        ) : (
          <AppIcon name={'alert-triangle'} size={24} />
        ))}
    </FastImage>
  );
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  loading: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
});
