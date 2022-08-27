import React, {useMemo, useState} from 'react';
import {View, TextInput} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';
import {styles} from './styles';

export function ClearableTextInput({
  value,
  onChange,
  onBlur,
  ref,
  inputStyle,
  inputContainerStyle,
  showClearIcon,
  ...textInputProps
}) {
  const {Colors} = useAppContext();
  const [isFocused, setIsFocused] = useState(false);

  const _clearIcon = useMemo(
    () =>
      showClearIcon && (
        <AppIcon
          name={{antDesign: 'closecircle'}}
          size={Sizes.button}
          color={Colors.border}
          iconContainerStyle={{paddingRight: Sizes.paddinglx}}
          onPress={() => onChange(null)}
        />
      ),
    [Colors],
  );

  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: Colors.border,
        },
        inputContainerStyle,
      ]}>
      <TextInput
        ref={ref}
        onChangeText={onChange}
        value={value}
        style={[
          styles.input,
          {
            color: Colors.text,
          },
          inputStyle,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur && onBlur();
        }}
        {...textInputProps}
      />
      {isFocused && !!value && _clearIcon}
    </View>
  );
}
