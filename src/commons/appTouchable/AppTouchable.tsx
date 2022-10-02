import React from 'react';
import {
  Pressable,
  Insets,
  PressableProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import {Sizes, useAppContext} from '@utils';

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

  const _hitSlop = typeof hitSlop === 'boolean' ? Sizes.padding : hitSlop;

  const _style = StyleSheet.flatten(style);
  !_style?.backgroundColor && (_style.backgroundColor = Colors.background);

  if (activeBackgroundColor) {
    const _activeBackgroundColor =
      typeof activeBackgroundColor === 'string'
        ? activeBackgroundColor
        : Colors.ripple;

    return (
      <Pressable
        style={({pressed}) => [
          _style,
          {
            backgroundColor: pressed
              ? _activeBackgroundColor
              : _style.backgroundColor,
          },
        ]}
        hitSlop={_hitSlop}
        {...props}>
        {children}
      </Pressable>
    );
  }

  const _activeOpacity =
    typeof activeOpacity === 'number' ? activeOpacity : 0.4;

  return (
    <Pressable
      style={({pressed}) => [
        _style,
        {
          opacity: pressed ? _activeOpacity : 1,
        },
      ]}
      hitSlop={_hitSlop}
      {...props}>
      {children}
    </Pressable>
  );
}
