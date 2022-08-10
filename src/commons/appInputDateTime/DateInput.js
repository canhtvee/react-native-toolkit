//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

import {Sizes, useAppContext} from '../../utils';

import {AppTouchable} from '../appTouchable';
import {AppIcon} from '../appIcon';

export function DateInput({
  textStyle,
  textContainerStyle,
  placeholder = 'YYYY年DD日MM月',
  placeholderColor,
  mode = 'date',
  modal = true,
  locale = 'ja',
  onChange,
  value,
  minimumDate = new Date('1900-01-01'),
  rightChild,
  ...pickerProps
}) {
  const {Colors, Strings} = useAppContext();
  const [open, setOpen] = useState(false);

  const renderDate = () => {
    if (value) {
      return (
        <Text style={[styles.text, {color: Colors.text}, textStyle]}>
          {dayjs(value).format('YYYY/MM/DD')}
        </Text>
      );
    }

    return (
      <Text
        style={[
          styles.text,
          textStyle,
          {color: placeholderColor || Colors.placeholder},
        ]}>
        {placeholder}
      </Text>
    );
  };

  return (
    <View>
      <AppTouchable
        onPress={() => {
          setOpen(true);
        }}
        style={[
          styles.textContainer,
          {borderColor: Colors.border},
          textContainerStyle,
        ]}>
        {renderDate()}

        {rightChild ? (
          rightChild
        ) : (
          <AppIcon
            name={'calendar'}
            size={Sizes.icon}
            color={Colors.placeholder}
            iconStyle={{marginRight: Sizes.paddingLess1}}
          />
        )}
      </AppTouchable>

      <DatePicker
        locale={locale}
        modal={modal}
        minimumDate={minimumDate}
        mode={mode}
        open={open}
        date={value || new Date()}
        cancelText={Strings.cancel}
        title={null}
        confirmText={Strings.confirm}
        onConfirm={date => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        {...pickerProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.paddingLess,
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
});
