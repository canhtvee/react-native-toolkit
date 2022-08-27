import {StyleSheet, ViewStyle} from 'react-native';
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
    borderWidth,
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

  solidButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding * 2,
    borderRadius: Sizes.borderRadius,
  },

  textButtonContainer: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
  },
});

export const CommonStyles = {
  ...styles,
  circle,
};
