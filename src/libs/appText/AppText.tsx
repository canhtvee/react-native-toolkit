import React from 'react';
import {Text, TextProps} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

export function AppText({
  children,
  style,
  ...props
}: Omit<TextProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'>) {
  const {Colors} = useAppContext();

  if (__DEV__) {
    if (
      props.hasOwnProperty('onPress') ||
      props.hasOwnProperty('onPressIn') ||
      props.hasOwnProperty('onPressOut') ||
      props.hasOwnProperty('onLongPress')
    ) {
      throw new Error(
        'AppText does not support touch event, use AppTextPressable instead',
      );
    }
    return null;
  }
  return (
    <Text
      style={[{color: Colors.text, fontSize: Sizes.regular}, style]}
      {...props}>
      {children}
    </Text>
  );
}
