import React from 'react';
import {useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {AppContainer, AppSearchTextInput} from '../commons';
import {Sizes} from '../utils';

export function Playground() {
  const {control} = useForm();

  console.log('null', '' && <Text>sdkjfhkdjshf</Text>);

  return (
    <AppContainer style={{paddingHorizontal: Sizes.padding * 2}}>
      <AppSearchTextInput control={control} name={'searchTerm'} />
      {null && 'null' && <Text>sdkjfhkdjshf</Text>}
    </AppContainer>
  );
}
