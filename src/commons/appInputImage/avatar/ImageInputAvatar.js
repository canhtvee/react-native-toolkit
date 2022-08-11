import React, {useEffect, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {
  Constants,
  getResourceImage,
  Sizes,
  useAppContext,
} from '../../../utils';

import {AppTouchable} from '../../appTouchable';
import {AppViewLoading} from '../../appViewLoading';

import {ImageInputSource} from '../ImageInputSource';

export function ImageInputAvatar({
  imageContainerStyle,
  onChange,
  value,
  ...imageProps
}) {
  const {Styles, Colors} = useAppContext();
  const [imageResource, setImageResource] = useState(null);
  const imageSourceRef = useRef(null);

  console.log('imageResource', imageResource);
  console.log('value', value);

  useEffect(() => {
    if (imageResource?.status === Constants.STATUS_SUCCESSFUL) {
      onChange(imageResource.data);
      return;
    }
    if (imageResource?.status === Constants.STATUS_ERROR) {
      onChange();
    }
  }, [imageResource]);

  return (
    <View style={imageContainerStyle}>
      <AppTouchable
        onPress={() => imageSourceRef.current.openModal()}
        disabled={imageResource?.status === Constants.STATUS_LOADING}>
        <FastImage
          source={imageResource?.data}
          isLoading={imageResource?.status === Constants.STATUS_LOADING}
          onLoad={() =>
            setImageResource(prev => ({
              ...prev,
              status: Constants.STATUS_SUCCESSFUL,
            }))
          }
          onError={() =>
            setImageResource(prev => ({
              ...prev,
              status: Constants.STATUS_ERROR,
            }))
          }
          imageStyle={[
            Styles.circle(Sizes.width(20)),
            {borderWidth: Sizes.borderWidth, borderColor: Colors.border},
          ]}
          {...imageProps}>
          {imageResource?.status === Constants.STATUS_ERROR && (
            <Image source={getResourceImage('default_avatar')} />
          )}
        </FastImage>
      </AppTouchable>
      {imageResource === Constants.STATUS_LOADING && <AppViewLoading overlay />}
      <ImageInputSource
        setImageResource={setImageResource}
        ref={imageSourceRef}
      />
    </View>
  );
}
