import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable} from '../appTouchable';

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
  itemStyle?: StyleProp<
    Omit<ViewStyle, 'marginRight' | 'marginBottom' | 'marginLeft' | 'marginTop'>
  >;
  itemMargin?: number;
  unselectedRadioStyle?: StyleProp<ViewStyle>;
  selectedRadioStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
}

const Radios = ({
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
}: RadiosProps) => {
  const {Colors} = useAppContext();

  const innerRadius = Sizes.paddingLess * 0.8;

  const stylesRendering = {
    labelStyle: [
      {
        marginLeft: Sizes.padding,
        fontSize: Sizes.regular,
        color: Colors.text,
      },
      labelStyle,
    ],
    unselectedRadioStyle: [
      {
        height: innerRadius * 2.8,
        width: innerRadius * 2.8,
        borderRadius: innerRadius * 1.4,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
      },
      unselectedRadioStyle,
    ] as ViewStyle,
    selectedRadioStyle: [
      {
        width: innerRadius * 2,
        height: innerRadius * 2,
        borderRadius: innerRadius,
        backgroundColor: Colors.primary,
      },
      selectedRadioStyle,
    ] as ViewStyle,
  };

  return (
    <View style={containerStyle}>
      {data.map((item, index) => {
        let itemStyleRendering;
        const flexDirection = (containerStyle as ViewStyle)?.flexDirection;

        if (flexDirection === 'row') {
          itemStyleRendering = [
            itemStyle,
            {
              marginLeft: itemMargin,
              marginTop: 0,
            },
          ];
        }

        if (!flexDirection || flexDirection === 'column') {
          itemStyleRendering = [
            itemStyle,
            {
              marginLeft: 0,
              marginTop: itemMargin,
            },
          ];
        }

        if (index === 0) {
          itemStyleRendering = [
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
            style={[
              {flexDirection: 'row'},
              itemStyleRendering,
              {marginBottom: 0, marginRight: 0, alignItems: 'center'},
            ]}
            onPress={() => onValueChange(item.id)}
            activeOpacity={activeOpacity}>
            <View
              style={[
                stylesRendering.unselectedRadioStyle,
                unselectedRadioStyle,
              ]}>
              {value === item.id && (
                <View style={[stylesRendering.selectedRadioStyle]} />
              )}
            </View>
            <Text style={[stylesRendering.labelStyle]}>{item.label}</Text>
          </AppTouchable>
        );
      })}
    </View>
  );
};

export {Radios};
