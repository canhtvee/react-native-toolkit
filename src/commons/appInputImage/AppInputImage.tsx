import React from 'react';
import {Text, View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';
import {AppInputImageProps} from './types';
import {ImageInput} from './ImageInput';

export function AppInputImage({
  control,
  name,
  rules,
  errorStyle,
  containerStyle,
  inputContainerStyle,
  ...imageInputProps
}: AppInputImageProps) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});

  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <ImageInput
            value={value}
            onChange={onChange}
            {...imageInputProps}
            inputContainerStyle={[
              {borderColor: Colors.border},
              inputContainerStyle,
            ]}
          />
        )}
      />

      {errors[name] && errors[name].message && (
        <Text
          style={[
            {
              color: Colors.error,
              paddingTop: Sizes.paddingLess1,
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
