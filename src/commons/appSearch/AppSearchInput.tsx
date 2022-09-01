import React, {useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {CommonStyles, Sizes, useAppContext} from '../../utils';

import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

import {AppSearchService} from './AppSearchService';

export interface AppSearchInputProps extends Omit<TextInputProps, 'style'> {
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppSearchInput({
  inputStyle,
  containerStyle,
  ...inputProps
}: AppSearchInputProps) {
  const {Colors, Strings} = useAppContext();
  const [textValue, setTextValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  const onChangeText = React.useCallback(
    (text: string) => {
      setTextValue(text);
      AppSearchService.onChange({
        eventName: 'onChangeSearchTerm',
        data: {searchTerm: text},
      });
    },
    [setTextValue],
  );

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
        size={Sizes.regular}
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
        placeholder={Strings.search}
        {...inputProps}
      />
      {!!textValue && (
        <AppIcon
          name={{antDesign: 'closecircle'}}
          color={Colors.border}
          onPress={() => onChangeText('')}
        />
      )}
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: Sizes.regular,
    ...CommonStyles.textInputPadding,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
    paddingHorizontal: Sizes.paddinglx,
  },
});
