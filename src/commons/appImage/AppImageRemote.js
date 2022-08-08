import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {useAppContext} from '../../utils';

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
  style,
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
    _isValidSource(source) ? 'loading' : 'error',
  );

  useEffect(() => {
    setImageStatus(_isValidSource(source) ? 'loading' : 'error');
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
        <AppIcon name={'alert-triangle'} size={24} />
      )}
    </View>
  );
}
