//import liraries
import React from 'react';
import {View, Omit, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Controller, useFormState, UseControllerProps} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';
import {AppText} from '../appText';

import {
  ClearablePhoneInput,
  ClearablePhoneInputProps,
} from './ClearablePhoneInput';
import {styles} from './styles';

export interface AppInputPhoneProps
  extends UseControllerProps,
    Omit<ClearablePhoneInputProps, 'containerStyle' | 'defaultValue'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  phoneInputContainerStyle?: StyleProp<ViewStyle>;
}

export function AppInputPhone({
  control,
  name,
  label,
  defaultValue = '',
  rules,
  labelStyle,
  errorStyle,
  phoneInputContainerStyle,
  textInputProps,
  textInputStyle,
  containerStyle,
  defaultCode = 'SG',
  ...phoneInputProps
}: AppInputPhoneProps) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});

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
          phoneInputContainerStyle,
        ]}>
        <Controller
          defaultValue={defaultValue}
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => {
            return (
              <ClearablePhoneInput
                defaultCode={defaultCode}
                onChangeFormattedText={e => {
                  onChange(e);
                }}
                value={value}
                textInputProps={{
                  placeholderTextColor: Colors.placeholder,
                  selectionColor: undefined,
                  ...textInputProps,
                }}
                textInputStyle={[styles.textIput, textInputStyle]}
                textContainerStyle={{
                  paddingVertical: 0,
                  paddingHorizontal: Sizes.paddingLess,
                  backgroundColor: Colors.background,
                }}
                containerStyle={{
                  flex: 1,
                }}
                codeTextStyle={{fontSize: Sizes.regular}}
                {...phoneInputProps}
              />
            );
          }}
        />
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
