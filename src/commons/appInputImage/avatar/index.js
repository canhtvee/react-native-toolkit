import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../../utils';

import {ImageInputAvatar} from './ImageInputAvatar';

export function AppInputImageAvatar({
  control,
  name,
  rules,
  containerStyle,
  imageContainerStyle,
  ...imageInputProps
}) {
  const {Colors, Styles} = useAppContext();
  const {errors} = useFormState({control, name});

  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <ImageInputAvatar
            value={value}
            onChange={onChange}
            {...imageInputProps}
            inputContainerStyle={[
              {borderColor: Colors.border},
              imageContainerStyle,
            ]}
          />
        )}
      />
    </View>
  );
}
