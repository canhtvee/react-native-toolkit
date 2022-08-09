import {UseControllerProps} from 'react-hook-form';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Masks, MaskInputProps} from 'react-native-mask-input';

type MasksType = keyof typeof Masks;

export interface AppInputMaskProps
  extends UseControllerProps,
    Omit<MaskInputProps, 'style' | 'defaultValue' | 'mask' | 'value'> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftChild?: JSX.Element;
  rightChild?: JSX.Element;
  mask: MasksType;
}
