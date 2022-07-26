import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useFieldArray, useForm} from 'react-hook-form';

import {Sizes, useAppContext} from '../../utils';

import {AppButtonNormal} from '../appButton';

import {AppInputImageArray} from './AppInputImageArray';

export function AppInputImageArrayexample() {
  const {control, watch} = useForm({
    mode: 'all',
    defaultValues: {
      images: [{item: {}}, {item: {}}, {item: {}}, {item: {}}],
    },
  });
  const {fields, prepend, swap, remove, append} = useFieldArray({
    control,
    name: 'images',
  });
  console.log('fields', fields);

  const renderArrayInput = () => {
    let arrayInput = fields.map((field, index) => {
      const {item} = field;
      const children = (
        <AppInputImageArray
          control={control}
          key={field.id}
          fieldArrayName={'images'}
          fieldArrayItemIndex={index}
          fieldArrayItemChildKey={'item'}
        />
      );
      return {item, children};
    });

    arrayInput.sort((a, b) => {
      Object.keys(b).length - Object.keys(a).length;
    });

    console.log('arrayInput', arrayInput);

    const arrayInputRendering = arrayInput.map(value => value.children);
    console.log('arrayInputRendering', arrayInputRendering);

    return arrayInputRendering;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: Sizes.padding * 3,
        }}>
        {renderArrayInput()}
      </View>

      <AppButtonNormal
        textLabelStyle={{color: 'black', fontSize: Sizes.button}}
        containerStyle={{
          padding: Sizes.paddingLess,
          backgroundColor: 'lightblue',
          borderRadius: Sizes.borderRadius,
          marginVertical: Sizes.padding,
        }}
        hitSlop
        label="Submit"
        onPress={() => console.log('images', watch('images'))}
      />
      <AppButtonNormal />
    </View>
  );
}
