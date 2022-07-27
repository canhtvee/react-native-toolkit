import React from 'react';
import {StyleProp, ViewStyle, TextStyle, View} from 'react-native';

import {Controller, UseControllerProps} from 'react-hook-form';

import {Sizes} from '../../utils';
import {AppText} from '../appText';

import {ConfirmCodeInput, ConfirmCodeInputProps} from './ConfirmCodeInput';

export interface AppInputConfirmCodeProps
  extends UseControllerProps,
    Omit<ConfirmCodeInputProps, 'containerStyle' | 'onChange' | 'value'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
}

export function AppInputConfirmCode({
  control,
  name,
  rules,
  codeLength,
  codeInputLength,
  label,
  labelStyle,
  containerStyle,
  inputContainerStyle,
  ...confirmCodeInputProps
}: AppInputConfirmCodeProps) {
  return (
    <View style={containerStyle}>
      {label && (
        <AppText style={[{paddingBottom: Sizes.paddingLess1}, labelStyle]}>
          {label}
        </AppText>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <ConfirmCodeInput
            codeLength={codeLength}
            codeInputLength={codeInputLength}
            value={value}
            onChange={onChange}
            containerStyle={inputContainerStyle}
            {...confirmCodeInputProps}
          />
        )}
      />
    </View>
  );
}
