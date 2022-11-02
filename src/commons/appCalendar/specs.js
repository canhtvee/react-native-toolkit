import {isTablet} from 'react-native-device-info';
import {Sizes} from '../../utils';

let dimensions = {
  maxYIndex: 2,
  dayWidth: Sizes.wpx(50),
  dayHeight: Sizes.wpx(106),
  markingHeight: Sizes.wpx(16),
  markingOfsetY: Sizes.wpx(26),
};
(function () {
  if (isTablet()) {
    dimensions = {
      maxYIndex: 5,
      dayWidth: Sizes.wpx(110),
      dayHeight: Sizes.wpx(170),
      markingHeight: Sizes.wpx(16),
      markingOfsetY: Sizes.wpx(26),
    };
  }
})();

export {dimensions};
