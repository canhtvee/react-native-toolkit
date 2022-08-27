import React from 'react';
import {View} from 'react-native';

import {AppButtonNormal, AppContainer} from '../../commons';
import {CommonStyles, Sizes} from '../../utils';
import {FormProvider, useForm} from 'react-hook-form';

const _space = <View style={{height: 20}} />;

export const Playground = () => {
  const methods = useForm();

  const onPress = async () => {
    f2();
  };

  return (
    <FormProvider {...methods}>
      <AppContainer edges="lrtb">
        <View style={{flex: 1, paddingHorizontal: Sizes.padding * 2}}>
          {_space}

          {_space}

          <AppButtonNormal
            label={'Run Animation'}
            containerStyle={[
              CommonStyles.solidButtonContainer,
              {marginHorizontal: Sizes.padding * 2},
            ]}
            onPress={onPress}
          />
        </View>
      </AppContainer>
    </FormProvider>
  );
};

const f2 = () => {
  try {
    f3();
  } catch (error) {
    console.log(error);
  }
};

const f3 = () => {
  const res = f4();
  if (res === 6) {
    throw {error: {code: 'NETWORK', message: 'Network request failed'}};
  }
  return res;
};

const f4 = () => 6;
