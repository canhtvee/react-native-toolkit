import React from 'react';
import {useFormContext, useFormState} from 'react-hook-form';
import {AppButtonNormal} from '../../../libs';
import {
  FetchApi,
  ResetFunction,
  Sizes,
  TestIDs,
  useAppLanguage,
  useAppTheme,
} from '../../../utils';

export function LoginFormSubmit() {
  const {Strings} = useAppLanguage();
  const {Colors} = useAppTheme();

  const {control, handleSubmit} = useFormContext();
  const {isSubmitting} = useFormState({control});

  const onSubmit = async data => {
    try {
      // setSubmiting(true);
      const result = await FetchApi.login(data);
      console.log('result', result);
      if (result.status) {
        ResetFunction.resetToHome();
        return;
      }
    } catch (err) {
      console.log('err', err);
      // setSubmiting(false);
    }
  };

  return (
    <AppButtonNormal
      testID={TestIDs.Login_button_submit}
      style={{
        backgroundColor: Colors.text,
        width: Sizes.width('80%'),
        marginLeft: Sizes.width('10%'),
        padding: Sizes.padding,
        borderRadius: Sizes.oval_radius,
        marginVertical: Sizes.padding * 2,
      }}
      title={Strings.Login}
      titleStyle={{
        color: Colors.primary,
        fontSize: Sizes.h4,
        fontWeight: '700',
      }}
      loading={isSubmitting}
      onPress={handleSubmit(onSubmit)}
    />
  );
}
