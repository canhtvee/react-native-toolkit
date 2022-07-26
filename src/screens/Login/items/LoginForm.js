import React from 'react';
import {View} from 'react-native';

import {useFormContext} from 'react-hook-form';

import {Sizes, TestIDs, useAppLanguage, useAppTheme} from '../../../utils';
import {AppInputText} from '../../../libs';

import {LoginFormForgotPassword} from './LoginFormForgotPassword';
import {LoginFormRememberAccount} from './LoginFormRememberAccount';
import {LoginFormSubmit} from './LoginFormSubmit';

export function LoginForm() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const {control} = useFormContext();

  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: Sizes.padding * 2}}>
        <AppInputText
          testID={TestIDs.Login_input_phone}
          control={control}
          containerStyle={{marginBottom: Sizes.padding}}
          style={{
            backgroundColor: Colors.sub_background,
          }}
          label={Strings.Mobile_phone}
          placeholder={Strings.Phone_placeholder}
          name="phone"
          keyboardType={'phone-pad'}
          rules={{
            required: {value: true, message: Strings.Phone_is_not_empty},
            pattern: {
              value: /\+65(6|8|9)\d{7}/g,
              message: Strings.Phone_max_length,
            },
          }}
        />
        <AppInputText
          testID={TestIDs.Login_input_password}
          secureTextEntry
          control={control}
          style={{
            backgroundColor: Colors.sub_background,
          }}
          label={Strings.Password}
          name="password"
          rules={{
            required: {value: true, message: Strings.Password_is_not_empty},
          }}
        />
      </View>
      <LoginFormForgotPassword />
      <LoginFormRememberAccount />
      <LoginFormSubmit />
    </View>
  );
}
