import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Constants, useAppContext} from '../../utils';

import {AppViewLoading} from '../appViewLoading';
import {AppIcon} from '../appIcon';

import {styles} from './styles';

const _getResizeMode = resizeMode => {
  switch (resizeMode) {
    case 'contain':
      return FastImage.resizeMode.contain;
    default:
      return FastImage.resizeMode.cover;
  }
};

/**image source validation **/
const _isValidSource = source => {
  if (!source || !source?.uri) {
    return false;
  }
  // if (url.substring(0, 4) !== 'http') {
  //   return false;
  // }
  return source.uri.match(/\.(jpeg|jpg|gif|png|JPEG|JPG|PNG)$/) !== null;
};

export function AppImageRemote({
  resizeMode,
  imageStyle,
  imageContainerStyle,
  source,
  placeholder,
  spinnerColor,
  spinnerSize,
  isLoading,
  onSuccess,
  onError,
  ...imageProps
}) {
  const {Colors} = useAppContext();
  const [imageStatus, setImageStatus] = useState(() =>
    _isValidSource(source) || isLoading
      ? Constants.STATUS_LOADING
      : Constants.STATUS_ERROR,
  );

  useEffect(() => {
    if (isLoading) {
      setImageStatus(Constants.STATUS_LOADING);
    }
  }, [isLoading]);

  useEffect(() => {
    setImageStatus(
      _isValidSource(source)
        ? Constants.STATUS_LOADING
        : Constants.STATUS_ERROR,
    );
  }, [source]);

  if (imageStatus === Constants.STATUS_ERROR) {
    return (
      <View style={imageContainerStyle}>
        {placeholder ? (
          placeholder
        ) : (
          <AppIcon name={'alert-triangle'} size={24} />
        )}
      </View>
    );
  }

  return (
    <View style={imageContainerStyle}>
      <FastImage
        style={[styles.image, imageStyle]}
        source={source}
        resizeMode={_getResizeMode(resizeMode)}
        onLoad={() => {
          setImageStatus(Constants.STATUS_SUCCESSFUL);
          onSuccess && onSuccess();
        }}
        onError={() => {
          setImageStatus(Constants.STATUS_ERROR);
          onError && onError();
        }}
        {...imageProps}>
        {imageStatus === Constants.STATUS_LOADING && (
          <AppViewLoading
            spinnerSize={spinnerSize}
            spinnerColor={spinnerColor || Colors.onBackground}
            containerStyle={[
              {backgroundColor: Colors.withAlpha(Colors.background, '20%')},
              imageStyle,
            ]}
          />
        )}
      </FastImage>
    </View>
  );
}
