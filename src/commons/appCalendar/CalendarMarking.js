import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

export function CalendarMarking({data}) {
  const {Colors} = useAppTheme();
  const {
    title,
    gradeCategory,
    yIndex,
    startXIndex,
    endXIndex,
    hasEndDay,
    hasStartDay,
  } = data;

  let _backgroundColor;
  if (gradeCategory === '00') {
    _backgroundColor = Colors.notiBox;
  } else if (gradeCategory === '1X' || gradeCategory === '2X') {
    _backgroundColor = Colors.class_title;
  } else {
    _backgroundColor = Colors.success;
  }

  return (
    <View
      style={[
        {
          position: 'absolute',
          width: (endXIndex - startXIndex + 1) * styles.markingStepX,
          top: styles.markingOffsetY + yIndex * styles.markingStepY,
          left: startXIndex * styles.markingStepX,
        },
      ]}>
      <View
        style={[
          styles.markingTextContainer,
          hasStartDay && styles.markingHasStartDay,
          hasEndDay && styles.markingHasEndDay,
          {
            backgroundColor: _backgroundColor,
          },
        ]}>
        <Text
          style={[
            styles.markingText,
            {
              color: Colors.sub_background,
            },
          ]}
          ellipsizeMode={'clip'}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  );
}
