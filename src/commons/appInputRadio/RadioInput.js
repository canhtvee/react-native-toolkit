import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable} from '../appTouchable';

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

const _innerRadius = Sizes.paddingLess * 0.8;

const styles = StyleSheet.create({
  radioLabel: {
    marginLeft: Sizes.padding,
    fontSize: Sizes.regular,
  },

  unselectedRadio: {
    height: _innerRadius * 2.8,
    width: _innerRadius * 2.8,
    borderRadius: _innerRadius * 1.4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedRadio: {
    width: _innerRadius * 2,
    height: _innerRadius * 2,
    borderRadius: _innerRadius,
  },

  item: {
    marginBottom: 0,
    marginRight: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
