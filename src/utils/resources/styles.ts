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
      overflow: 'visible',
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
    solidButtonLabel: {
      color: Colors.onPrimary,
    },

    borderButtonContainer: {
      paddingVertical: Sizes.paddingLess - 1.5,
      paddingHorizontal: Sizes.padding * 2 - 1.5,
      borderRadius: Sizes.borderRadius1,
      backgroundColor: Colors.background,
      borderWidth: 1.5,
      borderColor: Colors.primary,
    },
    borderButtonLabel: {
      color: Colors.primary,
    },
  });
}

export type StylesType = ReturnType<typeof getResourceStyles>;
