import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';

export function ClearableTextInput({
  showClearIcon = true,
  style,
  value,
  onChangeText,
  ...inputProps
}) {
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
      {showClearIcon && isFocused && value?.length > 0 && (
        <AppIcon
          name="closecircle"
          color={Colors.border}
          iconContainerStyle={{paddingRight: Sizes.paddingLess1}}
          onPress={() => onChangeText('')}
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
