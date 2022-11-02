import React, {useCallback} from 'react';
import {View, Text, Pressable} from 'react-native';

import {useAppContext} from '@utils';
import {AppIcon} from '../AppIcon';
import {styles} from './styles';
import {formatJapaneseMonth, sameMonth} from './dateHelpers';

export function CalendarHeader({
  containerStyle,
  currentMonth,
  setCurrentMonth,
  headerRight,
}) {
  const {Colors, Strings} = useAppContext();

  const addMonth = useCallback(
    count => {
      const newMonth = currentMonth.clone().addMonths(count, true);
      if (sameMonth(newMonth, currentMonth)) {
        return;
      }
      setCurrentMonth(newMonth);
    },
    [currentMonth],
  );

  const _space = <View style={{flex: 1}} />;

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <Text style={[styles.headerDateText, {color: Colors.text}]}>
        {formatJapaneseMonth(currentMonth)}
      </Text>
      <Pressable
        onPress={() => addMonth(-1)}
        style={{
          marginRight: Sizes.wpx(16),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <AppIcon
          name={{feather: 'chevron-left'}}
          style={{
            color: Colors.icon,
            marginRight: styles.headerSizes.marginIcon,
          }}
          size={styles.headerSizes.icon}
        />
        <Text
          style={{color: Colors.icon, fontSize: styles.headerSizes.subText}}>
          {Strings.Last_month}
        </Text>
      </Pressable>

      <Pressable
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => addMonth(1)}>
        <Text
          style={{color: Colors.icon, fontSize: styles.headerSizes.subText}}>
          {Strings.Next_month}
        </Text>
        <AppIcon
          name={{feather: 'chevron-right'}}
          style={{
            color: Colors.icon,
            marginLeft: styles.headerSizes.marginIcon,
          }}
          size={styles.headerSizes.icon}
        />
      </Pressable>
      {_space}
      {headerRight}
    </View>
  );
}
