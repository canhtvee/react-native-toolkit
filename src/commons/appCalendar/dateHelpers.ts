import dayjs from 'dayjs';

const XDate = require('xdate');

type XDateType = typeof XDate;

const latinNumbersPattern = /[0-9]/g;
function isValidXDate(date: null | undefined | XDateType) {
  return date && date instanceof XDate;
}
export function sameMonth(a?: XDateType, b?: XDateType) {
  if (!isValidXDate(a) || !isValidXDate(b)) {
    return false;
  } else {
    return (
      a?.getFullYear() === b?.getFullYear() && a?.getMonth() === b?.getMonth()
    );
  }
}
export function sameDate(a?: XDateType, b?: XDateType) {
  if (!isValidXDate(a) || !isValidXDate(b)) {
    return false;
  } else {
    return (
      a?.getFullYear() === b?.getFullYear() &&
      a?.getMonth() === b?.getMonth() &&
      a?.getDate() === b?.getDate()
    );
  }
}
export function sameWeek(a: string, b: string, firstDayOfWeek: number) {
  const weekDates = getWeekDates(a, firstDayOfWeek, 'yyyy-MM-dd');
  const element = weekDates instanceof XDate ? new XDate(b) : b;
  return weekDates?.includes(element);
}
export function isPastDate(date: string) {
  const today = new XDate();
  const d = new XDate(date);
  if (today.getFullYear() > d.getFullYear()) {
    return true;
  }
  if (today.getFullYear() === d.getFullYear()) {
    if (today.getMonth() > d.getMonth()) {
      return true;
    }
    if (today.getMonth() === d.getMonth()) {
      if (today.getDate() > d.getDate()) {
        return true;
      }
    }
  }
  return false;
}
export function isToday(date?: XDateType | string) {
  const d = date instanceof XDate ? date : new XDate(date);
  return sameDate(d, XDate.today());
}
export function isGTE(a: XDateType, b: XDateType) {
  return b.diffDays(a) > -1;
}
export function isLTE(a: XDateType, b: XDateType) {
  return a.diffDays(b) > -1;
}
export function formatNumbers(date: any) {
  const numbers = getLocale().numbers;
  return numbers
    ? date
        .toString()
        .replace(latinNumbersPattern, (char: string) => numbers[+char])
    : date;
}
function fromTo(a: XDateType, b: XDateType) {
  const days: Array<XDateType> = [];
  let from = +a;
  const to = +b;
  for (; from <= to; from = new XDate(from, true).addDays(1).getTime()) {
    days.push(new XDate(from, true));
  }
  return days;
}

export function month(date: XDateType) {
  const year = date.getFullYear(),
    month = date.getMonth();
  const days = new XDate(year, month + 1, 0).getDate();
  const firstDay = new XDate(year, month, 1, 0, 0, 0, true);
  const lastDay = new XDate(year, month, days, 0, 0, 0, true);
  return fromTo(firstDay, lastDay);
}
export function weekDayNames(firstDayOfWeek = 0) {
  let weekDaysNames = getLocale().dayNamesShort;
  const dayShift = firstDayOfWeek % 7;
  if (dayShift) {
    weekDaysNames = weekDaysNames
      .slice(dayShift)
      .concat(weekDaysNames.slice(0, dayShift));
  }
  return weekDaysNames;
}
export function page(
  date: XDateType,
  firstDayOfWeek = 1,
  showSixWeeks = false,
) {
  const days = month(date);
  let before: Array<XDateType> = [];
  let after: Array<XDateType> = [];
  const fdow = (7 + firstDayOfWeek) % 7 || 7;
  const ldow = (fdow + 6) % 7;
  firstDayOfWeek = firstDayOfWeek || 0;
  const from = days[0].clone();
  const daysBefore = from.getDay();
  if (from.getDay() !== fdow) {
    from.addDays(-(from.getDay() + 7 - fdow) % 7);
  }
  const to = days[days.length - 1].clone();
  const day = to.getDay();
  if (day !== ldow) {
    to.addDays((ldow + 7 - day) % 7);
  }
  const daysForSixWeeks = (daysBefore + days.length) / 6 >= 6;
  if (showSixWeeks && !daysForSixWeeks) {
    to.addDays(7);
  }
  if (isLTE(from, days[0])) {
    before = fromTo(from, days[0]);
  }
  if (isGTE(to, days[days.length - 1])) {
    after = fromTo(days[days.length - 1], to);
  }
  return before.concat(days.slice(1, days.length - 1), after);
}
export function isDateNotInRange(
  date: XDate,
  minDate: string,
  maxDate: string,
) {
  return (
    (minDate && !isGTE(date, new XDate(minDate))) ||
    (maxDate && !isLTE(date, new XDate(maxDate)))
  );
}
export function getWeekDates(date: string, firstDay = 0, format?: string) {
  const d = new XDate(date);
  if (date && d.valid()) {
    const daysArray = [d];
    let dayOfTheWeek = d.getDay() - firstDay;
    if (dayOfTheWeek < 0) {
      // to handle firstDay > 0
      dayOfTheWeek = 7 + dayOfTheWeek;
    }
    let newDate = d;
    let index = dayOfTheWeek - 1;
    while (index >= 0) {
      newDate = newDate.clone().addDays(-1);
      daysArray.unshift(newDate);
      index -= 1;
    }
    newDate = d;
    index = dayOfTheWeek + 1;
    while (index < 7) {
      newDate = newDate.clone().addDays(1);
      daysArray.push(newDate);
      index += 1;
    }
    if (format) {
      return daysArray.map(d => d.toString(format));
    }
    return daysArray;
  }
}

export function getLocale() {
  return XDate.locales[XDate.defaultLocale];
}

export function padNumber(n: number) {
  if (n < 10) {
    return '0' + n;
  }
  return n;
}
export function xdateToData(date: XDateType | string) {
  const d = date instanceof XDate ? date : new XDate(date);
  const dateString = toMarkingFormat(d);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    timestamp: new XDate(dateString, true).getTime(),
    dateString: dateString,
  };
}
export function parseDate(d?: any) {
  if (!d) {
    return;
  } else if (d.timestamp) {
    // conventional data timestamp
    return new XDate(d.timestamp, true);
  } else if (d instanceof XDate) {
    // xdate
    return new XDate(toMarkingFormat(d), true);
  } else if (d.getTime) {
    // javascript date
    const dateString =
      d.getFullYear() +
      '-' +
      padNumber(d.getMonth() + 1) +
      '-' +
      padNumber(d.getDate());
    return new XDate(dateString, true);
  } else if (d.year) {
    const dateString =
      d.year + '-' + padNumber(d.month) + '-' + padNumber(d.day);
    return new XDate(dateString, true);
  } else if (d) {
    // timestamp number or date formatted as string
    return new XDate(d, true);
  }
}

export function getState(day: XDateType, current: XDateType) {
  const _isToday = isToday(day);
  const _isDisabled = !sameMonth(day, current);
  return {isToday: _isToday, isDisabled: _isDisabled};
}

export function toMarkingFormat(d?: Date) {
  return dayjs(d).format('YYYY-MM-DD');
}

export function formatJapaneseMonth(
  date: Date | XDateType,
  option: Intl.DateTimeFormatOptions,
) {
  return new Date(date as Date).toLocaleDateString('ja-JP', {
    month: 'long',
    year: 'numeric',
    ...option,
  });
}
