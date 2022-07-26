import React from 'react';
import {Text, TextProps} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

export function AppText({children, style, onPress, ...props}: TextProps) {
  const {Colors} = useAppContext();
  return (
    <Text
      style={[{color: Colors.text, fontSize: Sizes.regular}, style]}
      onPress={onPress}
      {...props}>
      {children}
    </Text>
  );
}
