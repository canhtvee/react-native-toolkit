//import liraries
import React, {useState} from 'react';
import {View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../../utils';

import {MaskIcon} from '../appIcon';

import {styles} from './styles';
import {AppInputTextProps} from './types';
import {ClearableTextInput} from './ClearableTextInput';
import {AppText} from '../appText';

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
        <AppText style={[{paddingBottom: Sizes.paddingLess1}, labelStyle]}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: Colors.border,
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
                styles.input,
                {
                  color: Colors.text,
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

      {errors[name] && errors[name]?.message && (
        <AppText
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddingLess2,
            },
            errorStyle,
          ]}>
          {errors[name]?.message as React.ReactNode}
        </AppText>
      )}
    </View>
  );
}
