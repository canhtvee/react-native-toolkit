import React, {useCallback} from 'react';
import {View, Pressable} from 'react-native';
import XDate from 'xdate';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {useAppContext} from '@utils';

import {page, sameMonth, toMarkingFormat} from './dateHelpers';
import {getMarkedStamps, getMarkings} from './eventHelpers';
import {CalendarMarking} from './CalendarMarking';
import {CalendarDay} from './CalendarDay';
import {styles} from './styles';
import {dimensions} from './specs';

export function CalendarBody({
  events,
  currentMonth = new XDate(),
  setCurrentMonth,
  onPressDay,
}) {
  const {Colors} = useAppContext();

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

  const onSwipe = gestureName => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        addMonth(1);
        break;
      case SWIPE_RIGHT:
        addMonth(-1);
        break;
    }
  };
  const days = page(currentMonth);
  const markedStamps = getMarkedStamps(days, events, dimensions.maxYIndex);

  const headerDecorator = [];
  for (let i = 0; i <= 6; i++) {
    headerDecorator.push(
      <View
        key={i}
        style={[styles.headerDecorator, {borderColor: Colors.grey1}]}
      />,
    );
  }

  const weeks = [];
  while (days.length) {
    const daysOfWeek = days.splice(0, 7);
    const markingsOfWeek = getMarkings(daysOfWeek, markedStamps);

    let weekContent = [];

    daysOfWeek.forEach((_day, index) => {
      const markedStamp = markedStamps[toMarkingFormat(_day)];

      weekContent.push(
        <CalendarDay
          key={`day-${index}`}
          day={_day}
          dayId={index}
          markedStamp={markedStamp}
          currentMonth={currentMonth}
        />,
      );

      !!markedStamp &&
        weekContent.push(
          <Pressable
            key={`day-mask-${index}`}
            style={[
              styles.dayContainer,
              {
                position: 'absolute',
                left: styles.markingStepX * index,
                borderWidth: 0,
                zIndex: 10,
              },
            ]}
            onPress={() => {
              const eventsOfDay = markedStamp?.markIds || [];
              onPressDay?.({date: _day, eventIds: eventsOfDay});
            }}
          />,
        );
    });

    Object.keys(markingsOfWeek).forEach((id, index) => {
      weekContent.push(<CalendarMarking key={id} data={markingsOfWeek[id]} />);
    });

    weeks.push(
      <View
        key={weeks.length}
        style={styles.weekContainer}
        weekId={weeks.length}>
        {weekContent}
      </View>,
    );
  }

  return (
    <GestureRecognizer
      style={{alignSelf: 'center', marginTop: -1}}
      onSwipe={direction => onSwipe(direction)}>
      <View
        style={[
          {
            backgroundColor: Colors.sub_background,
            borderWidth: 0.5,
            borderColor: Colors.grey1,
          },
        ]}>
        {weeks}
      </View>
    </GestureRecognizer>
  );
}
