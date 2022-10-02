import React, {useState} from 'react';
import {AppButtonNormal} from '@commons';
import {View} from 'react-native';

export function PlaygroundBody() {
  const [state, setState] = useState();
  const onPress = () => {
    setState(prev => !prev);
  };

  return (
    <View>
      <AppButtonNormal
        title="Test onPress"
        primaryButton
        onPress={onPress}
        isLoading={state}
      />
    </View>
  );
}
