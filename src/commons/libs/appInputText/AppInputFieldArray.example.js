import React from 'react';
import {View} from 'react-native';
import {useFieldArray, useForm} from 'react-hook-form';

import {Sizes} from '../../../utils';

import {AppButtonNormal} from '../appButton';

import {AppInputFieldArray} from './AppInputFieldArray';

export function AppInputFieldArrayExample() {
  const {control, handleSubmit} = useForm({
    defaultValues: {
      arr1: [{firstName: '', lastName: ''}],
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    name: 'arr1',
  });
  return (
    <View>
      {fields.map((field, index) => {
        return (
          <View key={field.id} style={{marginTop: Sizes.padding * 2}}>
            <AppInputFieldArray
              control={control}
              label={`firstName ${index}`}
              placeholder={`firstName ${index}`}
              // rules={{
              //   required: {value: true, message: `require firstName ${index}`},
              // }}
              secureTextEntry
              containerStyle={{marginBottom: Sizes.padding}}
              fieldArrayName={'arr1'}
              fieldArrayItemIndex={index}
              fieldArrayItemChildKey={'firstName'}
            />
            <AppInputFieldArray
              control={control}
              label={`lastName ${index}`}
              placeholder={`lastName ${index}`}
              rules={{
                required: {value: true, message: `require lastName ${index}`},
                minLength: {
                  value: 8,
                  message: `lastName ${index} should include more than 8 chars`,
                },
                maxLength: {value: 12},
              }}
              fieldArrayName={'arr1'}
              fieldArrayItemIndex={index}
              fieldArrayItemChildKey={'lastName'}
            />
          </View>
        );
      })}

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <AppButtonNormal
          label="Add Student"
          onPress={() => {
            append({firstName: '', lastName: ''});
          }}
        />
        <AppButtonNormal
          label="Remove Student"
          onPress={() => {
            remove(fields.length - 1);
          }}
        />
      </View>

      <AppButtonNormal
        label="Submit"
        onPress={handleSubmit(data => console.log('submit', data))}
      />
    </View>
  );
}
