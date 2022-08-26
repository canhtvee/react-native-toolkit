import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

import {SearchService} from './SearchService';

export function TextInputWithEffect({
  debounce = 300,
  inputStyle,
  containerStyle,
  onDebounce,
  ...inputProps
}) {
  const {Colors, Strings} = useAppContext();
  const [textValue, setTextValue] = useState();
  const timeOutRef = useRef();
  const inputRef = useRef();

  const onChangeText = React.useCallback(
    text => {
      setTextValue(text);
      if (!text || !debounce || debounce === 0) {
        SearchService.setSearchTerm(text);
        return;
      }
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      onDebounce && onDebounce(true);
      timeOutRef.current = setTimeout(() => {
        SearchService.setSearchTerm(text);
        onDebounce && onDebounce(false);
      }, debounce);
    },

    [setTextValue],
  );

  useEffect(() => {
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

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
      {!!textValue && (
        <AppIcon
          name={{antDesign: 'closecircle'}}
          color={Colors.border}
          onPress={() => onChangeText(null)}
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
