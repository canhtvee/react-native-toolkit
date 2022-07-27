import React, {useEffect, useRef, useState} from 'react';
import {Controller, UseControllerProps} from 'react-hook-form';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppIcon, ClearIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

export interface SearchTextInputProps
  extends Omit<
    TextInputProps,
    'style' | 'defaultValue' | 'onChange' | 'onChangeText'
  > {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  debounce?: number;
  onChangeValue: (_?: string) => void;
  onDebounce?: (_?: boolean) => void;
}

function SearchTextInput({
  onChangeValue,
  value,
  debounce = 0,
  inputStyle,
  containerStyle,
  onDebounce,
  ...inputProps
}: SearchTextInputProps) {
  const {Colors, Strings} = useAppContext();
  const [isFocused, setIsFocused] = useState(false);
  const [textValue, setTextValue] = useState<string | undefined>();
  const timeOutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    onDebounce && onDebounce(true);
    if (!textValue || textValue === '' || !debounce || debounce === 0) {
      onChangeValue(textValue);
      onDebounce && onDebounce(false);
    } else {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        onChangeValue(textValue);
        onDebounce && onDebounce(false);
      }, debounce);
    }
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, [textValue]);

  useEffect(() => {
    setTextValue(value);
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
        name={{antDesign: 'search1'}}
        color={Colors.placeholder}
        iconStyle={{marginLeft: Sizes.paddingLess2}}
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={Colors.placeholder}
        placeholder={Strings.Search}
        {...inputProps}
      />
      {isFocused && !!textValue && textValue?.length > 0 && (
        <ClearIcon onPress={() => setTextValue('')} />
      )}
    </AppTouchable>
  );
}

export interface AppSearchTextInputProps
  extends UseControllerProps,
    Omit<SearchTextInputProps, 'onChangeValue'> {}

export function AppSearchTextInput({
  control,
  name,
  debounce,
  onDebounce,
  ...searchInputProps
}: AppSearchTextInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field: {onChange, value}}) => (
        <SearchTextInput
          onChangeValue={onChange}
          value={value}
          debounce={debounce}
          onDebounce={onDebounce}
          {...searchInputProps}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingHorizontal: Sizes.paddingLess,
    paddingVertical: Platform.select({
      ios: Sizes.paddingLess,
      android: undefined,
    }),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius1,
  },
});
