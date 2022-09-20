import React from 'react';
import {Image} from 'react-native';

import {Images, Sizes} from '../../utils';
import {AppTouchable} from '../AppTouchable';

export function AppHeaderLeftLogo({onPress, imageStyle, containerStyle}) {
  const _logo = (
    <Image
      source={Images.appLogo}
      resizeMode={'contain'}
      style={[
        {
          padding: Sizes.padding,
          width: Sizes.width(96.8),
          height: Sizes.height(24),
          marginLeft: Sizes.width(14),
        },
        imageStyle,
      ]}
    />
  );

  return onPress ? (
    <AppTouchable
      onPress={onPress}
      hitSlop={Sizes.paddinglx}
      style={containerStyle}>
      {_logo}
    </AppTouchable>
  ) : (
    _logo
  );
}
