import {StyleSheet} from 'react-native';
import {Sizes} from '../../utils';

export const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: Sizes.borderWidth,
    borderRadius: Sizes.borderRadius,
  },
  input: {
    flex: 1,
    fontSize: Sizes.regular,
    paddingHorizontal: Sizes.paddinglx,
    paddingVertical: Sizes.textInputPaddingVertical,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
