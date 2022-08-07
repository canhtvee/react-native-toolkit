import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text, View, TextInput} from 'react-native';
import {
  AppButtonNormal,
  AppContainer,
  AppSearchTextInput,
  useAppBottomSheetModal,
} from '../../commons';
import {Sizes, useAppContext} from '../../utils';

export function AppIntro() {
  const {Styles, Colors} = useAppContext();
  const {control} = useForm();
  const [searching, setSearching] = useState();
  const [isFocused, setIsFocused] = useState();

  console.log('searching', searching);

  return (
    <AppContainer
      style={{
        paddingHorizontal: Sizes.padding,
      }}>
      <Controller
        defaultValue={''}
        control={control}
        name={'searchTerm'}
        render={({field: {value, onChange, onBlur, ref}, fieldState}) => {
          return (
            <View>
              {fieldState.isDirty && fieldState.isTouched && <Text>FOcus</Text>}

              <TextInput
                ref={ref}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                style={{
                  borderColor: 'grey',
                  borderWidth: 0.5,
                  borderRadius: 4,
                  paddingVertical: 10,
                  marginVertical: 10,
                }}
              />
            </View>
          );
        }}
      />
      <AppButtonNormal
        label={'Button Normal'}
        containerStyle={Styles.solidButtonContainer}
        isLoading={searching}
      />
      <AppButtonNormal
        label={'Button Normal'}
        textLabelStyle={{color: Colors.text}}
        activeBackgroundColor
        containerStyle={[
          Styles.textButtonContainer,
          {alignSelf: 'center', marginVertical: Sizes.padding},
        ]}
        onPress={() => setSearching(prev => !prev)}
      />
    </AppContainer>
  );
}
