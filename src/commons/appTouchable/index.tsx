import React from 'react';
import {
  Pressable,
  Insets,
  PressableProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

export interface AppTouchableProps
  extends Omit<PressableProps, 'style' | 'hitSlop'> {
  style?: StyleProp<ViewStyle>;
  activeOpacity?: number | boolean;
  activeBackgroundColor?: string | boolean;
  hitSlop?: Insets | number | boolean;
}

export function AppTouchable({
  children,
  activeOpacity,
  activeBackgroundColor,
  style,
  hitSlop,
  ...props
}: AppTouchableProps) {
  const {Colors} = useAppContext();

  const _hitSlop = typeof hitSlop === 'boolean' ? Sizes.paddinglx : hitSlop;

  if (activeBackgroundColor) {
    let _style = StyleSheet.flatten(style);
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
