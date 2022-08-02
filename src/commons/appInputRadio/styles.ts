import {StyleSheet} from 'react-native';
import {Sizes} from '../../../utils';

const _innerRadius = Sizes.paddingLess * 0.8;

export const styles = StyleSheet.create({
  radioLabel: {
    marginLeft: Sizes.padding,
    fontSize: Sizes.regular,
  },

  unselectedRadio: {
    height: _innerRadius * 2.8,
    width: _innerRadius * 2.8,
    borderRadius: _innerRadius * 1.4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedRadio: {
    width: _innerRadius * 2,
    height: _innerRadius * 2,
    borderRadius: _innerRadius,
  },

  item: {
    marginBottom: 0,
    marginRight: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
