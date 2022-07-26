import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-ui-lib';

import {AppContainer} from 'libs';
import {Convert, useAppAccount} from 'utils';

import {LoginForm, LoginSignUp, LoginHeading} from './items';

function Login() {
  const account = useAppAccount();
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      phone: account?.rememberAccount ? account.phone : '',
      password: account?.rememberAccount ? account.password : '',
    },
  });

  const DataRendering = [
    {
      component: KeyboardAwareScrollView,
      config: {automaticallyAdjustContentInsets: false},
      children: [
        {
          component: LoginHeading,
        },
        {
          component: LoginForm,
        },
      ],
    },
    {
      component: LoginSignUp,
    },
  ];

  return (
    <AppContainer>
      <FormProvider {...methods}>
        {DataRendering.map((item, index) => {
          const Component = item.component;
          const children = Convert.dataRenderingChildren({item});
          return (
            <Component key={`${index}`} {...item.config}>
              {children}
            </Component>
          );
        })}
      </FormProvider>
    </AppContainer>
  );
}
export default Login;
