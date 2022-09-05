import React, {useRef, useState} from 'react';
import {
  Button,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {AppContainer, AppModal} from '../../commons';
import {CommonStyles, Sizes} from '../../utils';

const _space = <View style={{height: 150}} />;

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
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        multiple={true}
        listMode="SCROLLVIEW"
        style={{minHeight: undefined, paddingVertical: 0}}
        iconContainerStyle={{backgroundColor: 'green', paddingVertical: 10}}
        arrowIconContainerStyle={{
          backgroundColor: 'green',
          paddingVertical: 10,
          borderTopRightRadius: 8,
        }}
        textStyle={{paddingVertical: 10}}
        searchable={true}
      />
    </AppContainer>
  );
}
