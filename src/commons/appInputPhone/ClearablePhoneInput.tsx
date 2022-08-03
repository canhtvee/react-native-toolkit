import React, {useState} from 'react';
import {View} from 'react-native';

import PhoneNumberInput, {
  PhoneInputProps,
} from 'react-native-phone-number-input';
import {Sizes, useAppContext} from '../../utils';

import {AppIcon, ClearIcon} from '../appIcon';

export interface ClearablePhoneInputProps extends PhoneInputProps {
  showClearIcon?: boolean;
}

export function ClearablePhoneInput({
  showClearIcon = true,
  value,
  onChangeFormattedText,
  textInputProps,
  ...phoneInputProps
}: ClearablePhoneInputProps) {
  const {Colors} = useAppContext();

  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState('');

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
          onChange: e => setTextValue(e.nativeEvent.text),
          value: textValue,
        }}
        {...phoneInputProps}
      />
      {showClearIcon && isFocused && !!textValue && textValue?.length > 0 && (
        <AppIcon
          name={'closecircle'}
          size={Sizes.regular}
          iconStyle={{color: Colors.placeholder}}
          iconContainerStyle={{
            marginRight: Sizes.paddingLess1,
          }}
          onPress={() => {
            const resetPhoneValue = value?.substring(
              0,
              value.length - textValue.length,
            );
            onChangeFormattedText!(resetPhoneValue!);
            setTextValue('');
          }}
        />
      )}
    </View>
  );
}
