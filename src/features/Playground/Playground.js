import React from 'react';
import {View} from 'react-native';

import {AppContainer, AppVersion} from '../../commons';
import {Sizes} from '@utils';

import {PlaygroundHeader} from './PlaygroundHeader';
import {PlaygroundBody} from './PlaygroundBody';

export function Playground({navigation}) {
  return (
    <AppContainer>
      <View style={{flex: 1, paddingHorizontal: Sizes.padding}}>
        <PlaygroundHeader />
        <PlaygroundBody />
      </View>
      <AppVersion />
    </AppContainer>
  );
}
