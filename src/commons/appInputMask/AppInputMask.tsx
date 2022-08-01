//import liraries
import React, {useState} from 'react';
import {View, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Controller, useFormState, UseControllerProps} from 'react-hook-form';
import MaskInput, {Masks, MaskInputProps} from 'react-native-mask-input';

import {Sizes, useAppContext} from '../../../utils';

import {AppText} from '../appText';
import {MaskIcon} from '../appIcon';

import {styles} from './styles';

type MasksType = keyof typeof Masks;

export interface AppInputMaskProps
  extends UseControllerProps,
    Omit<MaskInputProps, 'style' | 'defaultValue' | 'mask' | 'value'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
  mask: MasksType;
}

export function AppInputMask({
  control,
  name,
  rules,
  secureTextEntry,
  label,
  labelStyle,
  errorStyle,
  inputStyle,
  inputContainerStyle,
  containerStyle,
  mask,
  leftChild,
  rightChild,
  ...maskInputProps
}: AppInputMaskProps) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});
  const [secure, setSecure] = useState(secureTextEntry);

  // TODO: To update maskrendering
  const maskRendering = Masks[mask];

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
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => (
            <MaskInput
              mask={maskRendering}
              autoCapitalize={'none'}
              onChangeText={(masked, unmasked) => {
                onChange(unmasked);
              }}
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
              {...maskInputProps}
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
