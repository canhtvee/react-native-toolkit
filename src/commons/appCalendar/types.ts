export type EventType = {
  eventId: number;
  gradeCategory: string;
  gradeCategoryLabel: string;
  title: string;
  body: string;
  startDate: Date;
  endDate: Date;
};

export type MarkingType = Pick<EventType, 'title' | 'gradeCategory'> & {
  markId: number;
  isStarting: boolean;
  isEnding: boolean;
};

export type MarkedStampType = {
  markIds: Array<number>;
  markings: Array<MarkingType>;
};

export type MarkingCordinatesType = Pick<
  EventType,
  'title' | 'gradeCategory'
> & {
  yIndex: number;
  startXIndex: number;
  endXIndex: number;
  hasStartDay: boolean;
  hasEndDay: boolean;
};
