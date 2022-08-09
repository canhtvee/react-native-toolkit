import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, TextInput} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable} from '../appTouchable';
import {AppIcon} from '../appIcon';

export function TextInputWithEffect({
  onChangeValue,
  value,
  debounce = 0,
  inputStyle,
  containerStyle,
  onDebounce,
  ...inputProps
}) {
  const {Colors, Strings} = useAppContext();
  const [textValue, setTextValue] = useState('');
  const timeOutRef = useRef();
  const inputRef = useRef(null);

  useEffect(() => {
    onDebounce && onDebounce(true);
    if (!textValue || textValue === '' || !debounce || debounce === 0) {
      onChangeValue(textValue);
      onDebounce && onDebounce();
    } else {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        onChangeValue(textValue);
        onDebounce && onDebounce();
      }, debounce);
    }
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, [textValue]);

  useEffect(() => {
    setTextValue(value || '');
  }, [value]);

  return (
    <AppTouchable
      style={[
        styles.container,
        {
          borderColor: Colors.border,
        },
        containerStyle,
      ]}
      activeOpacity={1}
      onPress={() => inputRef.current?.focus()}>
      <AppIcon
        name={'search'}
        color={Colors.border}
        size={Sizes.subtitle}
        iconStyle={{marginLeft: Sizes.paddingLess1}}
      />
      <TextInput
        ref={inputRef}
        autoCapitalize={'none'}
        onChangeText={setTextValue}
        value={textValue}
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
        placeholder={Strings.Search}
        {...inputProps}
      />
      {textValue && textValue !== '' ? (
        <AppIcon
          name="closecircle"
          color={Colors.border}
          iconContainerStyle={{paddingRight: Sizes.paddingLess1}}
          onPress={() => setTextValue('')}
        />
      ) : null}
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingHorizontal: Sizes.paddingLess,
    paddingVertical: Sizes.textInputPaddingVertical,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
  },
});
