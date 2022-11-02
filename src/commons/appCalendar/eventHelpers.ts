import {toMarkingFormat} from './dateHelpers';
import {MarkedStampType, MarkingCordinatesType} from './types';

export function getMarkedStamps(
  pageOfMonth: Date[],
  eventsOfMonth: any[],
  maxYIndex: number,
) {
  if (eventsOfMonth?.length <= 0) {
    return [];
  }

  const _events = eventsOfMonth.map(_event => ({
    eventId: _event.event_id,
    gradeCategory: _event.grade_category_cd,
    gradeCategoryLabel: _event.grade_category_cd_lb,
    title: _event.title,
    body: _event.body,
    startDate: _event.start_date,
    endDate: _event.end_date,
  }));

  // const _events: any = mockEventList;
  const stamps = pageOfMonth.map(day => toMarkingFormat(day));
  const firstStamp = stamps[0];
  const lastStamp = stamps[stamps.length - 1];

  const markedStamps: Record<string, MarkedStampType> = {};

  _events.forEach(_event => {
    const startStamp = toMarkingFormat(_event.startDate);
    const endStamp = toMarkingFormat(_event.endDate);

    if (lastStamp < firstStamp || startStamp > lastStamp) {
      return;
    }

    let startX =
      startStamp > firstStamp
        ? stamps.findIndex(stamp => stamp === startStamp)
        : 0;
    let endX =
      endStamp < lastStamp
        ? stamps.findIndex(stamp => stamp === endStamp)
        : stamps.length - 1;

    let yIndex: number | undefined = undefined;

    for (let xIndex = startX; xIndex <= endX; xIndex++) {
      const stamp = stamps[xIndex];

      if (!markedStamps[stamp]) {
        markedStamps[stamp] = {
          markIds: [],
          markings: new Array(maxYIndex + 1).fill(null),
        };
      }

      markedStamps[stamp].markIds.push(_event.eventId);

      if (!yIndex) {
        const emptyIndex = markedStamps[stamp].markings.findIndex(
          slot => !slot,
        );

        if (emptyIndex < 0) {
          continue;
        }

        yIndex = emptyIndex;
      }

      markedStamps[stamp].markings[yIndex] = {
        isStarting: startStamp === stamp,
        isEnding: endStamp === stamp,
        markId: _event.eventId,
        gradeCategory: _event.gradeCategory,
        title: _event.title,
      };
    }
  });

  return markedStamps;
}

export function getMarkings(
  days: Date[],
  markedStamps: Record<string, MarkedStampType>,
) {
  if (Object.keys(markedStamps).length === 0) {
    return {};
  }

  const stamps = days.map(day => toMarkingFormat(day));
  const markings: Record<string, MarkingCordinatesType> = {};

  stamps.forEach((stamp, xIndex) => {
    if (!markedStamps[stamp]) {
      return;
    }

    markedStamps[stamp].markings.forEach((_marking, yIndex) => {
      if (!_marking) {
        return;
      }

      if (!markings[_marking.markId]) {
        markings[_marking.markId] = {
          startXIndex: xIndex,
          endXIndex: xIndex,
          hasStartDay: _marking?.isStarting,
          hasEndDay: _marking?.isEnding,
          yIndex: yIndex,
          title: _marking.title,
          gradeCategory: _marking.gradeCategory,
        };
        return;
      }

      markings[_marking.markId].endXIndex = xIndex;
      markings[_marking.markId].hasEndDay = _marking?.isEnding;
    });
  });

  // console.log('markings', stamps, markings);

  return markings;
}
