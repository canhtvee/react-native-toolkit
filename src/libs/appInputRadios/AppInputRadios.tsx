//import liraries
import React from 'react';
import {Text, View, TextStyle, StyleProp, ViewStyle} from 'react-native';
import {Controller, UseControllerProps, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {Radios, RadiosProps} from './Radios';

export interface AppInputRadiosProps
  extends Omit<RadiosProps, 'value' | 'onValueChange' | 'containerStyle'>,
    UseControllerProps {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  radiosContainerStyle?: StyleProp<ViewStyle>;
}

export function AppInputRadios({
  control,
  name,
  rules,
  label,
  labelStyle,
  errorStyle,
  containerStyle,
  radiosContainerStyle,
  ...radiosProps
}: AppInputRadiosProps) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});
  return (
    <View style={containerStyle}>
      {label && (
        <Text
          style={[
            {paddingBottom: Sizes.paddingLess1, fontSize: Sizes.regular},
            labelStyle,
          ]}>
          {label}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <Radios
            value={value}
            onValueChange={onChange}
            containerStyle={radiosContainerStyle}
            {...radiosProps}
          />
        )}
      />
      {errors[name] && errors[name].message && (
        <Text
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddingLess2,
              fontSize: Sizes.regular,
            },
            errorStyle,
          ]}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
}
