import React, {useState} from 'react';
import {View} from 'react-native';
import {useAppContext} from '../utils';
import {AppButtonNormal} from './appButton';
import {AppInputFieldArrayExample} from './appInputText';
import {AppText} from './appText';

export function LibsPlayground() {
  const {Colors} = useAppContext();
  const [state, setState] = useState(false);

  return (
    <View style={{flex: 1}}>
      <AppButtonNormal
        label={'button'}
        textLabelStyle={{color: Colors.onPrimary}}
        isLoading={state}
      />
      <AppButtonNormal
        label={'Toggle'}
        onPress={() => setState(prev => !prev)}
        textLabelStyle={{color: Colors.onPrimary}}
      />
    </View>
  );
}
