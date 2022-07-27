import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Sizes, useAppContext} from '../utils';
import {AppButtonNormal} from './appButton';
import {AppInputFieldArrayExample} from './appInputText';
import {AppText, AppTextPressable} from './appText';

export function LibsPlayground() {
  const {Colors} = useAppContext();
  const [state, setState] = useState(false);

  return (
    <View style={{alignItems: 'center'}}>
      <AppButtonNormal label={'button'} isLoading={state} />
      <AppButtonNormal
        label={'Toggle'}
        onPress={() => setState(prev => !prev)}
      />
      <AppTextPressable onPress={() => {}}>
        kjsdkdshkjfhdskjfdsk
      </AppTextPressable>
    </View>
  );
}
