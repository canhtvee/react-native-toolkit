<<<<<<< HEAD
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
=======
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
>>>>>>> 1a58a30 (common updates)

import {
  AppButtonNormal,
  AppContainer,
  AppModal,
  AppSearchService,
} from '../../commons';
import {CommonStyles, Sizes} from '../../utils';

const _space = <View style={{height: 20}} />;

export function Playground() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([
    'italy',
    'spain',
    'barcelona',
    'finland',
  ]);
  const [items, setItems] = useState([
    {label: 'Spain', value: 'spain'},
    {label: 'Madrid', value: 'madrid'},
    {label: 'Barcelona', value: 'barcelona'},

    {label: 'Italy', value: 'italy'},
    {label: 'Rome', value: 'rome'},

    {label: 'Finland', value: 'finland'},
  ]);

  return (
    <AppContainer style={{paddingHorizontal: Sizes.padding * 2}}>
      {_space}
      <AppButtonNormal
        containerStyle={CommonStyles.solidButtonContainer}
        label={'Show Modal'}
<<<<<<< HEAD
        onPress={() =>
           
          
        }
=======
        onPress={() => {
          AppSearchService.onChange({eventName: 'onRequestSearch'});
        }}
>>>>>>> 1a58a30 (common updates)
      />
      {_space}

      <AppModal.View />
    </AppContainer>
  );
}
