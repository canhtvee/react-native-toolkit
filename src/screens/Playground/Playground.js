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

import {AppContainer, AppTouchable} from '@commons';
import {Sizes} from '@utils';

import {PlaygroundHeader} from './items';

const _space = <View style={{height: 20}} />;

export function Playground({navigation}) {
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
      <PlaygroundHeader />
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
      <ScrollView>
        {_space}
        <Text onPress={() => navigation.navigate('Search')}>
          kdshfkdhsjhfkdsjhfkd
        </Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <Text>kdshfkdhsjhfkdsjhfkd</Text>
        {_space}
        <AppTouchable
          style={{
            height: 50,
            backgroundColor: 'red',
            justifyContent: 'center',
          }}>
          <Text>kdshfkdhsjhfkdsjhfkd</Text>
        </AppTouchable>
      </ScrollView>
    </AppContainer>
  );
}
