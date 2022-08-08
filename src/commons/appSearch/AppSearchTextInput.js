import React from 'react';
import {Controller} from 'react-hook-form';

import {TextInputWithEffect} from './TextInputWithEffect';

export function AppSearchTextInput({
  control,
  name,
  debounce,
  onDebounce,
  ...searchInputProps
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <TextInputWithEffect
          onChangeValue={onChange}
          value={value}
          debounce={debounce}
          onDebounce={onDebounce}
          {...searchInputProps}
        />
      )}
    />
  );
}
