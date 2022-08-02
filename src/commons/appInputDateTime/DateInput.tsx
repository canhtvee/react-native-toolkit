//import liraries
import React, {useState} from 'react';
import {StyleProp, View, ViewStyle, Text, StyleSheet} from 'react-native';
import {ControllerRenderProps} from 'react-hook-form';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import dayjs from 'dayjs';

import {Sizes, useAppContext} from '../../utils';
import {AppTouchable} from '../appTouchable';
import {AppIcon} from '../appIcon';

export interface DateInputProps
  extends Omit<DatePickerProps, 'style' | 'date'>,
    Pick<ControllerRenderProps, 'onChange' | 'value'> {
  textContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  rightChild?: JSX.Element;
  defaulValue?: Date | null;
}

export function DateInput({
  textStyle,
  textContainerStyle,
  placeholder = 'YYYY年DD日MM月',
  mode = 'date',
  modal = true,
  locale = 'ja',
  onChange,
  defaulValue,
  value,
  minimumDate = new Date('1900-01-01'),
  ...propsDate
}: DateInputProps) {
  const {Colors, Strings} = useAppContext();
  const [open, setOpen] = useState(false);
  const [pickingDate] = useState(() =>
    defaulValue ? defaulValue : new Date(),
  );

  const renderDate = () => {
    let _date = dayjs(value).isValid()
      ? dayjs(value).format('YYYY/MM/DD')
      : placeholder;

    return (
      <Text style={[styles.text, {color: Colors.placeholder}, textStyle]}>
        {_date}
      </Text>
    );
  };

  return (
    <View style={[textContainerStyle, styles.textContainer]}>
      <AppTouchable
        onPress={() => {
          setOpen(true);
        }}
        style={{flexDirection: 'row'}}>
        {renderDate()}
        {
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: Colors.primary,
              },
            ]}>
            <AppIcon
              name={'arrow-down'}
              size={Sizes.icon * 0.8}
              color={Colors.onPrimary}
            />
          </View>
        }
      </AppTouchable>

      <DatePicker
        locale={locale}
        modal={modal}
        minimumDate={minimumDate}
        mode={mode}
        open={open}
        date={value || pickingDate}
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
        {...propsDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingVertical: Sizes.width(3.6),
    paddingHorizontal: Sizes.width(3),
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  iconContainer: {
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
});
