import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, View, TextInput} from 'react-native';
import {
  AppButtonNormal,
  AppContainer,
  AppSearchTextInput,
  useAppBottomSheetModal,
} from '../../commons';
import {Sizes} from '../../utils';

export function AppIntro() {
  const {control} = useForm();
  const [searching, setSearching] = useState();
  const [isFocused, setIsFocused] = useState();

  return (
    <AppContainer
      style={{
        paddingHorizontal: Sizes.padding,
      }}>
      <Controller
        defaultValue={''}
        control={control}
        name={'searchTerm'}
        render={({field: {value, onChange, onBlur, ref}, fieldState}) => {
          console.log('fieldState', fieldState);
          return (
            <View>
              {fieldState.isDirty && fieldState.isTouched && <Text>FOcus</Text>}

              <TextInput
                ref={ref}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  borderRadius: 4,
                  paddingVertical: 10,
                  marginVertical: 10,
                }}
              />
            </View>
          );
        }}
      />
      <Controller
        control={control}
        name={'pass'}
        render={({field: {value, onChange, onBlur}}) => {
          console.log('isFocused', isFocused);
          return (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{
                borderColor: 'grey',
                borderWidth: 0.5,
                borderRadius: 4,
                paddingVertical: 10,
              }}
            />
          );
        }}
      />
    </AppContainer>
  );
}
