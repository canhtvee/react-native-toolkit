import {ColorsType} from './colors';
import {Sizes} from './sizes';
import {StyleSheet} from 'react-native';

export function getResourceStyles(Colors: ColorsType) {
  return StyleSheet.create({
    shadow: {
      shadowOffset: {width: 0, height: 1},
      shadowColor: Colors.icon,
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
    },
    border: {
      borderRadius: Sizes.borderRadius,
      borderWidth: Sizes.borderWidth,
      borderColor: Colors.border,
      overflow: 'hidden',
    },

    solidButtonContainer: {
      paddingVertical: Sizes.paddingLess,
      paddingHorizontal: Sizes.padding * 2,
      borderRadius: Sizes.borderRadius1,
      backgroundColor: Colors.primary,
    },
    textButtonContainer: {
      paddingVertical: Sizes.paddingLess1,
      paddingHorizontal: Sizes.paddingLess1,
      borderRadius: Sizes.borderRadius1 * 0.8,
    },
  });
}

export type StylesType = ReturnType<typeof getResourceStyles>;
