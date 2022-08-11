import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
  loadingContainerStyle,
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
    isLoading || source ? Constants.STATUS_LOADING : Constants.STATUS_ERROR,
  );

  useEffect(() => {
    setImageStatus(source ? Constants.STATUS_LOADING : Constants.STATUS_ERROR);
  }, [source]);

  if (imageStatus === Constants.STATUS_ERROR) {
    return (
      <View style={[styles.image, imageStyle]}>
        {placeholder ? (
          placeholder
        ) : (
          <AppIcon name={'alert-triangle'} size={24} />
        )}
      </View>
    );
  }

  return (
    <FastImage
      style={[styles.image, imageStyle]}
      source={source}
      resizeMode={getResizeMode(resizeMode)}
      onLoadStart={() => {
        setImageStatus(Constants.STATUS_LOADING);
        onLoadStart && onLoadStart();
      }}
      onLoad={() => {
        setImageStatus(Constants.STATUS_SUCCESSFUL);
        onLoadSuccess && onLoadSuccess();
        console.log('onLoadSuccess');
      }}
      onError={() => {
        setImageStatus(Constants.STATUS_ERROR);
        onLoadError && onLoadError();
        console.log('onLoadError');
      }}
      {...imageProps}>
      {imageStatus === Constants.STATUS_LOADING && (
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
