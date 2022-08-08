import React from 'react';
import {View} from 'react-native';

import {AppTouchable} from '../appTouchable';

import {VectorIcon} from './VectorIcon';
import {AppIconNames} from './AppIconNames';

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
