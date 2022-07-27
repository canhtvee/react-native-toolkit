import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {Controller, FieldError, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';
import {AppIcon, MaskIcon} from '../appIcon';

import {ClearableTextInput} from './ClearableTextInput';
import {AppInputFieldArrayProps} from './types';
import {styles} from './styles';
import {AppText} from '../appText';

type ErrorType = Partial<FieldError>;

export function AppInputFieldArray({
  control,
  rules,
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
  ...inputProps
}: AppInputFieldArrayProps) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control});
  const [secure, setSecure] = useState(secureTextEntry);

  const renderError = () => {
    const error = errors[fieldArrayName];
    if (
      error &&
      Array.isArray(error) &&
      error[fieldArrayItemIndex] &&
      error[fieldArrayItemIndex][fieldArrayItemChildKey]
    ) {
      return (
        <AppText
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddingLess2,
            },
            errorStyle,
          ]}>
          {error[fieldArrayItemIndex]?.[fieldArrayItemChildKey]?.message}
        </AppText>
      );
    }
    return null;
  };

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
          name={`${fieldArrayName}.${fieldArrayItemIndex}.${fieldArrayItemChildKey}`}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => {
            return (
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
                {...inputProps}
              />
            );
          }}
        />
        {secureTextEntry && (
          <AppIcon
            onPress={() => {
              setSecure(prev => !prev);
            }}
            size={Sizes.icon}
            color={Colors.icon}
            name={{feather: secure ? 'eye' : 'eye-off'}}
            touchStyle={{
              marginRight: Sizes.paddingLess1,
            }}
            hitSlop
          />
        )}
        {rightChild}
      </View>

      {renderError()}
    </View>
  );
}
