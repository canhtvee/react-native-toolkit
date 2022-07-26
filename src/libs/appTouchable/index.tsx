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

export function AppTouchable({
  children,
  activeOpacity = 0.6,
  style,
  hitSlop,
  ...props
}: AppTouchableProps) {
  const hitSlopRendering =
    hitSlop && typeof hitSlop === 'boolean'
      ? {
          top: Sizes.padding,
          left: Sizes.padding,
          right: Sizes.padding,
          bottom: Sizes.padding,
        }
      : hitSlop;

  return (
    <Pressable
      style={({pressed}) => [
        style,
        {
          opacity: pressed ? activeOpacity : 1,
        },
      ]}
      hitSlop={hitSlopRendering as HitSlopType}
      {...props}>
      {children}
    </Pressable>
  );
}
