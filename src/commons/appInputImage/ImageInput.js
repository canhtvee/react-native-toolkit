import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';

import {CONSTANTS, Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';
import {AppImageRemote} from '../appImage';

import {ImageInputSource} from './ImageInputSource';

export function ImageInput({
  inputContainerStyle,
  placeholder,
  showClearIcon = true,
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
    if (imageResource?.status === CONSTANTS.STATUS.SUCCESSFUL) {
      onChange(imageResource.data);
      return;
    }
    if (imageResource?.status === CONSTANTS.STATUS.ERROR) {
      onChange();
    }
  }, [imageResource]);

  return (
    <View style={inputContainerStyle}>
      <AppTouchable
        onPress={() => imageSourceRef.current.openModal()}
        disabled={imageResource?.status === CONSTANTS.STATUS.LOADING}>
        <AppImageRemote
          source={imageResource?.data}
          placeholder={
            placeholder || (
              <AppIcon
                name={'pluscircleo'}
                size={Sizes.h6}
                color={Colors.border}
              />
            )
          }
          isLoading={imageResource?.status === CONSTANTS.STATUS.LOADING}
          onSuccess={() =>
            setImageResource(prev => ({
              ...prev,
              status: CONSTANTS.STATUS.SUCCESSFUL,
            }))
          }
          onError={() =>
            setImageResource(prev => ({
              ...prev,
              status: CONSTANTS.STATUS.ERROR,
            }))
          }
          style={[
            Styles.border,
            {width: Sizes.width(25), height: Sizes.width(25)},
            imageStyle,
          ]}
          {...imageProps}
        />
      </AppTouchable>
      {!!value && imageResource?.data && showClearIcon && (
        <AppIcon
          name={'closecircle'}
          size={Sizes.subtitle}
          touchStyle={[
            Styles.shadow,
            {
              position: 'absolute',
              backgroundColor: Colors.surface,
              borderRadius: Sizes.padding,
              bottom: -Sizes.paddingLess1,
              right: -Sizes.paddingLess1,
              shadowColor: Colors.surface,
            },
          ]}
          hitSlop
          onPress={() => setImageResource({})}
        />
      )}
      <ImageInputSource ref={imageSourceRef} />
    </View>
  );
}
