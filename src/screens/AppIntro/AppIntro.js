import React from 'react';
import {View} from 'react-native';

import {useForm} from 'react-hook-form';
import {Playground} from '../Playground';

export function AppIntro() {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Playground />
    </View>
  );
}
