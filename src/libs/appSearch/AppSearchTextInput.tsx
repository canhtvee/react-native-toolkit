import React, {useEffect, useRef, useState} from 'react';
import {Controller, UseControllerProps} from 'react-hook-form';
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';
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
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: Sizes.borderWidth,
          borderColor: Colors.border,
          borderRadius: Sizes.borderRadius1,
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
          {
            flex: 1,
            color: Colors.text,
            fontSize: Sizes.regular,
            paddingHorizontal: Sizes.paddingLess,
            paddingVertical: Platform.select({
              ios: Sizes.paddingLess,
              android: undefined,
            }),
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
        <AppIcon
          name={{antDesign: 'close'}}
          size={Sizes.caption}
          iconStyle={{color: Colors.background}}
          touchStyle={{
            backgroundColor: Colors.placeholder,
            padding: Sizes.paddingLess2 * 0.4,
            borderRadius: Sizes.paddingLess,
            marginRight: Sizes.paddingLess2,
          }}
          hitSlop
          onPress={() => setTextValue('')}
        />
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
