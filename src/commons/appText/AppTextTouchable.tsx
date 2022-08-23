import React from 'react';
import {StyleProp, Text, TextProps, ViewStyle, TextStyle} from 'react-native';
import {AppTouchable, AppTouchableProps} from '../appTouchable';

export interface AppTextTouchableProps
  extends Pick<TextProps, 'children' | 'onPress'>,
    Pick<AppTouchableProps, 'activeBackgroundColor'> {
  textStyle?: StyleProp<TextStyle>;
  touchStyle?: StyleProp<ViewStyle>;
}

export function AppTextTouchable({
  children,
  textStyle,
  touchStyle,
  onPress,
  activeBackgroundColor,
}: AppTextTouchableProps) {
  return (
    <AppTouchable
      activeBackgroundColor={activeBackgroundColor}
      style={[
        {
          borderRadius: 2,
          padding: 2,
        },
        touchStyle,
      ]}
      onPress={onPress}>
      <Text style={textStyle}>{children}</Text>
    </AppTouchable>
  );
}
