import React from 'react';
import {View} from 'react-native';
import {Controller} from 'react-hook-form';

import {useAppContext} from '../../../../utils';

import {ImageInput} from '..';
import {AppInputImageArrayProps} from '../../appInputImageArray/types';

export function AppInputImageArray({
  control,
  rules,
  fieldArrayName,
  fieldArrayItemIndex,
  fieldArrayItemChildKey,
  containerStyle,
  inputContainerStyle,
  ...imageInputProps
}: AppInputImageArrayProps) {
  const {Colors} = useAppContext();

  return (
    <View style={containerStyle}>
      <Controller
        name={`${fieldArrayName}.${fieldArrayItemIndex}.${fieldArrayItemChildKey}`}
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
    </View>
  );
}
