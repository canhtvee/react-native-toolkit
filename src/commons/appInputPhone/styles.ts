import {Platform, StyleSheet} from 'react-native';
import {Sizes} from '../../../utils';

export const styles = StyleSheet.create({
  label: {paddingBottom: Sizes.paddingLess1, fontSize: Sizes.regular},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius1,
  },
  textIput: {
    paddingVertical: Platform.select({
      ios: Sizes.padding,
      android: undefined,
    }),

    fontSize: Sizes.regular,
  },
  error: {
    fontSize: Sizes.regular,
    marginTop: Sizes.paddingLess2,
  },
});
