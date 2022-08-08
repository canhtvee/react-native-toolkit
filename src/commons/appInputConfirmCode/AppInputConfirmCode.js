import React from 'react';
import {View} from 'react-native';

import {Controller} from 'react-hook-form';

import {Sizes} from '../../utils';

import {AppText} from '../appText';

import {ConfirmCodeInput} from './ConfirmCodeInput';

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
  ...inputProps
}) {
  return (
    <View style={containerStyle}>
      {label && (
        <AppText style={[{marginBottom: Sizes.paddingLess1}, labelStyle]}>
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
            {...inputProps}
          />
        )}
      />
    </View>
  );
}
