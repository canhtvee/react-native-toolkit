import React from 'react';
import {View} from 'react-native';
import {AppButtonNormal} from './appButton';
import {AppText} from './appText';

export function LibsPlayground() {
  return (
    <View style={{flex: 1}}>
      <AppText>kdhkfdhskjfhjkdsf</AppText>
      <AppButtonNormal
        label={'button'}
        containerStyle={{backgroundColor: 'blue'}}
      />
    </View>
  );
}
