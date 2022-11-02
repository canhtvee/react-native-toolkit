import React from 'react';
import {View, Text} from 'react-native';

import {useAppContext, Sizes} from '@utils';

import {dimensions} from './specs';
import {styles} from './styles';

export function CalendarDateNames() {
  const {Colors} = useAppContext();

  const headerDecorator = [];
  for (let i = 0; i <= 6; i++) {
    headerDecorator.push(
      <View
        key={i}
        style={[styles.dateNameDecorator, {borderColor: Colors.grey1}]}
      />,
    );
  }

  return (
    <View style={{alignSelf: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: -Sizes.wpx(2),
        }}>
        {dateOfWeekNames.map((date, index) => (
          <Text
            key={`${date.id}-${index}`}
            style={[
              styles.dateNameText,
              {
                color: Colors.downloadText,
                width: dimensions.dayWidth,
                textAlign: 'center',
              },
              date.id === 5 && {color: Colors.class_title},
              date.id === 6 && {color: Colors.notiBox},
            ]}>
            {date.name}
          </Text>
        ))}
      </View>

      <View
        style={[
          styles.dateNameDecoratorContainer,
          {
            borderColor: Colors.grey1,
          },
        ]}>
        {headerDecorator}
      </View>
    </View>
  );
}

const dateOfWeekNames = [
  {id: 0, name: '月'},
  {id: 1, name: '火'},
  {id: 2, name: '水'},
  {id: 3, name: '木'},
  {id: 4, name: '金'},
  {id: 5, name: '土'},
  {id: 6, name: '日'},
];
