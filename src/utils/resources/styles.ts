import {ColorsType} from './colors';
import {Sizes} from './sizes';
import {ViewStyle} from 'react-native';

export function getResourceStyles(Colors: ColorsType) {
  return {
    shadow: {
      shadowOffset: {width: 0, height: 1},
      shadowColor: Colors.icon,
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    } as ViewStyle,
    border: {
      borderRadius: Sizes.borderRadius,
      borderWidth: Sizes.borderWidth,
      borderColor: Colors.border,
      overflow: 'hidden',
    } as ViewStyle,
  };
}

export type StylesType = ReturnType<typeof getResourceStyles>;
