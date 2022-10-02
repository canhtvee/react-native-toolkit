import {Platform, StyleSheet, ViewStyle} from 'react-native';
import {Sizes} from './sizes';

const circle = (borderRadius: number, borderWidth?: number) => {
  const _radius = Sizes.wpx(borderRadius);
  return {
    width: 2 * _radius,
    height: 2 * _radius,
    borderRadius: _radius,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: Sizes.wpx(borderWidth || 0),
  } as ViewStyle;
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'visible',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  border: {
    borderRadius: Sizes.borderRadius,
    borderWidth: Sizes.borderWidthlx,
    overflow: 'hidden',
  },

  textInputPadding: {
    paddingVertical: Platform.select({
      ios: Sizes.wpx(12),
      android: Sizes.wpx(4),
    }),
    paddingHorizontal: Sizes.paddinglx,
  },
});

export const CommonStyles = {
  ...styles,
  circle,
};
