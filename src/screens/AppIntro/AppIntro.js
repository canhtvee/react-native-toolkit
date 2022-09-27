import React from 'react';
import {View} from 'react-native';

import {AppTextTouchable} from '@commons';

export function AppIntro() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <AppTextTouchable>AppIntro</AppTextTouchable>
    </View>
  );
}
