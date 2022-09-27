import React from 'react';
import {StyleProp, Text, TextProps, TextStyle, ViewStyle} from 'react-native';
import {CommonStyles, Sizes, useAppContext} from '@utils';
import {AppTouchable, AppTouchableProps} from '../appTouchable';

export interface AppTextProps
  extends TextProps,
    Pick<AppTouchableProps, 'activeBackgroundColor' | 'activeOpacity'> {
  textStyle?: StyleProp<TextStyle>;
  touchStyle?: StyleProp<ViewStyle>;
}

export function AppText({
  onPress,
  activeBackgroundColor = true,
  activeOpacity,
  children,
  style,
  touchStyle,
  ...props
}: AppTextProps) {
  const {Colors} = useAppContext();

  if (onPress) {
    return (
      <AppTouchable
        activeBackgroundColor={activeBackgroundColor}
        activeOpacity={activeOpacity}
        style={[CommonStyles.textButtonContainer, touchStyle]}
        onPress={onPress}>
        <Text style={[{fontSize: Sizes.regular, color: Colors.primary}, style]}>
          {children}
        </Text>
      </AppTouchable>
    );
  }

  return (
    <Text
      style={[{fontSize: Sizes.regular, color: Colors.text}, style]}
      {...props}>
      {children}
    </Text>
  );
}
