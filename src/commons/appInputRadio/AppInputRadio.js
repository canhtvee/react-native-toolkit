import React from 'react';
import {View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {AppText} from '../appText';

import {RadioInput} from './RadioInput';

export function AppInputRadio({
  control,
  name,
  rules,
  label,
  labelStyle,
  errorStyle,
  containerStyle,
  radiosContainerStyle,
  ...radiosProps
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
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <RadioInput
            value={value}
            onValueChange={onChange}
            containerStyle={radiosContainerStyle}
            {...radiosProps}
          />
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
