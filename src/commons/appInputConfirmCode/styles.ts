import {StyleSheet} from 'react-native';
import {Sizes} from '../../../utils';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: Sizes.padding,
  },
  codeInput: {
    textAlign: 'center',
    borderWidth: Sizes.borderWidth,
    fontSize: Sizes.regular,
    padding: Sizes.padding,
    minWidth: Sizes.regular + Sizes.padding * 2,
  },
});
