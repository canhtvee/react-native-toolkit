import React, {useRef, useState} from 'react';
import {Text, View, TextInput, ActivityIndicator} from 'react-native';
import {AppViewLoading} from '../../commons';
import {Sizes} from '../../utils';

export function AppIntro() {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <AppViewLoading spinnerSize={'small'} />
    </View>
  );
}
