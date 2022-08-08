import React from 'react';
import {Text} from 'react-native';
import {Sizes, useAppContext} from '../../utils';
import {AppTouchable} from '../appTouchable';

export function AppTextTouchable({children, style, touchStyle, onPress}) {
  const {Colors} = useAppContext();

  return (
    <AppTouchable
      activeBackgroundColor
      style={[
        {
          borderRadius: 2,
          padding: 2,
        },
        touchStyle,
      ]}
      onPress={onPress}>
      <Text style={[{color: Colors.text, fontSize: Sizes.button}, style]}>
        {children}
      </Text>
    </AppTouchable>
  );
}
