import React from 'react';
import {View} from 'react-native';
import {useFieldArray, useForm} from 'react-hook-form';

import {AppButtonNormal} from '../AppButtonNormal';

import {AppInputImageArray} from './AppInputImageArray';
import {Sizes} from '../../utils';

export function AppInputImageArrayexample() {
  const {control, watch} = useForm({
    mode: 'all',
    defaultValues: {
      image: [{item: {}}],
    },
  });
  const {fields, prepend} = useFieldArray({
    control,
    name: 'image',
  });

  return (
    <View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {fields.map((field, index) => (
          <AppInputImageArray
            key={field.id}
            control={control}
            prepend={prepend}
            fieldArrayName={'image'}
            fieldArrayItemIndex={index}
            fieldArrayItemChildKey={'item'}
          />
        ))}
      </View>
      <AppButtonNormal
        style={{
          borderRadius: Sizes.border_radius,
          marginTop: Sizes.padding * 2,
          backgroundColor: 'lightblue',
          paddingVertical: Sizes.padding,
          color: 'white',
          alignSelf: 'stretch',
        }}
        title="submit"
        titleStyle={{fontSize: Sizes.large, color: 'black'}}
        onPress={() => console.log('image', watch('image'))}
      />
      <AppButtonNormal />
    </View>
  );
}
