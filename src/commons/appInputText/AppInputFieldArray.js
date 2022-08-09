import React, {useState} from 'react';
import {View} from 'react-native';
import {Controller, FieldError, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';
import {AppText} from '../appText';

import {ClearableTextInput} from './ClearableTextInput';
import {styles} from './styles';
import {AppIcon} from '../appIcon';

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
}) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control});
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View style={containerStyle}>
      {label && (
        <AppText style={[{marginBottom: Sizes.paddingLess1}, labelStyle]}>
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
                {...inputProps}
              />
            );
          }}
        />
        {secureTextEntry && (
          <AppIcon
            name={secure ? 'eye' : 'eye-off'}
            iconContainerStyle={{paddingRight: Sizes.paddingLess1}}
            onPress={() => setSecure(prev => !prev)}
          />
        )}
        {rightChild}
      </View>

      {errors &&
      errors[fieldArrayName] &&
      errors[fieldArrayName][fieldArrayItemIndex] &&
      errors[fieldArrayName][fieldArrayItemIndex][fieldArrayItemChildKey] &&
      errors[fieldArrayName][fieldArrayItemIndex][fieldArrayItemChildKey]
        .message ? (
        <AppText
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddingLess2,
            },
            errorStyle,
          ]}>
          {errors[fieldArrayItemIndex]?.[fieldArrayItemChildKey]?.message}
        </AppText>
      ) : null}
    </View>
  );
}
