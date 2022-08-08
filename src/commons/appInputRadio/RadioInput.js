import React from 'react';
import {View, Text} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable} from '../appTouchable';
import {styles} from './styles';

export function RadioInput({
  data,
  value,
  onValueChange,
  containerStyle,
  itemStyle,
  itemMargin = Sizes.padding,
  unselectedRadioStyle,
  selectedRadioStyle,
  labelStyle,
  activeOpacity,
}) {
  const {Colors} = useAppContext();

  const _styles = {
    label: [
      {
        marginLeft: Sizes.padding,
        fontSize: Sizes.regular,
        color: Colors.text,
      },
      labelStyle,
    ],
    unselectedRadio: [
      styles.unselectedRadio,
      {
        borderColor: Colors.border,
      },
      unselectedRadioStyle,
    ],

    selectedRadio: [
      styles.selectedRadio,
      {
        backgroundColor: Colors.primary,
      },
      selectedRadioStyle,
    ],
  };

  return (
    <View style={containerStyle}>
      {data.map((item, index) => {
        let _itemStyle;
        const flexDirection = containerStyle?.flexDirection;

        if (flexDirection === 'row') {
          _itemStyle = [
            itemStyle,
            {
              marginLeft: itemMargin,
              marginTop: 0,
            },
          ];
        } else {
          _itemStyle = [
            itemStyle,
            {
              marginLeft: 0,
              marginTop: itemMargin,
            },
          ];
        }

        if (index === 0) {
          _itemStyle = [
            itemStyle,
            {
              marginLeft: 0,
              marginTop: 0,
            },
          ];
        }

        return (
          <AppTouchable
            key={`${item.id} - ${index}`}
            style={[styles.item, _itemStyle]}
            onPress={() => onValueChange(item.id)}
            activeOpacity={activeOpacity}>
            <View style={_styles.unselectedRadio}>
              {value === item.id && <View style={_styles.selectedRadio} />}
            </View>
            <Text style={[_styles.label]}>{item.label}</Text>
          </AppTouchable>
        );
      })}
    </View>
  );
}
