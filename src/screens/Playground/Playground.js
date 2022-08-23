import React, {useRef, useState} from 'react';
import {Text, View, Animated} from 'react-native';
import {AppButtonNormal, AppContainer} from '../../commons';
import {Sizes, useAppContext} from '../../utils';
import {testFetchApi} from '../../utils/modules/Fetching/TestFlow';

const _space = <View style={{height: 20}} />;

export function Playground() {
  const {Styles} = useAppContext();

  const onPress = async () => {
    try {
      const result = await testFetchApi();
      console.log('onPress', result);
    } catch (error) {
      console.log('catch onPress failed', error);
    }
  };

  return (
    <AppContainer edges="lrtb">
      {_space}

      {_space}

      <AppButtonNormal
        label={'Run Animation'}
        containerStyle={[
          Styles.solidButtonContainer,
          {marginHorizontal: Sizes.padding * 2},
        ]}
        onPress={onPress}
      />
    </AppContainer>
  );
}
