import React, {useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import PhoneNumberInput from 'react-native-phone-number-input';

import {Sizes, useAppContext} from '@utils';

import {AppIcon} from '../appIcon';

export function ClearablePhoneInput({
  showClearIcon = true,
  value,
  onChangeFormattedText,
  textInputProps,
  ...phoneInputProps
}) {
  const {Colors} = useAppContext();
  const [isFocused, setIsFocused] = useState(false);
  const textValueRef = useRef();

  const _clearIcon = useMemo(
    () =>
      showClearIcon && (
        <AppIcon
          name={'closeCircle'}
          size={Sizes.regular}
          iconStyle={{color: Colors.placeholder}}
          iconContainerStyle={{
            paddingRight: Sizes.paddinglx,
          }}
          onPress={() => {
            const _resetPhoneValue = value?.substring(
              0,
              value.length - textValueRef.current?.length,
            );
            textValueRef.current = null;
            onChangeFormattedText(_resetPhoneValue);
          }}
        />
      ),
    [Colors],
  );

  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}>
      <PhoneNumberInput
        value={value}
        onChangeFormattedText={onChangeFormattedText}
        textInputProps={{
          ...textInputProps,
          onBlur: () => setIsFocused(false),
          onFocus: () => setIsFocused(true),
          onChange: e => (textValueRef.current = e.nativeEvent.text),
          value: textValueRef.current,
        }}
        {...phoneInputProps}
      />
      {isFocused && textValueRef.current?.length > 0 && _clearIcon}
    </View>
  );
}
