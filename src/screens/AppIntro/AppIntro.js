import React, {useRef, useState} from 'react';
import {Text, View, TextInput, ActivityIndicator} from 'react-native';
import {AppSearchTextInput, AppViewLoading} from '../../commons';
import {TextInputWithEffect} from '../../commons/appSearch/TextInputWithEffect';
import {Sizes} from '../../utils';
import {useForm} from 'react-hook-form';

export function AppIntro() {
  const {control, watch} = useForm({defaultValues: {searchTerm: ''}});

  console.log('searchTerm', watch('searchTerm'));

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <AppSearchTextInput
        control={control}
        name={'searchTerm'}
        debounce={1000}
      />
    </View>
  );
}
