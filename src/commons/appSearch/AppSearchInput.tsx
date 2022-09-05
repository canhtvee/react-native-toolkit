import React, {useEffect, useRef, useState} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {
  CommonStyles,
  Sizes,
  useAppContext,
  createEventService,
} from '../../utils';

import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

type SearchEventNameType = 'onChangeSearchTerm' | 'onRequestSearch';

type SearchEventDataType = {
  searchTerm?: string;
};

type SearchEventType = {
  eventName: SearchEventNameType;
  data: SearchEventDataType;
};

export const AppSearchService = createEventService<SearchEventType>();

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

  useEffect(() => {
    return AppSearchService.resetContext;
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
        size={Sizes.icon}
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
          size={Sizes.button}
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
    ...CommonStyles.textInputPadding,
    paddingVertical: Sizes.paddinglx,
    flex: 1,
    fontSize: Sizes.regular,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.padding * 0.9,
    paddingHorizontal: Sizes.paddinglx,
  },
});
