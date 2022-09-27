import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {} from 'react-native';

import {} from '@utils';
import {AppContainer} from '@commons';

import {TemplateHeading} from './items';

export function Template() {
  const methods = useForm({mode: 'all'});
  return (
    <FormProvider {...methods}>
      <AppContainer>
        <TemplateHeading />
      </AppContainer>
    </FormProvider>
  );
}
