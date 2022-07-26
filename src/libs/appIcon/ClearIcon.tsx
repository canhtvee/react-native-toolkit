import React from 'react';
import {Sizes, useAppContext} from '../../utils';
import {AppIcon, AppIconProps} from './AppIcon';

export function ClearIcon({
  onPress,
  iconStyle,
  size,
}: Omit<AppIconProps, 'name' | 'color'>) {
  const {Colors} = useAppContext();
  return (
    <AppIcon
      name={{antDesign: 'closecircle'}}
      size={size || Sizes.regular}
      iconStyle={[{color: Colors.placeholder}, iconStyle]}
      touchStyle={{
        marginRight: Sizes.paddingLess1,
      }}
      hitSlop
      onPress={onPress}
    />
  );
}
