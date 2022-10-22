import React from 'react';
import {
  StyleProp,
  Text,
  TextProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Sizes, useAppContext} from '@utils';
import {AppTouchable, AppTouchableProps} from '../appTouchable';

export interface AppTextProps
  extends TextProps,
    Pick<AppTouchableProps, 'activeBackgroundColor' | 'activeOpacity'> {
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppText({
  onPress,
  activeBackgroundColor,
  activeOpacity,
  containerStyle,
  children,
  style,
  ...props
}: AppTextProps) {
  const {Colors} = useAppContext();

  if (onPress) {
    return (
      <AppTouchable
        activeBackgroundColor={activeBackgroundColor || true}
        activeOpacity={activeOpacity}
        style={[containerStyle]}
        onPress={onPress}>
        <Text
          style={[{fontSize: Sizes.button, color: Colors.primary}, style]}
          {...props}>
          {children}
        </Text>
      </AppTouchable>
    );
  }

  const _textElement = (
    <Text
      style={[{fontSize: Sizes.regular, color: Colors.text}, style]}
      {...props}>
      {children}
    </Text>
  );

  if (containerStyle) {
    return <View style={containerStyle}>{_textElement}</View>;
  }

  return _textElement;
}
