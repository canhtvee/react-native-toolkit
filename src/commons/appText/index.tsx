import React from 'react';
import {Text, TextProps} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

export function AppText({
  children,
  style,
  ...props
}: Omit<TextProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'>) {
  const {Colors} = useAppContext();

  if (
    props.hasOwnProperty('onPress') ||
    props.hasOwnProperty('onPressIn') ||
    props.hasOwnProperty('onPressOut') ||
    props.hasOwnProperty('onLongPress')
  ) {
    if (__DEV__) {
      throw new Error(
        'AppText does not support touch event, use AppButton instead, it support borderRadius and activeBackgroundColor props',
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
