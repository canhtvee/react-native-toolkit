import React from 'react';
import {View} from 'react-native';

import {AppButtonNormal, AppContainer} from '../../commons';
import {ComonStyles, Sizes} from '../../utils';
import {Controller, useForm} from 'react-hook-form';
import {TextInputWithEffect} from '../../commons/appSearch/TextInputWithEffect copy';

const _space = <View style={{height: 20}} />;

export const Playground = () => {
  const {control} = useForm();

  return (
    <AppContainer edges="lrtb">
      <View style={{flex: 1}}>
        {_space}

        {_space}

        <Controller
          control={control}
          name={'searchTerm'}
          render={({field: {value, onChange}}) => (
            <TextInputWithEffect value={value} onChangeValue={onChange} />
          )}
        />

        <AppButtonNormal
          label={'Run Animation'}
          containerStyle={[
            ComonStyles.solidButtonContainer,
            {marginHorizontal: Sizes.padding * 2},
          ]}
        />
      </View>
    </AppContainer>
  );
};
