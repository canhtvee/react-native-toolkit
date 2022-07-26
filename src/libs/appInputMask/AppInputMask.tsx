//import liraries
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import {Controller, useFormState, UseControllerProps} from 'react-hook-form';
import MaskInput, {Masks, MaskInputProps} from 'react-native-mask-input';

import {Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';

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
                {
                  flex: 1,
                  color: Colors.text,
                  fontSize: Sizes.regular,
                  paddingVertical: Platform.select({
                    ios: Sizes.padding,
                    android: undefined,
                  }),
                  paddingHorizontal: Sizes.paddingLess,
                },
                inputStyle,
              ]}
              placeholderTextColor={Colors.placeholder}
              secureTextEntry={secure}
              {...maskInputProps}
            />
          )}
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

      {errors[name] && errors[name].message && (
        <Text
          style={[
            {
              color: Colors.error,
              paddingTop: Sizes.paddingLess2,
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
