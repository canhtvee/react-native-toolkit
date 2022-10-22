import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';

import {Sizes, useAppContext} from '@utils';
import {AppTouchable} from '../appTouchable';
import {AppText} from '../appText';

export interface AppContentEmptyProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export function AppContentEmpty({
  onPress,
  title,
  titleStyle,
  containerStyle,
}: AppContentEmptyProps) {
  const {Strings} = useAppContext();

  const _text = (
    <AppText
      style={[
        {
          paddingHorizontal: Sizes.padding,
          textAlign: 'center',
        },
        titleStyle,
      ]}>
      {title || Strings.emptyContent}
    </AppText>
  );

  if (onPress) {
    return (
      <AppTouchable
        onPress={onPress}
        style={[
          {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: Sizes.wpx(60),
          },
          containerStyle,
        ]}>
        {_text}
      </AppTouchable>
    );
  }
  return (
    <View
      style={[
        {
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: Sizes.wpx(60),
        },
        containerStyle,
      ]}>
      {_text}
    </View>
  );
}
