import React from 'react';
import {Pressable, Insets} from 'react-native';

import {PressableProps, StyleProp, ViewStyle} from 'react-native';
import {Sizes} from '../../utils';

type HitSlopType = Insets | number | undefined | null;
export interface AppTouchableProps
  extends Omit<PressableProps, 'style' | 'hitSlop'> {
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number;
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
  activeOpacity = 0.6,
  style,
  hitSlop,
  ...props
}: AppTouchableProps) {
  const _hitSlop =
    hitSlop && typeof hitSlop === 'boolean' ? _defaultHitSlop : hitSlop;

  return (
    <Pressable
      style={({pressed}) => [
        style,
        {
          opacity: pressed ? activeOpacity : 1,
        },
      ]}
      hitSlop={_hitSlop as HitSlopType}
      {...props}>
      {children}
    </Pressable>
  );
}
