import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Sizes, useAppContext} from '../../utils';
import {AppButtonNormal} from './appButton';
import {AppIcon} from './appIcon';
import {AppInputFieldArrayExample} from './appInputText';
import {AppText} from './appText';

export function LibsPlayground() {
  const {Colors, Styles} = useAppContext();
  const [state, setState] = useState(false);

  return (
    <View style={{alignItems: 'center'}}>
      <AppButtonNormal
        label={<AppIcon name={'closecircleo'} />}
        isLoading={state}
        activeOpacity
        containerStyle={Styles.solidButtonContainer}
      />
      <AppButtonNormal
        label={'Toggle'}
        textLabelStyle={{color: Colors.text}}
        onPress={() => setState(prev => !prev)}
        containerStyle={Styles.textButtonContainer}
        activeBackgroundColor
      />
    </View>
  );
}
