import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Sizes, useAppContext} from '../../../utils';

import {AppIcon} from '../appIcon';
import {ClearableTextInputProps} from './types';

export function ClearableTextInput({
  showClearIcon = true,
  style,
  value,
  onChangeText,
  ...inputProps
}: ClearableTextInputProps) {
  const {Colors} = useAppContext();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={style}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...inputProps}
      />
      {showClearIcon && isFocused && !!value && value?.length > 0 && (
        <AppIcon
          name={'closecircle'}
          size={Sizes.regular}
          iconStyle={{color: Colors.placeholder}}
          iconContainerStyle={{
            marginRight: Sizes.paddingLess1,
          }}
          onPress={() => onChangeText!('')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
