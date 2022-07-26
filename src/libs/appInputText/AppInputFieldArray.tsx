import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';
import {AppIcon} from '../appIcon';

import {ClearableTextInput} from './ClearableTextInput';
import {AppInputFieldArrayProps} from './types';

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
            borderRadius: Sizes.borderRadius,
            alignItems: 'center',
            overflow: 'hidden',
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
                  {
                    color: Colors.text,
                    fontSize: Sizes.regular,
                    flex: 1,
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
            hitSlop
            name={{feather: secure ? 'eye' : 'eye-off'}}
            iconStyle={{
              paddingRight: Sizes.paddingLess,
            }}
            size={Sizes.icon}
            color={Colors.icon}
          />
        )}
        {rightChild}
      </View>

      {errors[fieldArrayName] &&
        errors[fieldArrayName][fieldArrayItemIndex] &&
        errors[fieldArrayName][fieldArrayItemIndex][fieldArrayItemChildKey] &&
        errors[fieldArrayName][fieldArrayItemIndex][fieldArrayItemChildKey]
          .message && (
          <Text
            style={[
              {
                color: Colors.error,
                fontSize: Sizes.regular,
                marginTop: Sizes.paddingLess2,
              },
              errorStyle,
            ]}>
            {
              errors[fieldArrayName][fieldArrayItemIndex][
                fieldArrayItemChildKey
              ].message
            }
          </Text>
        )}
    </View>
  );
}
