import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';
import {View} from 'react-native';

import {
  Constants,
  getResourceImage,
  Sizes,
  useAppAccount,
  useAppContext,
} from '../../../utils';

import {AppAsyncImage} from '../../appImage';
import {AppTouchable} from '../../appTouchable';

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
        <AppAsyncImage
          source={imageResource?.data}
          placeholder={
            <Image
              source={getResourceImage('default_avatar')}
              resizeMode={'contain'}
              style={{flex: 1}}
            />
          }
          isLoading={imageResource?.status === Constants.STATUS_LOADING}
          onLoadSuccess={() =>
            setImageResource(prev => ({
              ...prev,
              status: Constants.STATUS_SUCCESSFUL,
            }))
          }
          onLoadError={() =>
            setImageResource(prev => ({
              ...prev,
              status: Constants.STATUS_ERROR,
            }))
          }
          imageStyle={[
            Styles.circle(Sizes.width(20)),
            {borderWidth: Sizes.borderWidth, borderColor: Colors.border},
          ]}
          {...imageProps}
        />
      </AppTouchable>

      <ImageInputSource
        setImageResource={setImageResource}
        ref={imageSourceRef}
      />
    </View>
  );
}
