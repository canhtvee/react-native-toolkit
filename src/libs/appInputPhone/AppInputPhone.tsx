//import liraries
import React from 'react';
import {
  View,
  Omit,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
  Platform,
} from 'react-native';
import {Controller, useFormState, UseControllerProps} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {
  ClearablePhoneInput,
  ClearablePhoneInputProps,
} from './ClearablePhoneInput';

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
          phoneInputContainerStyle,
          ,
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
                textInputStyle={[
                  {
                    paddingVertical: Platform.select({
                      ios: Sizes.padding,
                      android: undefined,
                    }),

                    fontSize: Sizes.regular,
                  },
                  textInputStyle,
                ]}
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

      {errors[name] && errors[name].message && (
        <Text
          style={[
            {
              color: Colors.error,
              paddingTop: Sizes.paddingLess2 * 0.5,
              fontSize: Sizes.regular,
            },
            errorStyle,
          ]}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
}
