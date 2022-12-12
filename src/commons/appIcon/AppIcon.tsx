import React from 'react';
import {View, StyleProp, TextStyle, ViewStyle} from 'react-native';

import {AppTouchable, AppTouchableProps} from '../appTouchable';
import {AppIconNames, AppIconNameType} from './AppIconNames';

import {VectorIcon, VectorIconProps} from './VectorIcon';

export interface AppIconProps
  extends Omit<VectorIconProps, 'style' | 'name'>,
    Pick<
      AppTouchableProps,
      | 'onPress'
      | 'disabled'
      | 'hitSlop'
      | 'activeOpacity'
      | 'activeBackgroundColor'
    > {
  name: AppIconNameType;
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
  name,
  ...iconProps
}: AppIconProps) {
  const _iconName = AppIconNames[name];

  const _iconElement = (
    <VectorIcon style={iconStyle} name={_iconName} {...iconProps} />
  );

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
