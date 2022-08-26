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
  textInput: {
    paddingVertical: Sizes.textInputPaddingVertical,
    fontSize: Sizes.regular,
  },
  textContainerStyle: {
    paddingVertical: 0,
    paddingHorizontal: Sizes.paddinglx,
  },
});
