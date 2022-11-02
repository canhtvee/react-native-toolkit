import {CalendarHeader} from './CalendarHeader';
import {formatJapaneseMonth} from './dateHelpers';
import {CalendarDateNames} from './CalendarDateNames';
import {CalendarBody} from './CalendarBody';

export const AppCalendar = {
  Header: CalendarHeader,
  Body: CalendarBody,
  DateNames: CalendarDateNames,
  formatJapaneseMonth,
};
