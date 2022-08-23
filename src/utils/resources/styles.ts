import {StyleSheet} from 'react-native';
import {Sizes} from './sizes';

const circle = (radius: number) => {
  const _radius = Sizes.wpx(radius);
  return {
    width: 2 * _radius,
    height: 2 * _radius,
    borderRadius: _radius,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'visible',
  },
  border: {
    borderRadius: Sizes.borderRadius,
    borderWidth: Sizes.borderWidthlx,
    overflow: 'hidden',
  },

  solidButtonContainer: {
    paddingVertical: Sizes.padding,
    paddingHorizontal: Sizes.padding * 2,
    borderRadius: Sizes.borderRadius,
  },

  textButtonContainer: {
    paddingVertical: 2,
    paddingHorizontal: Sizes.paddinglxx,
    borderRadius: 2,
  },
});

export const ComonStyles = {
  ...styles,
  circle,
};
