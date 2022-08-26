import React, {useMemo, useState} from 'react';
import {View, TextInput} from 'react-native';
import {Controller, useFormContext, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {AppText} from '../appText';
import {AppIcon} from '../appIcon';

import {styles} from './styles';

export function AppInputText({
  control,
  setValue,
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
  showClearIcon,
  ...textInputProps
}) {
  const {Colors} = useAppContext();
  const methods = useFormContext();
  const _setValue = setValue || methods.setValue;
  const _control = control || methods.control;
  const {errors} = useFormState({_control, name});
  const [secure, setSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const _clearIcon = useMemo(
    () =>
      showClearIcon && (
        <AppIcon
          name={{antDesign: 'closecircle'}}
          size={Sizes.button}
          color={Colors.border}
          iconContainerStyle={{paddingRight: Sizes.paddinglx}}
          onPress={() => _setValue(name, null)}
        />
      ),
    [_setValue],
  );

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

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
          render={({field: {onChange, value}}) => (
            <>
              <TextInput
                maxLength={rules?.maxLength?.value}
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
                onFocus={onFocus}
                onBlur={onBlur}
                {...textInputProps}
              />
              {isFocused && !!value && _clearIcon}
            </>
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

      {errors[name] && errors[name]?.message ? (
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
      ) : null}
    </View>
  );
}
