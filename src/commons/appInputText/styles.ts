import {Platform, StyleSheet} from 'react-native';
import {Sizes} from '../../utils';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius1,
  },
  input: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingHorizontal: Sizes.paddingLess,
    paddingVertical: Platform.select({
      ios: Sizes.padding,
      android: undefined,
    }),
  },
});
