import React, {useImperativeHandle, useRef} from 'react';
import {useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {
  AppButtonNormal,
  AppContainer,
  AppInputDate,
  AppInputText,
  AppSearchTextInput,
} from '../commons';
import {Sizes, useAppContext} from '../utils';
import {Input} from './Input';

export function Playground() {
  const {Styles} = useAppContext();
  const {control, handleSubmit} = useForm();
  const inputRef = useRef(null);

  console.log('null', '' && <Text>sdkjfhkdjshf</Text>);
  console.log('date', new Date() < new Date('2023/10/22'));
  console.log('date', typeof Date.parse('1999/13/300'));

  const _space = <View style={{height: Sizes.padding}} />;

  return (
    <AppContainer style={{paddingHorizontal: Sizes.padding * 2}}>
      {_space}
      <AppSearchTextInput control={control} name={'searchTerm'} />
      {null && 'null' && <Text>sdkjfhkdjshf</Text>}
      <AppInputDate control={control} name={'dob'} />
      {_space}

      <AppInputText control={control} name={'username'} />
      {_space}

      <AppButtonNormal
        label={'Submit'}
        containerStyle={Styles.solidButtonContainer}
        onPress={handleSubmit(data => console.log(data))}
      />
      {_space}

      <AppButtonNormal
        label={'Submit'}
        containerStyle={Styles.solidButtonContainer}
        onPress={() => inputRef.current.focus()}
      />
      {_space}

      <TextInput style={Styles.border} />
      {_space}

      <Input ref={inputRef} />
      {_space}
    </AppContainer>
  );
}
