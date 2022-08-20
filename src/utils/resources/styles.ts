import {StyleSheet} from 'react-native';
import {ColorsType} from './colors';
import {Sizes} from './sizes';

const styles = StyleSheet.create({
  props: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function getResourceStyles(Colors: ColorsType) {
  const _styles = {
    shadow: {
      shadowOffset: {width: 0, height: 1},
      shadowColor: Colors.icon,
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 4,
      overflow: 'visible',
    },
    border: {
      borderRadius: Sizes.w5,
      borderWidth: Sizes.w1,
      borderColor: Colors.border,
      overflow: 'hidden',
    },

    circle: (radiusToWidth: number) => {
      const _radius = Sizes.width(radiusToWidth);
      return {
        width: 2 * _radius,
        height: 2 * _radius,
        borderRadius: _radius,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
      };
    },

    solidButtonContainer: {
      paddingVertical: Sizes.padding,
      paddingHorizontal: Sizes.padding * 2,
      borderRadius: Sizes.w6,
      backgroundColor: Colors.primary,
    },
    solidButtonLabel: {
      color: Colors.onPrimary,
    },

    borderButtonContainer: {
      paddingVertical: Sizes.padding - 1.5,
      paddingHorizontal: Sizes.padding * 2 - 1.5,
      borderRadius: Sizes.w6,
      backgroundColor: Colors.background,
      borderWidth: 1.5,
      borderColor: Colors.primary,
    },
    borderButtonLabel: {
      color: Colors.primary,
    },
  };

  return _styles;
}

export type StylesType = ReturnType<typeof getResourceStyles>;
