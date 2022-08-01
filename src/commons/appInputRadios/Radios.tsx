import React from 'react';
import {View, Text, StyleProp, TextStyle, ViewStyle} from 'react-native';

import {Sizes, useAppContext} from '../../../utils';

import {AppTouchable} from '../appTouchable';
import {styles} from './styles';

export type RadiosDataItem = {
  id: number;
  label: string;
};

export interface RadiosProps {
  data: Array<RadiosDataItem>;
  value: number;
  onValueChange: (id: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;

  /**
   * Do not use margin props for alignment of item, use itemMargin instead
   */
  itemStyle?: StyleProp<
    Omit<ViewStyle, 'marginRight' | 'marginBottom' | 'marginLeft' | 'marginTop'>
  >;

  /**
   * use itemMargin prop to align item in both vertical and horizontal directions
   */
  itemMargin?: number;

  unselectedRadioStyle?: StyleProp<ViewStyle>;
  selectedRadioStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

export function Radios({
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
}: RadiosProps) {
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
        const flexDirection = (containerStyle as ViewStyle)?.flexDirection;

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
