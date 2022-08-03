import React from 'react';
import {Pressable, Insets} from 'react-native';

import {PressableProps, StyleProp, ViewStyle} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

type HitSlopType = Insets | number | undefined | null;
export interface AppTouchableProps
  extends Omit<PressableProps, 'style' | 'hitSlop'> {
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number | boolean;
  activeBackgroundColor?: string | boolean;
  hitSlop?: Insets | number | boolean;
}

const _defaultHitSlop = {
  top: Sizes.padding,
  left: Sizes.padding,
  right: Sizes.padding,
  bottom: Sizes.padding,
};

export function AppTouchable({
  children,
  activeOpacity,
  activeBackgroundColor,
  style,
  hitSlop,
  ...props
}: AppTouchableProps) {
  const {Colors} = useAppContext();

  const _hitSlop =
    hitSlop && typeof hitSlop === 'boolean' ? _defaultHitSlop : hitSlop;

  if (activeBackgroundColor) {
    return (
      <Pressable
        style={({pressed}) => [
          style,
          {
            backgroundColor: pressed
              ? typeof activeBackgroundColor === 'string'
                ? activeBackgroundColor
                : Colors.ripple
              : (style as ViewStyle)?.backgroundColor || Colors.background,
          },
        ]}
        hitSlop={_hitSlop as HitSlopType}
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
      hitSlop={_hitSlop as HitSlopType}
      {...props}>
      {children}
    </Pressable>
  );
}
