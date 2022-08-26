import React from 'react';
import {View} from 'react-native';
import {Controller, useFormState} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';
import {AppText} from '../appText';

import {ClearablePhoneInput} from './ClearablePhoneInput';
import {styles} from './styles';

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
}) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});

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
                textContainerStyle={[
                  styles.textContainerStyle,
                  {
                    backgroundColor: Colors.background,
                  },
                ]}
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
