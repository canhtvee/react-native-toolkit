import React, {useState} from 'react';
import {View} from 'react-native';
import {Controller, useFormContext, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '@utils';

import {AppText} from '../appText';
import {AppIcon} from '../appIcon';

import {styles} from './styles';
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
}) {
  const {Colors} = useAppContext();
  const methods = useFormContext();
  const _control = control || methods.control;
  const {errors} = useFormState({_control, name});
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View style={containerStyle}>
      {label && <AppText style={labelStyle}>{label}</AppText>}
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
          render={({field: {onChange, value, onBlur, ref}}) => (
            <ClearableTextInput
              onBlur={onBlur}
              ref={ref}
              onChange={onChange}
              value={value}
              maxLength={rules?.maxLength?.value}
              autoCapitalize={'none'}
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

        {secureTextEntry && (
          <AppIcon
            name={{feather: secure ? 'eye' : 'eye-off'}}
            iconContainerStyle={{paddingRight: Sizes.paddinglx}}
            onPress={() => setSecure(prev => !prev)}
          />
        )}
        {rightChild}
      </View>

      {errors[name] && !!errors[name]?.message && (
        <AppText
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddinglx,
            },
            errorStyle,
          ]}>
          {errors[name]?.message}
        </AppText>
      )}
    </View>
  );
}
