import React from 'react';
import {Text, View} from 'react-native';
import dayjs from 'dayjs';

import {useAppContext} from '@utils';

import {AppIcon} from '../appIcon';

import {getState} from './dateHelpers';
import {styles} from './styles';
import {dimensions} from './specs';

export function CalendarDay({day, dayId, markedStamp, currentMonth}) {
  const {Colors} = useAppContext();
  const {isToday, isDisabled} = getState(day, currentMonth);
  const isSaturday = dayId === 5;
  const isSunday = dayId === 6;

  return (
    <View
      style={[
        styles.dayContainer,
        {
          borderColor: Colors.grey1,
        },
        isToday && {
          backgroundColor: Colors.withAlpha(Colors.sun, '20%'),
        },
      ]}>
      <Text
        allowFontScaling={false}
        style={[
          styles.dayText,
          {
            color: Colors.downloadText,
          },
          isSaturday && {color: Colors.class_title},
          isSunday && {color: Colors.notiBox},
          isDisabled && {color: Colors.grey2},
          isToday && {fontWeight: '600'},
        ]}>
        {dayjs(day).format('D')}
      </Text>
      {markedStamp?.markIds?.length > dimensions.maxYIndex + 1 && (
        <AppIcon name={'dotsVertical'} size={styles.threeDots.size} />
      )}
    </View>
  );
}
