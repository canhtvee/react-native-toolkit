//import liraries
import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {MaskIcon} from '../appIcon';

import {AppInputTextProps} from './types';
import {ClearableTextInput} from './ClearableTextInput';

export function AppInputText({
  control,
  name,
  label,
  labelStyle,
  errorStyle,
  defaultValue = '',
  rules,
  secureTextEntry,
  inputStyle,
  inputContainerStyle,
  containerStyle,
  leftChild,
  rightChild,
  ...textInputProps
}: AppInputTextProps) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});
  const [secure, setSecure] = useState(secureTextEntry);

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
      <View
        style={[
          {
            flexDirection: 'row',
            borderWidth: Sizes.borderWidth,
            borderColor: Colors.border,
            borderRadius: Sizes.borderRadius1,
            alignItems: 'center',
            overflow: 'hidden',
          },
          inputContainerStyle,
        ]}>
        {leftChild}
        <Controller
          defaultValue={defaultValue}
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => (
            <ClearableTextInput
              maxLength={
                (rules?.maxLength as {value: number; message: string})?.value
              }
              autoCapitalize={'none'}
              onChangeText={onChange}
              value={value}
              autoCorrect={false}
              spellCheck={false}
              style={[
                {
                  flex: 1,
                  color: Colors.text,
                  fontSize: Sizes.regular,
                  paddingHorizontal: Sizes.paddingLess,
                  paddingVertical: Platform.select({
                    ios: Sizes.padding,
                    android: undefined,
                  }),
                },
                inputStyle,
              ]}
              placeholderTextColor={Colors.placeholder}
              secureTextEntry={secure}
              {...textInputProps}
            />
          )}
        />
        {secureTextEntry && <MaskIcon setSecure={setSecure} secure={secure} />}
        {rightChild}
      </View>

      {errors[name] && errors[name].message && (
        <Text
          style={[
            {
              color: Colors.error,
              fontSize: Sizes.regular,
              marginTop: Sizes.paddingLess2,
            },
            errorStyle,
          ]}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
}
