import React from 'react';
import {Pressable} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

export function AppTouchable({
  children,
  activeOpacity,
  activeBackgroundColor,
  style,
  hitSlop,
  ...props
}) {
  const {Colors} = useAppContext();

  const _hitSlop = typeof hitSlop === 'boolean' ? Sizes.paddingLess : hitSlop;

  if (activeBackgroundColor) {
    let _style = style;
    if (Array.isArray(style)) {
      _style = style.reduce((prev, curr) => ({...prev, ...curr}));
    }
    return (
      <Pressable
        style={({pressed}) => [
          style,
          {
            backgroundColor: pressed
              ? typeof activeBackgroundColor === 'string'
                ? activeBackgroundColor
                : Colors.ripple
              : _style?.backgroundColor || Colors.background,
          },
        ]}
        hitSlop={_hitSlop}
        {...props}>
        {children}
      </Pressable>
    );
  }

  return (
    <Pressable
      style={({pressed}) => [
        style,
        {
          opacity: pressed
            ? typeof activeOpacity === 'number'
              ? activeOpacity
              : 0.6
            : 1,
        },
      ]}
      hitSlop={_hitSlop}
      {...props}>
      {children}
    </Pressable>
  );
}
