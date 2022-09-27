import React from 'react';
import {View} from 'react-native';

import {AppContainer} from '@commons';

import {PlaygroundBody, PlaygroundHeader} from './items';

export function Playground({navigation}) {
  return (
    <AppContainer>
      <View style={{flex: 1}}>
        <PlaygroundHeader />
        <PlaygroundBody />
      </View>
    </AppContainer>
  );
}
