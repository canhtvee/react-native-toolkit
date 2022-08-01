import React, {useState} from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
  TextStyle,
  Text,
  StyleSheet,
} from 'react-native';
import {Controller, UseControllerProps, useFormState} from 'react-hook-form';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import dayjs from 'dayjs';

import {Sizes, useAppContext} from '../../../utils';
import {AppText} from '../appText';
import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

export interface AppInputDateTimeProps
  extends UseControllerProps,
    Omit<DatePickerProps, 'style' | 'date'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
  rightChild?: JSX.Element;
}

export function AppInputDateTime({
  control,
  name,
  rules,
  label,
  labelStyle,
  errorStyle,
  containerStyle,
  inputStyle,
  inputContainerStyle,
  placeholder,
  defaultValue = '',
  mode = 'date',
  modal = true,
  minimumDate = new Date(),
  rightChild,
}: AppInputDateTimeProps) {
  const {Colors} = useAppContext();
  const {errors} = useFormState({control, name});

  const [pickingDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={containerStyle}>
      {label && (
        <AppText style={[{paddingBottom: Sizes.paddingLess1}, labelStyle]}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: Colors.border,
          },
          inputContainerStyle,
        ]}>
        <Controller
          defaultValue={defaultValue}
          name={name}
          control={control}
          rules={rules}
          render={({field: {onChange, value}}) => {
            const renderDate = () => {
              if (dayjs(value).isValid()) {
                const display = dayjs(value).format('DD/MM/YYYY');
                return (
                  <Text style={{fontSize: Sizes.regular, color: Colors.text}}>
                    {display}
                  </Text>
                );
              }
              return (
                <Text
                  style={{color: Colors.placeholder, fontSize: Sizes.regular}}>
                  {placeholder}
                </Text>
              );
            };

            return (
              <View style={{flex: 1}}>
                <AppTouchable
                  onPress={() => {
                    setOpen(true);
                  }}
                  style={[styles.input, inputStyle]}>
                  {renderDate()}
                  {rightChild ? (
                    rightChild
                  ) : (
                    <AppIcon
                      name="calendar"
                      size={Sizes.icon}
                      iconStyle={{
                        paddingLeft: Sizes.paddingLess,
                      }}
                      color={Colors.icon}
                    />
                  )}
                </AppTouchable>

                <DatePicker
                  modal={modal}
                  minimumDate={minimumDate}
                  mode={mode}
                  open={open}
                  date={pickingDate}
                  onConfirm={date => {
                    setOpen(false);
                    onChange(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </View>
            );
          }}
        />
      </View>

      {errors[name] && errors[name]?.message && (
        <AppText
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddingLess2,
            },
            errorStyle,
          ]}>
          {errors[name]?.message as React.ReactNode}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.paddingLess,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
});
