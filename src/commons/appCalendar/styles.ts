import {isTablet} from 'react-native-device-info';

import {dimensions} from './specs';
import {Sizes} from '@utils';

export const stylesSp = {
  monthContainer: {
    alignItems: 'center',
    marginTop: -1,
  },

  weekContainer: {
    flexDirection: 'row',
    height: dimensions.dayHeight,
  },
  dateNameText: {
    fontSize: Sizes.wpx(14),
  },
  dateNameDecorator: {
    height: Sizes.wpx(6),
    width: dimensions.dayWidth,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  dateNameDecoratorContainer: {
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
  },

  headerContainer: {
    width: dimensions.dayWidth * 7,
    alignItems: 'center',
    flexDirection: 'row',
  },

  dayContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: dimensions.dayWidth,
    height: dimensions.dayHeight,
    borderWidth: 0.5,
    paddingTop: Sizes.wpx(6),
    paddingBottom: Sizes.wpx(2),
  },
  dayText: {
    fontSize: Sizes.wpx(14),
  },

  markingHasStartDay: {
    borderTopStartRadius: 3,
    borderBottomStartRadius: 3,
    marginLeft: 3,
  },
  markingHasEndDay: {
    borderTopEndRadius: 3,
    borderBottomEndRadius: 3,
    marginRight: 3,
  },

  markingTextContainer: {
    minHeight: dimensions.markingHeight,
    justifyContent: 'center',
  },
  markingText: {
    fontSize: Sizes.wpx(10),
    paddingHorizontal: 2,
  },

  headerSizes: {
    icon: Sizes.icon,
    subText: Sizes.wpx(14),
    text: Sizes.wpx,
    marginIcon: -4,
  },
  headerDateText: {
    fontSize: Sizes.h5,
    fontWeight: '500',
    width: Sizes.wpx(90),
  },
  threeDots: {
    size: dimensions.markingHeight + 4,
  },

  markingOffsetY: dimensions.markingOfsetY,
  markingStepY: dimensions.markingHeight + 3,
  markingStepX: dimensions.dayWidth,
};
export const stylesTb = {
  monthContainer: {
    alignItems: 'center',
    marginTop: -1,
  },

  weekContainer: {
    flexDirection: 'row',
    height: dimensions.dayHeight,
  },
  dateNameText: {
    fontSize: Sizes.h12,
  },
  dateNameDecorator: {
    height: Sizes.wpx(6),
    width: dimensions.dayWidth,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  dateNameDecoratorContainer: {
    flexDirection: 'row',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
  },

  headerContainer: {
    width: dimensions.dayWidth * 7 + 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  dayContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: dimensions.dayWidth,
    height: dimensions.dayHeight,
    borderWidth: 0.5,
    paddingTop: Sizes.wpx(6),
    paddingBottom: Sizes.wpx(2),
  },
  dayText: {
    height: Sizes.wpx(20),
    fontSize: Sizes.h12,
  },

  markingHasStartDay: {
    borderTopStartRadius: 3,
    borderBottomStartRadius: 3,
    marginLeft: 4,
  },
  markingHasEndDay: {
    borderTopEndRadius: 3,
    borderBottomEndRadius: 3,
    marginRight: 4,
  },

  markingTextContainer: {
    minHeight: Sizes.wpx(16),
    justifyContent: 'center',
  },
  markingText: {
    fontSize: Sizes.wpx(10),
    paddingHorizontal: 2,
  },

  headerSizes: {
    icon: Sizes.h7,
    subText: Sizes.h12,
    marginIcon: -4,
  },
  headerDateText: {
    fontSize: Sizes.h10,
    width: Sizes.wpx(110),
    fontWeight: '500',
  },

  threeDots: {
    size: dimensions.markingHeight + 4,
  },

  markingOffsetY: dimensions.markingOfsetY,
  markingStepY: dimensions.markingHeight + 3,
  markingStepX: dimensions.dayWidth,
};

export const styles = isTablet() ? stylesTb : stylesSp;
