import React from 'react';
import {View, StyleProp, TextStyle, ViewStyle} from 'react-native';

import {AppTouchable, AppTouchableProps} from '../appTouchable';

import {VectorIcon, VectorIconProps} from './VectorIcon';

export interface AppIconProps
  extends Omit<VectorIconProps, 'style'>,
    Pick<
      AppTouchableProps,
      | 'onPress'
      | 'disabled'
      | 'hitSlop'
      | 'activeOpacity'
      | 'activeBackgroundColor'
    > {
  iconStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
}

export function AppIcon({
  iconStyle,
  iconContainerStyle,
  onPress,
  disabled,
  activeOpacity,
  activeBackgroundColor,
  hitSlop = true,
  ...iconProps
}: AppIconProps) {
  const _iconElement = <VectorIcon style={iconStyle} {...iconProps} />;

  if (onPress) {
    return (
      <AppTouchable
        disabled={disabled}
        hitSlop={hitSlop}
        style={iconContainerStyle}
        onPress={onPress}
        activeOpacity={activeOpacity}
        activeBackgroundColor={activeBackgroundColor}>
        {_iconElement}
      </AppTouchable>
    );
  }

  if (iconContainerStyle) {
    return <View style={iconContainerStyle}>{_iconElement}</View>;
  }

  return _iconElement;
}

// export const AppIconNames = {
//   'eye-off': {feather: 'eye-off'},
//   eye: {feather: 'eye'},
//   closecircle: {antDesign: 'closecircle'},
//   closecircleo: {antDesign: 'closecircleo'},
//   'arrow-down': {feather: 'chevron-down'},
//   'arrow-up': {feather: 'chevron-up'},
//   calendar: {feather: 'calendar'},
//   search: {antDesign: 'search1'},
//   'alert-triangle': {feather: 'alert-triangle'},
//   pluscircleo: {antDesign: 'pluscircleo'},
//   camera: {feather: 'camera'},
//   image: {feather: 'image'},
//   'edit-avatar': {feather: 'edit'},
// };
