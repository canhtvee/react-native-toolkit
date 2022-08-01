import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Text, View, TextInput} from 'react-native';
import {
  AppButtonNormal,
  AppContainer,
  AppSearchTextInput,
  useAppBottomSheetModal,
} from '../../commons';
import {Sizes} from '../../utils';

export function AppIntro() {
  const {control} = useForm();
  const [searching, setSearching] = useState();
  const [isFocused, setIsFocused] = useState();

  return (
    <AppContainer
      style={{
        backgroundColor: 'lightgrey',
        paddingHorizontal: Sizes.padding,
      }}>
      <TextInput
        style={{
          borderColor: 'grey',
          borderWidth: 1,
          paddingVertical: Sizes.paddingLess,
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => setIsFocused(false)}
      />

      {isFocused ? (
        <View style={{flex: 1, backgroundColor: 'red'}}>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
          <Text style={{marginVertical: Sizes.padding}}>
            ksdjfhksdjhfkjdshfkhdskfhkdskjfhksdhfksdjljdsljcldsjlc
          </Text>
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'blue'}} />
      )}
    </AppContainer>
  );
}
