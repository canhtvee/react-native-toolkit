import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';

import {CommonStyles, Sizes, useAppContext} from '../../utils';
import {AppTouchable, AppTouchableProps} from '../appTouchable';

export interface RadioButtonProps extends AppTouchableProps {
  isSelected?: boolean;
  activeColor?: ColorValue | string;
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  unselectedRadioStyle?: StyleProp<ViewStyle>;
  selectedRadioStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export function RadioButton({
  isSelected,
  activeColor,
  label,
  labelStyle,
  selectedRadioStyle,
  unselectedRadioStyle,
  containerStyle,
  onPress,
  ...touchProps
}: RadioButtonProps) {
  const {Colors} = useAppContext();

  const _activeColor = activeColor ? activeColor : Colors.onPrimary;

  return (
    <AppTouchable style={containerStyle} onPress={onPress} {...touchProps}>
      <View
        style={[
          styles.unselectedRadio,
          unselectedRadioStyle,
          {borderColor: isSelected ? _activeColor : Colors.border},
        ]}>
        {isSelected && (
          <View
            style={[
              styles.selectedRadio,
              {backgroundColor: _activeColor},
              selectedRadioStyle,
            ]}
          />
        )}
      </View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </AppTouchable>
  );
}

const styles = StyleSheet.create({
  label: {
    marginLeft: Sizes.wpx(14),
    fontSize: Sizes.regular,
  },
  unselectedRadio: CommonStyles.circle(Sizes.wpx(12), 1),
  selectedRadio: CommonStyles.circle(Sizes.wpx(8)),
});
