import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable} from '../appTouchable';
import {AppIcon} from '../appIcon';

export function TextInputWithEffect({
  onChangeValue,
  value,
  debounce = 300,
  inputStyle,
  containerStyle,
  onDebounce,
  ...inputProps
}) {
  const {Colors, Strings} = useAppContext();
  const [, setTextValue] = useState();
  const textValueRef = useRef();
  const timeOutRef = useRef();
  const inputRef = useRef();

  const onChangeText = React.useCallback(
    text => {
      textValueRef.current = text;
      onDebounce && onDebounce(true);
      if (!textValueRef.current || !debounce || debounce === 0) {
        onChangeValue(textValueRef.current);
        onDebounce && onDebounce();
      } else {
        if (timeOutRef.current) {
          clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
          onChangeValue(textValueRef.current);
          onDebounce && onDebounce();
        }, debounce);
      }

      setTextValue(text);
    },
    [onDebounce, debounce, setTextValue, onChangeValue],
  );

  useEffect(() => {
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  console.log(value);

  useEffect(() => {
    textValueRef.current = value || null;
    setTextValue(value || null);
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
        name={{feather: 'search'}}
        color={Colors.border}
        size={Sizes.subtitle}
      />
      <TextInput
        ref={inputRef}
        autoCapitalize={'none'}
        onChangeText={onChangeText}
        value={textValueRef.current}
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
      {!!textValueRef.current && (
        <AppIcon
          name={{antDesign: 'closecircle'}}
          color={Colors.border}
          onPress={() => onChangeValue(null)}
        />
      )}
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingHorizontal: Sizes.paddinglx,
    paddingVertical: Sizes.textInputPaddingVertical,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
    paddingHorizontal: Sizes.paddinglx,
  },
});
