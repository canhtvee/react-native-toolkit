import React from 'react';
import {View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {AppText} from '../appText';

import {DateInput} from './DateInput';

export function AppInputDate({
  control,
  name,
  rules,
  label,
  labelStyle,
  errorStyle,
  containerStyle,
  defaultValue = '',
  ...inputProps
}) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});

  return (
    <View style={containerStyle}>
      {label && (
        <AppText style={[{marginBottom: Sizes.paddingLess1}, labelStyle]}>
          {label}
        </AppText>
      )}

      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <DateInput onChange={onChange} value={value} {...inputProps} />
        )}
      />
      {errors[name] && errors[name]?.message ? (
        <AppText
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddingLess2,
            },
            errorStyle,
          ]}>
          {errors[name]?.message}
        </AppText>
      ) : null}
    </View>
  );
}
