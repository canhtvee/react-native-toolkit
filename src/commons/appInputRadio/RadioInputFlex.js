import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {Sizes, useAppContext} from '../../utils';
import {AppTouchable} from '../appTouchable';

export function RadioInput({
  data,
  value,
  onValueChange,
  itemStyle,
  radioLabelStyle,
  radioContainerStyle,
  unselectedRadioStyle,
  selectedRadioStyle,
}) {
  const {Colors} = useAppContext();

  return (
    <View style={[styles.container, radioContainerStyle]}>
      {data.map((item, index) => {
        const _isSelected = value === item.id ? true : false;

        return (
          <AppTouchable
            key={`${item.id} - ${index}`}
            style={[styles.item, itemStyle]}
            onPress={() => onValueChange(item.id)}>
            <View
              style={[
                styles.unselectedRadio,
                unselectedRadioStyle,
                {borderColor: _isSelected ? Colors.primary : Colors.border},
              ]}>
              {_isSelected && (
                <View
                  style={[
                    styles.selectedRadio,
                    selectedRadioStyle,
                    {backgroundColor: Colors.primary},
                  ]}
                />
              )}
            </View>
            <Text style={[styles.radioLabel, radioLabelStyle]}>
              {item.label}
            </Text>
          </AppTouchable>
        );
      })}
    </View>
  );
}

const _innerRadius = Sizes.width(1.8);

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioLabel: {
    marginLeft: Sizes.width(2.2),
    fontSize: Sizes.regular,
  },

  unselectedRadio: {
    height: _innerRadius * 3,
    width: _innerRadius * 3,
    borderRadius: _innerRadius * 1.5,
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
    minWidth: Sizes.width(40),
    marginBottom: Sizes.height(1.5),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
  },
});
