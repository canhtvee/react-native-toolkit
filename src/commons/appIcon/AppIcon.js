import React from 'react';
import {View} from 'react-native';

import {AppTouchable} from '../appTouchable';

import {VectorIcon} from './VectorIcon';

export function AppIcon({
  iconStyle,
  iconContainerStyle,
  onPress,
  activeOpacity,
  hitSlop = true,
  name,
  ...iconProps
}) {
  const _name = AppIconNames[name];

  if (onPress) {
    return (
      <AppTouchable
        hitSlop={hitSlop}
        style={iconContainerStyle}
        onPress={onPress}
        activeOpacity={activeOpacity}>
        <VectorIcon name={_name} style={iconStyle} {...iconProps} />
      </AppTouchable>
    );
  }

  if (iconContainerStyle) {
    return (
      <View style={iconContainerStyle}>
        <VectorIcon name={_name} style={iconStyle} {...iconProps} />
      </View>
    );
  }

  return <VectorIcon name={_name} style={iconStyle} {...iconProps} />;
}

/**
 *
 * To use AppIconNames interface to simplify icon refactoring
 */
export const AppIconNames = {
  'eye-off': {feather: 'eye-off'},
  eye: {feather: 'eye'},
  closecircle: {antDesign: 'closecircle'},
  closecircleo: {antDesign: 'closecircleo'},
  'arrow-down': {feather: 'chevron-down'},
  'arrow-up': {feather: 'chevron-up'},
  calendar: {feather: 'calendar'},
  search: {antDesign: 'search1'},
  'alert-triangle': {feather: 'alert-triangle'},
};
