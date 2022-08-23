import React from 'react';
import {Text, TextProps} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

export function AppText({
  children,
  style,
  ...props
}: Omit<TextProps, 'onPress'>) {
  const {Colors} = useAppContext();

  if (props.hasOwnProperty('onPress')) {
    if (__DEV__) {
      throw new Error(
        'AppText does not support touch event, use AppTextTouchable instead, it supports borderRadius and activeBackgroundColor props',
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
