import React from 'react';
import {Text, TextProps} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

export function AppText({
  children,
  style,
  ...props
}: Omit<TextProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'>) {
  if (
    props.hasOwnProperty('onPress') ||
    props.hasOwnProperty('onPressIn') ||
    props.hasOwnProperty('onPressOut') ||
    props.hasOwnProperty('onLongPress')
  ) {
    throw new Error(
      'AppText dost not support touch event, use AppTextPressable instead',
    );
  }
  const {Colors} = useAppContext();
  return (
    <Text
      style={[{color: Colors.text, fontSize: Sizes.regular}, style]}
      {...props}>
      {children}
    </Text>
  );
}
