import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';

import {Constants, useAppContext} from '../../../utils';

import {AppImageRemote} from '../../appImage';
import {AppTouchable} from '../../appTouchable';

import {ImageInputSource} from '../ImageInputSource';

export function ImageInputAvatar({
  imageContainerStyle,
  onChange,
  value,
  imageStyle,
  ...imageProps
}) {
  const {Colors, Styles} = useAppContext();
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
        <AppImageRemote
          source={imageResource?.data}
          placeholder={null}
          isLoading={imageResource?.status === Constants.STATUS_LOADING}
          onSuccess={() =>
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
          style={[Styles.border, imageStyle]}
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
