import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  AppButtonNormal,
  AppContainer,
  AppModal,
  AppModalService,
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
      <AppButtonNormal
        containerStyle={CommonStyles.solidButtonContainer}
        label={'Show Modal'}
        onPress={() =>
           
          
        }
      />
      <AppModal />
    </AppContainer>
  );
}
