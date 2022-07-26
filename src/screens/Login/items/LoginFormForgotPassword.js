import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {AppButtonNormal} from '../../../libs';
import {Sizes, TestIDs, useAppLanguage} from '../../../utils';

export function LoginFormForgotPassword() {
  const {Strings} = useAppLanguage();

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('ForgotPassword');
  };
  return (
    <AppButtonNormal
      testID={TestIDs.Login_button_forgot_pass}
      onPress={onPress}
      title={Strings.Forgot_password}
      textStyle={{fontSize: Sizes.h5}}
      style={{
        alignSelf: 'flex-end',
        padding: Sizes.padding,
        marginRight: Sizes.padding,
      }}
    />
  );
}
