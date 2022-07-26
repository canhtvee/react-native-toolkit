import React, {useState} from 'react';

import {Controller} from 'react-hook-form';
import {Checkbox} from 'react-native-ui-lib';

import {Sizes, TestIDs, useAppLanguage, useAppTheme} from '../../../utils';

export function LoginFormRememberAccount({control}) {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  return (
    <Controller
      defaultValue={true}
      name={'rememberAccount'}
      control={control}
      render={({field: {onChange, value}}) => (
        <Checkbox
          testID={TestIDs.Login_button_remember_account}
          style={{
            alignSelf: 'flex-start',
            marginLeft: Sizes.padding * 2,
          }}
          onValueChange={onChange}
          value={value}
          label={Strings.Remember_account}
          color={Colors.text}
          labelStyle={{fontSize: Sizes.h5, color: Colors.text}}
        />
      )}
    />
  );
}
