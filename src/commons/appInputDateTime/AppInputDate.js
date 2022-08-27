import React, {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Controller, useFormState, useFormContext} from 'react-hook-form';
import dayjs from 'dayjs';

import {Sizes, useAppContext} from '../../utils';

import {AppText} from '../appText';
import {AppIcon} from '../appIcon';
import {AppTouchable} from '../appTouchable';

import {Picker} from './Picker';

export function AppInputDate({
  control,
  name,
  rules,
  label,
  labelStyle,
  errorStyle,
  containerStyle,
  defaultValue = '',
  textStyle,
  textContainerStyle,
  placeholder = 'YYYY年DD日MM月',
  placeholderColor,
  mode = 'date',
  modal = true,
  locale = 'ja',
  minimumDate = new Date('1900-01-01'),
  ...pickerProps
}) {
  const {Colors, Strings} = useAppContext();
  const methods = useFormContext();
  const _control = control || methods.control;
  const {errors} = useFormState({_control, name});
  const pickerRef = useRef();

  const _calendarIcon = (
    <AppIcon
      name={{antDesign: 'calendar'}}
      size={Sizes.icon}
      color={Colors.placeholder}
      iconStyle={{marginRight: Sizes.paddinglx}}
    />
  );

  return (
    <View style={containerStyle}>
      {label && (
        <AppText style={[{marginBottom: Sizes.paddinglx}, labelStyle]}>
          {label}
        </AppText>
      )}

      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
        render={({field: {onChange, value}}) => (
          <View>
            <AppTouchable
              onPress={() => {
                pickerRef.current?.openModal(true);
              }}
              style={[
                styles.textContainer,
                {borderColor: Colors.border},
                textContainerStyle,
              ]}>
              {value ? (
                <Text style={[styles.text, {color: Colors.text}, textStyle]}>
                  {dayjs(value).format('YYYY/MM/DD')}
                </Text>
              ) : (
                <Text
                  style={[
                    styles.text,
                    {color: placeholderColor || Colors.placeholder},
                    textStyle,
                  ]}>
                  {placeholder}
                </Text>
              )}
              {_calendarIcon}
            </AppTouchable>

            <Picker
              ref={pickerRef}
              locale={locale}
              modal={modal}
              minimumDate={minimumDate}
              mode={mode}
              date={value || new Date()}
              cancelText={Strings.cancel}
              title={null}
              confirmText={Strings.confirm}
              onConfirm={date => {
                pickerRef.current?.openModal(false);
                onChange(date);
              }}
              onCancel={() => {
                pickerRef.current?.openModal(false);
              }}
              {...pickerProps}
            />
          </View>
        )}
      />

      {errors[name] && !!errors[name]?.message && (
        <AppText
          style={[
            {
              color: Colors.error,
              marginTop: Sizes.paddinglx,
            },
            errorStyle,
          ]}>
          {errors[name]?.message}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.paddinglx,
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
});
