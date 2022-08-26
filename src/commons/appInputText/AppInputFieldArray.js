import React, {useMemo, useState} from 'react';
import {View, TextInput} from 'react-native';
import {Controller, useFormContext, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {AppText} from '../appText';
import {AppIcon} from '../appIcon';

import {styles} from './styles';

export function AppInputFieldArray({
  control,
  rules,
  setValue,
  fieldArrayName,
  fieldArrayItemIndex,
  fieldArrayItemChildKey,
  label,
  labelStyle,
  errorStyle,
  secureTextEntry,
  inputStyle,
  inputContainerStyle,
  containerStyle,
  leftChild,
  rightChild,
  showClearIcon,
  ...inputProps
}) {
  const {Colors} = useAppContext();
  const methods = useFormContext();
  const _setValue = setValue || methods.setValue;
  const _control = control || methods.control;
  const {errors} = useFormState({_control});
  const [secure, setSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const _fieldName = `${fieldArrayName}.${fieldArrayItemIndex}.${fieldArrayItemChildKey}`;

  const _clearIcon = useMemo(
    () =>
      showClearIcon && (
        <AppIcon
          name={{antDesign: 'closecircle'}}
          size={Sizes.button}
          color={Colors.border}
          iconContainerStyle={{paddingRight: Sizes.paddinglx}}
          onPress={() => _setValue(_fieldName, null)}
        />
      ),
    [_setValue],
  );

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <View style={containerStyle}>
      {label && (
        <AppText style={[{marginBottom: Sizes.paddinglx}, labelStyle]}>
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
          name={_fieldName}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => {
            return (
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
                  onBlur={onBlur}
                  onFocus={onFocus}
                  {...inputProps}
                />
                {isFocused && !!value && _clearIcon}
              </>
            );
          }}
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

      {errors &&
        errors[fieldArrayName] &&
        errors[fieldArrayName][fieldArrayItemIndex] &&
        errors[fieldArrayName][fieldArrayItemIndex][fieldArrayItemChildKey] &&
        !!errors[fieldArrayName][fieldArrayItemIndex][fieldArrayItemChildKey]
          .message && (
          <AppText
            style={[
              {
                color: Colors.error,
                marginTop: Sizes.paddinglx,
              },
              errorStyle,
            ]}>
            {
              errors[fieldArrayName][fieldArrayItemIndex][
                fieldArrayItemChildKey
              ].message
            }
          </AppText>
        )}
    </View>
  );
}
