//import liraries
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Controller, useFormState, useFormContext} from 'react-hook-form';
import MaskInput, {Masks} from 'react-native-mask-input';

import {Sizes, useAppContext} from '@utils';

import {AppText} from '../appText';
import {AppIcon} from '../appIcon';

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
}) {
  const {Colors} = useAppContext();
  const methods = useFormContext();
  const _control = control || methods.control;
  const {errors} = useFormState({_control, name});
  const [secure, setSecure] = useState(secureTextEntry);

  // TODO: To update maskrendering
  const _maskRendering = Masks[mask];

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
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => (
            <MaskInput
              mask={_maskRendering}
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
        {secureTextEntry && (
          <AppIcon
            name={{feather: secure ? 'eye' : 'eye-off'}}
            iconContainerStyle={{paddingRight: Sizes.paddinglx}}
            onPress={() => setSecure(prev => !prev)}
          />
        )}
        {rightChild}
      </View>

      {errors[name] && errors[name]?.message && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
  },
  input: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingHorizontal: Sizes.paddinglx,
    paddingVertical: Sizes.textInputPaddingVertical,
  },
});
