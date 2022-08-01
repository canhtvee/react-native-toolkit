import React from 'react';
import {Omit, StyleProp, TextStyle, View, ViewStyle} from 'react-native';

import {AppTouchable, AppTouchableProps} from '../appTouchable';
import {VectorIcon, VectorIconNameType, VectorIconProps} from './VectorIcon';
import {AppIconNames} from './AppIconNames';

type AppIconNameType = keyof typeof AppIconNames;
export interface AppIconProps
  extends Omit<VectorIconProps, 'style' | 'name'>,
    Omit<AppTouchableProps, 'style'> {
  iconStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  name: AppIconNameType;
}

export function AppIcon({
  iconStyle,
  iconContainerStyle,
  onPress,
  activeOpacity,
  hitSlop = true,
  name,
  ...iconProps
}: AppIconProps) {
  const _name = AppIconNames[name] as VectorIconNameType;

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
